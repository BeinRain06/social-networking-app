//all required packages defines in variables ready for use
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const passport = require("passport");
/* require("./passportConfig")(passport); */
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
require("dotenv").config();
/* const ObjectId = require("objectid");
const assert = require("assert"); */

const app = express();

//style our webpages
/* app.use(express.static(path.join(_dirname, "public"))); */
app.use(express.static("public"));
// view engine setup
/* app.set("views", path.join(_dirname, "views")); */
app.set("view engine", "ejs");

//app configuration
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "This is our secret key.",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB here we selected **userDB** as _name_ of our database sheet , we litteraly might choose whatever _name_ you want

// require database connection
const dbConnect = require("./db/dbConnect");

//execute database connection
dbConnect();

//about salting (encrypt deeply users passwords)
/* const saltRounds = 10; */

// MongoDB --> Documents --> our Schema (what we decided to store)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  secret: String,
});

userSchema.pre("save", async function (next) {
  try {
    //check method of registration
    const user = this;
    if (!user.isModified("password")) next();
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//matchPassword() method
userSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("password not match");
  }
};

// supply extended packages (plugin) that sharp our Schema
userSchema.plugin(passportLocalMongoose); // It does a lot of heavy lifting for us
userSchema.plugin(findOrCreate);

//encrypted fields
userSchema.plugin(encrypt, {
  secret: process.env.SECRETKEY,
  encryptedFields: ["password"],
});

// one model data
const User = mongoose.model("User", userSchema);

//initialize passport
/* passport.use(User.createStrategy()); */

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //check if user exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
          return done(null, false);
        }
        // Create a New user with the user data provided
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, req.flash("loginMessage", "No user found."));
        }
        // Create a New user with the user data provided
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return done(null, false);
        } else {
          //if password match return user
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
        done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser---");
  console.log(user.id);
  console.log(user.username);
  done(null, user);
});

/* passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
}); */

passport.deserializeUser(async (user, done) => {
  console.log("deserializing user...");
  done(null, user);
});

//passport used technology
/* passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
); */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await user.findOne({ "google.id": profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        console.log("Creating new user...");
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//app authentification
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to secrets route.
    res.redirect("/secrets");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to secrets route.
    res.redirect("/secrets");
  }
);

//app rendering
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

/* app.get("/secrets", function (req, res) {
  User.find({ secret: { $ne: null } }, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
}); */

app.get("/secrets", async (req, res) => {
  try {
    const user = await User.find({ secret: { $ne: null } });
    if (!user) {
      throw new Error("User in secrets webpage not found");
    }
    console.log(user);
    res.render("secrets", { usersWithSecrets: user });
  } catch (error) {
    console.log(error);
  }
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.render("login");
  }
});

/* app.post("/submit", function (req, res) {
  const submittedSecret = req.body.secret;
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function () {
          res.redirect("/secrets");
        });
      }
    }
  });
}); */

/* app.post("/submit", async (req, res) => {
  try {
    const submittedSecret = req.body.secret;
    // const user = await User.findById(req.user.id);
    const user= null;
    if (!user) {
      throw new Error("submitted secret missing");
    }
    console.log(user);
    user.secret = submittedSecret;
    user.save(function () {
      res.redirect("/secrets");
    });
  } catch (error) {
    console.log(error);
  }
}); */

app.post("/submit", async (req, res) => {
  try {
    const submittedSecret = req.body.secret;
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      throw new Error("submitted secret missing");
    }
    console.log(user);
    user.secret = submittedSecret;
    /* user.save(function () {
      res.redirect("/secrets");
    }); */
    /*   user.save.then(() => {
      res.redirect("/secrets");
    }); */
    const redirection = () => {
      res.redirect("/secrets");
    };
    const savedFunction = await redirection();
    user.save(savedFunction);
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", function (req, res) {
  req.logout(() => res.redirect("/")); // deletes the cookie
});

/* app.get("/logout", function (req, res) {
  req.logout(() => res.redirect("/")); // deletes the cookie
}); */

//app "POST" requests
app.post("/register", function (req, res) {
  // register() comes from passport-local-mongoose package which handles creating, saving user and interacting eith the database
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        // callback is only triggered if the authentication was sucessfull- set up a cookie that saved their current logged in session
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log("this user id");
  console.log(user.id);
  req.login(user, function (err) {
    if (err) {
      console.log(err);
      console.log("error login");
    } else {
      // creating a cookie
      passport.authenticate("login")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

//the port server (here : 3000) where the app app will browse our *webpage*
app.listen(3000, function () {
  console.log("Server started successfully on port 3000");
});
