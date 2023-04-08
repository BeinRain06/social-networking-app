# Social Networking App

Sideland : **## Social Networking Application**

> ### Overview :

- Don't keep those, share your thoughts and connect with amazing people. Life can just be burden, open some gates to your world and meets people extraordinary like you. You mgiht understand that your world lead to your guests friends you take steps to invite.
- This App made us learn about bases of MongoDataBases and security to implement registration through a website.

## Interest

You might be interested on how:

- to implement a securing app where users can **login** or **logout** safely using their credentials accounts

- to not only use **npm package** to just start and build react app (npm start, npm run build), your choices can lead you to discover others cool packages of `NodeJS` under **npm packages** as `express`, `ejs`, `md5`, `bcrypt` to help you build an ended trust and secure website.

### Links

- Solution URL: [https://github.com/BeinRain06/social-networking-app.git](https://github.com/BeinRain06/todo-list-app.git)
- Live Site URL: [https://beinrain06.github.io/social-networking-app/](https://beinrain06.github.io/todo-list-app/)

## Description : \* challenge issue

- i have hard time when trying to connect the **MongoDB database** with **NodeJs** to lunch my app. It was the first time dealing with mongodb.
- I got many errors like :

  - `error: mongonetworkerror: connect econnrefused 127.0.0.1:27017`
  - `Unit mongod.service not found`
  - `unit mongod.service does not exist, proceeding anyway.`

And effectively in my case it was not a bug as: > MongoDB was not by default actived to start > MongoDB is masked > It was really the fact that i don't **create properly the database** but use an **existential base of one another**

Hopefull i come upon this great tutorial of **Arpane Neupane** on youtube about _how to connect MongoDB with NodeJS and start Node Application_ , i follow the example an it works.

## CSS Structures:

> - <App/> main component connect to node handle all the javascript need to display all our **related webpages** ,

> five main ejs files (helps write in HTML and CSS in the `ǸodeJS` environment):
> -home.ejs, login.ejs, register.ejs, secret_day.ejs, secret_night.ejs

**Picture**

---

![./Desktop-ToDoList-App.png](./Desktop-ToDoList-App.png)

---

# What I learned

### Securing An App

All App need to ensure security to their users. Securing an app is all about six majors steps, the **six layers** of **security** :

**1.Create a Database Documents with MongoDB, SQL, Tavbleu...**

> **2.Encrypt**
>
> Sometimes in a project some information as password, location, card number need to be hided from others users or even the staff under the creation of the application. To do so we first change these input text into some others text that the website will remember instead of what has been written by users. This is encryption.

> **3.Create an Environmemt Variable**
>
> When coding our app some part of code or functions at times need have an access to our data. In that way some vulnerability are still seenm if someone browse the console of our apps they could lead to our sensitive data easyly. To avoid that we really do, need to **create an anvironmemt variable** > **Environment variable** is a file into our project that encompasses inside **sensitive data** using an **alias name** > **2.Hashing and Salting**
> It is this `alias name` that will be called each time you need the referenced sensitive data.

> **4.Hashing and Salting**
>
> Hashing and salting increase the level of **encryption**

- **Hashing** is about taking an _*encrypted* data_ and apply a **hash function** to generate new random characters using cryptogarphy, or others method to build something called **hash** that represents the _*encrypted* data_ given.
- e.g: **passord encrypted** ---> **Hash Function** ---> **Hash Value**

- **Salting** is about lenghten an _*encrypted* data_ with generated random characters and alpha numeric to strength the difficulty to access this _*encrypted* data_. More an _*encrypted* data_ is lengthen , more is secure. We can **salt** an encrypted value more than one time. This process is called **salt round**

> **5.COOKIES AND SESSIONS**

- **COOKIES** are data stored about activities of a users during a **session** to a better experience of the website sharped through all his researches and interests. A session end when the users **logout** of the website. Cookies are **deleted** each time a session end. \*\*Cookies\*\ are also part to protect (to configure in your app) for security of users.
- - **SESSIONS** are period of times where our **browser** interacts with the **server**.This period `end` when you log out of a wensite and `restart`when you log in again. \*\*Session Data\*\ need also to be **secured**

> **6.Google oAuth or others**

-This level use the **security** requiring accessing an secure account created by user at **Google**, **Facebook** or another brand , to grant user and redirect this former the webpage limk corresponding from the website.

### passportjs.org

This website is anewly discover, think about it , it has sevrals packages that functions is to deal with server and achieves something.
In our project we use the **pasport-google-oauth** package to well achieve **login/logout** in our webpage.

### npmjs.com

This website deals with node packages manager (npm) from `ǸodeJS`. We have implemented packages like: body-parser, bcrypt, ejs, findOrCreate, express

### utilities Materials:

    -ejs of NPM Package (npmjs.com)
    -MonGoDB
    -Google oAuth (console.google.cloud.com)
    -passportsjs.org (login and logout implementation with oAuth google)

### Mobile Responsiveness

    - Mobile reponsiveness for mobile max-width: 475px ,max-width: 715px,

**Picture**

---

![./Mobile-ToDoList-App.png](./Mobile-ToDoList-App.png)

---

## Callback History:

- NodeJS started with **_Ryan Dahl_** in the year **2009** .The project development was distributed by **Node.js Foundation** that becomes now **openJSFoundation** under Linux Collaborative foundation Program.
- NodeJS is a **back-end javascrypt runtime environment** . That simply means it helps us run javascript out of our local browser in an environment that allows **users** to have **dynamics response** sharped to their **queries requirements or access right**. These responses comes from our **\*Server-side** environment (web server) depending on our location. With `ǸodeJS`we can also runs command line with `ǹpm manager` to extend and install packages we need for customization into our project.
- Remember we have two side:
  - `client-side environment` , usually our local **browser**
  - `server-side environment` , representing **web server**
  - `NodeJS` , is a **_back-end environment_** that link **client-side environment** and **server-side environment** allowing dynamic pages rendering, and customize access most effective with **javascript** all that in a single language (react, vue, angular, ...)

## Useful Resources :

- Arpan Neupane (youtube) : ['how to connect Node.js App to MongoDB'](https://www.youtube.com/watch?v=bhiEJW5poHU&t=608s) : this link stands very relevant for me . It's give me a ligth star how to **create my first data base with mongoDB** and connect it to **node.js** in such kind to be able to launch my app via `NodeJS`environment.

- computerScience : ['https://computersciencewiki.org/index.php/Client-side_scripting_and_server-side_scripting'](https://computersciencewiki.org/index.php/Client-side_scripting_and_server-side_scripting) : helps me quickly learn about **client-side environment** (browser) and **server side environment** (web server)

- passportjs.org: ['https://www.passportjs.org/'](https://www.passportjs.org/) : to implement login and logout authorization along with google oauth nd facebook oauth.

- npmjs.com: ['https://www.npmjs.com/'](https://www.npmjs.com/) : to code using **ejs, express** and many others modules of **npm**.

## Acknowledge:

This project always remember the Team :

-Arpane Neupane: helps me figure out how to launch a **node application** with **MongoDB**

-Sufa Digital: udemy with his explanations about the 6 layers of security when registering or login to an app

## Author

- Frontend Mentor - [https://www.frontendmentor.io/profile/BeinRain06](https://www.frontendmentor.io/profile/BeinRain06)
- Twitter - [https://twitter.com/nest_Ngoueni](https://twitter.com/nest_Ngoueni)
