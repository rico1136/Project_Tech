# Jokes on me

A dating app for the ones seeking for a partner. A good partner is who you share intimate things with but the most important is a good laugh together.

Obviously a good sense humor is where you can share weird jokes with eachother. Laugh together is stay together.

![Wireflow app](https://github.com/joanpadolina/Project_Tech/blob/master/documentatie/Jome-branding-sketch.png)

### True Love Through Laugh

## Wiki

Follow the progress on the [wiki](https://github.com/rico1136/Project_Tech/wiki).

# Interested? Clone the following on your terminal:

## Before you clone

* Install Node.js
* Install a Code Editor
* An CLI(Command Line Interface) like bash or iTerm

## Used (necessery sources)

* NPM
* EJS
* SCSS
* Express

* Use npm install to install all the packages at once

## Database model

```
_id: (object id, this is generated by mongoose),
name: String,
age: Number,
sex: String,
email: String,
password: String (hashed)
profilePic: String (url to image)
about: String
freeTime: String
memeCategory: String
```
Example:

<img src="https://github.com/rico1136/Project_Tech/blob/master/documentatie/screenshot-database.png" width="800" height="auto"/>

## Installation

```
git clone https://github.com/rico1136/Project_Tech.git
```

Install used npm packages
```
npm install
```
Create an .ENV file
```
Touch .env
fill in the following:
DB_HOST=-the host of your database-
DB_PORT= -any port you like, we used 3000 for this project-  
DB_NAME= -name of your database- 
SESSION_SECRET= -secure session cookies-
```
Run the application
```
npm run dev
```


## Our features
1. Register / login page
2. Get a category of your humour, this way you can match with people who like the same memes
3. Your own dynamic profile page
4. Add memes to your profile which are being fetched by an API
5. Match with other users

## Usage
Start the application
```
node server.js
```
To compile SASS to CSS
```
npm run build
```
To run nodemon (nodemon will run server.js each time the file changes)
```
npm run dev
```
## Keep up to date
Make sure you pull the repository once in a while since we are still working on this project, you can do this by using ```git pull```

## Contributors
When having problems, you can contact one of our teammembers:
- [Coen Mathijssen](https://github.com/Coenmathijssen/blok-TECH/tree/master/Backend/myapp)
- [Rico Zethof](https://github.com/rico1136)
- [Giovanni Kaaijk](https://github.com/GiovanniKaaijk)
- [Joan Padolina](https://github.com/joanpadolina)
- [Harm van Verseveld](https://github.com/harmvv)

# License
[MIT](https://github.com/rico1136/Project_Tech/blob/master/LICENSE)
