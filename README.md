## What is ModelsKit Database

The aim of this project is to have a multi users management tool for managing plastik models kits.

This repo is the front end part of ModelKit database. It is built with React (Vite).

Counter to V1.0, this version is mono repo, including front and back end.

### V1.2

News
==

Social network : you can see others users (if they allow to be seen), use messages to talk with them and see they're finished models. You can also let a message on their builds, and see the messages they let on your own.

Orders : Now, you can add a date to the order.

Bugs Fixed
==

Delete a kit was not accessible. Corrected

Minors display details in mobile resolution are fixed

Backend : fix delete user's folder when no images kits

Orders : fix bug in display orders

### The used ports are :

- `back end server` : 8000
- `front end server` : 3000

ModelsKit basics scripts
==

In the root directory, you can run :

### `npm run postinstall`

This will install modules for both back and front parts.

### `npm run dev`

This will launch both servers.

ModelsKit database (front end part)
==

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

ModelsKit database (back end part)
==

Documentation is also include on how to use it.

How to install
-

First you have to clone this repo on your server.

Create your own **env file** from env.sample.

Then go to backend directory and run `npm run migrate` to initialise database. All datas for starting are in database.

When server is launching, it automatically create folders that are needed tu run properly.

Enjoy !

**Note** : when first user is created (by you) you need to run `npm run setadmin` to make this user admin of the site.

Docker Version 
-

There is a simple version for deploying on docker. As I'm not an expert with this, you should use the file to make your own version.

The docker deployment will use 3 images (front end, back end and mysql Server). All thoses images are included in dockerfiles and combined in a docker-compose file.

Feel free to adapt those files for your own deployment.

Enhance security
-

By default, users level are single integer. 

You should change them. To do so, go to ` common.js` and change values in `userRole` object.

You'll have to do the same in front end configuration (frontend/src/feature/ranks.js).

To have more security, you should have string instead of integer. This means you have also to change verifications in `user.controller.js`

## Migrating from previous version (1.0,1.1) to 1.2

When migrating from previous versions (1.0 or 1.1), go to backend directory and run `npm run updateDB` to update database. 

This will keep all your datas i DB and update this one to new version.

**Warning** If you have a previous version, do not run  `npm run migrate`, this will cause you the loss of all your datas.