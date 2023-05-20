ModelsKit database (back end part)
==

What it is ?
-
ModelsKit Database is a software allowing to manage a model kit collection.

This is the back end part, (the heart of the application) built on node, express and MySQL.

You should find front end repo here [frontend](https://github.com/GuillaumeCregut/models_front/)

Documentation is also include on how to use it.

How to install
-
First you have to clone this repo on your server.

Create your own **env file** from env.sample.

Then run `npm run migrate` to initialise database. All datas for starting are in database.

When server is launching, it automatically create folders that are needed tu run properly.

Enjoy !

**Note** : when first user is created (by you) you need to run `npm run setadmin` to make this user admin of the site.

Docker Version
-

There is a simple version for deploying on docker. As I'm not an expert with this, you should use the file to make your own version.

Enhance security
-

By default, users level are single integer. 

You should change them. To do so, go to ` common.js` and change values in `userRole` object.

You'll have to do the same in front end configuration (src/feature/ranks.js).

To have more security, you should have string instead of integer. This means you have also to change verifications in `user.controller.js`


