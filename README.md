# Chatty

Chatty is a single page chat app built with React and Express using WebSockets. Users are given a random name when they join and can choice to change it if they'd like. Chatty features a list of all online users, 😎emojis🤗, and supports images and gifs when a link is posted with the jpg/jpeg/png/gif extensions. 

### Screenshots

![App Screenshot 1](https://github.com/aaronjparsons/chatty-app/blob/master/docs/gif.gif)
![App Screenshot 2](https://github.com/aaronjparsons/chatty-app/blob/master/docs/gif2.gif)


### Usage & Setup

- Clone the repo and run `npm install` in both the root folder and the chatty_server folder
- Navigate to the chatty_server folder and run the server with `node server.js`
- Run `npm start` in the root folder to run the webpack dev server
- Navigate to localhost:3000 in your browser to open the app


### Dependencies

* React
* Webpack
* Babel
* Express
* ws
* uuid
* emoji-js
* emoji-picker-react
