## What is ModelsKit Database

The aim of this project is to have a multi users management tool for managing plastik models kits.

This repo is the front end part of ModelKit database. It is built with React (Vite).

Counter to V1.0, this version is mono repo, including front and back end.

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

Enhance security
-

By default, users level are single integer. 

You should change them. To do so, go to ` common.js` and change values in `userRole` object.

You'll have to do the same in front end configuration (frontend/src/feature/ranks.js).

To have more security, you should have string instead of integer. This means you have also to change verifications in `user.controller.js`