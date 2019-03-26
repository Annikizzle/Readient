# Readient

## Search for and save books on Google Books

[Live Site](https://desolate-cove-30232.herokuapp.com)

## Guest Account
If you do not wish to create account, feel free to use these credentials:
* Username: guest
* Password: guest123

Readient is a MERN (MongoDB, Express, React, Node) application where users can search for books using the Google Books API. After signing up for an account, users can save books to their account or delete saved books if they choose.

## Packages used: 
* [Express](https://www.npmjs.com/package/express) - Web Server
* [Mongoose](https://www.npmjs.com/package/mongoose) - Object modeling
* [Axios](https://www.npmjs.com/package/axios) - Make HTTP requests to server and Google Books API
* [Passport.js](http://www.passportjs.org/) - User authentication
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Encrypting user passwords
* [dotenv](https://www.npmjs.com/package/dotenv) - Create an environment variable for hiding sensitive data
* [Morgan](https://www.npmjs.com/package/morgan) - Logger

## Libraries/Frameworks used:
* [React](https://reactjs.org/) - Building front end UI components
* [Bootstrap](https://getbootstrap.com/) - CSS and Modals
* [jQuery](https://jquery.com/) - Required for some Bootstrap features

## Challenges
Challenges included figuring out how to incorporate user authentication using a new database and React, and getting used to building front end UI and logic with React.

## Potential Changes
* Allow users to update the status of saved books to unread, reading, and read
* Incorporate user reviews on books and searching by reviews
* Fix an issue where refreshing the page drops the component state for save books depsite the user still being logged in

