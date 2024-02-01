const express = require('express');
const router =express.Router()

const {
    homepage,
    createUser,
    logIn,
    logOut,
    
}= require("../controller/userController")

//endpoint for the homepage
router.get('/', homepage);

//endpoint to create a new user
router.post('/signUp', createUser)

// //endpoint to create a new user
 router.post('/logIn', logIn)


//endpoint to create a new user
router.get('/sociallogIn', async(req,res)=>{
    res.redirect("http://localhost:5879/auth/facebook/")

})
 
const passport = require('passport')      
    

// Endpoint for Facebook authentication initiation
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile','email']}));


// Callback endpoint for Facebook authentication
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', 
    { successRedirect: '/auth/facebook/success', 
    failureRedirect: '/auth/facebook/failure'
 }));

// Success redirect endpoint after Facebook authentication
router.get('/auth/facebook/success', (req, res) => {
    console.log(req.user)
const username=req.user.email
req.session.user={username}
    // Handle successful authentication here, if needed
    res.json({
         message: 'Facebook authentication successful' });

})


// Failure redirect endpoint after Facebook authentication
router.get('/auth/facebook/failure', (req, res) => {
    // Handle failed authentication here, if needed
    res.json({ message: 'Facebook authentication failed' });
});
 
router.post("/logout",logOut)



module.exports = router 