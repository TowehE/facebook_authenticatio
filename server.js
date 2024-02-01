const express = require('express');
require("./dbConfg/dbConfg")

require("dotenv").config()

 const userRouter = require("./router/router");
const session = require('express-session');
const passport = require("passport");
const userModel = require('./model/model');
const facebookStrategy = require("passport-facebook").Strategy

const app = express()

app.use(express.json())

app.use(session({ 
    secret: process.env.sessionSecret, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))

// intialize passport
  app.use(passport.initialize())
// integrate passport with session auth
  app.use(passport.session())

  passport.use(new facebookStrategy({
    clientID:    process.env.AppID,
    clientSecret: process.env.appSecret,
    callbackURL: process.env.callbackURL,
    profileFields: ['id', 'displayName', 'photos','email'],
  },
  async(request, accessToken, refreshToken, profile, done)=> {
    try {
      // Check if the user already exists in your database
      let user = await userModel.findOne({ email:profile._json.email});
      
      if (!user) {
        // If the user doesn't exist, create a new user
       const user = await userModel.create({
          firstName : profile.displayName.split(' ')[1],
          lastName: profile.displayName.split(' ')[0],
          email: profile._json.email,
          profilePicture :profile.photos[0].value,
          isVerified : true
          // You can add more fields here as needed
        });
          
      return done(null, user)
      }
      else{
        return done(null,user)
      }      
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.serializeUser((user,done)=>{
  return done(null, user)
})

passport.deserializeUser((user,done)=>{
  return done(null, user)
})

app.use("/", userRouter)


const port = process.env.port
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

