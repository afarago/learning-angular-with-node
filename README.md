# Building Angular and Node Apps with Authentication

## INSTRUCTOR
- Alexander Zanfir, President of SocialPlay Inc.

# Course Details
- 3h 18m
- Intermediate
- Updated: 4/4/2019

Are you already familiar with Angular 2 and Node.js? If so, this course can help you leverage these two popular frameworks to build a full-stack web application—which you can later use as a template for your own web app. Join Alexander Zanfir as he shows how to create and configure an Angular 2 project, display data in Angular 2, get your data from Node.js, and save your data to Node.js. He also covers how to create a form in Angular, set up routes, validate with reactive forms, register users, and more.

# Learning objectives
- Setting up the infrastructure
- Displaying data in Angular 2
- Refining your layout with Angular Material
- Getting your data from Node.js
- Saving data to a list
- Creating the component
- Getting your input data
- Creating reactive forms in Angular
- Creating a security middleware

# Skills covered
Front-End Development, JavaScript, AngularJS, Node.js, Back-End Web Development

# MEAN architecture
MEAN like stack is working smoothly as of today.

Theoretical architecture is a node / express server static route serving default path from a generated dist/frontend directory providing angular frontend code

node/express other routes are added in the server.js directly

thus startup project is only the node / express combo, no concurrent or parallel startup
no need for ng server

## STEPS

1. (npm install)

2. ng build / npm run build
fills up dist directory with built angular app

3. node server.js / npm run
starts up express on port 3000
serving backend service paths
serving standard static content from /dist directory

X. no need for "ng serve -o" on port 4200

# Hosted instance

Hosted instance available on StackBlitz.
https://stackblitz.com/edit/angular-with-node

