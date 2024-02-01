const userModel = require("../model/model")
const {validateCreateUser} = require("../validator/validator")
const bcrypt = require("bcrypt")

//homepage
exports.homepage= async (req,res)=>{
    try {

        if(req.session.user){
            console.log(req.session.user)


            const user = await userModel.findOne({email:req.session.user.username})
            res.send(`welcome to my api, ${user.firstName} ${user.lastName}`)
        }
        else{
          return res.json("You must be logged in")
        }
     
        
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

//create a user
exports.createUser = async (req, res) => {
    try {
        const {error} = validateCreateUser(req.body)
        if(error){
           return res.status(500).json({
                message: error.details[0].message,
            })
        }else{
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender,

            }
            const checkUser = await userModel.findOne({email:data.email})
            if(checkUser){
                return res.status(200).json({
                    message: 'Email already exists',
                })
            }

            const salt = bcrypt.genSaltSync(12)
            const hashedPassword = bcrypt.hashSync(data.password, salt)

            const user = new userModel({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashedPassword,
                email: data.email,
                gender: data.gender,
            })
          
            await user.save()
            return res.status(200).json({
                message: "Welcome on board" + user.firstName +" "+user.lastName,
                data: user
            })

        }
        
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

//To log in
exports.logIn = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const checkUser = await userModel.findOne({ email: email});
        if(!checkUser){
            return res.status(404).json({
                message: "User not found " ,
            })
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.password)
        if(!checkPassword){
            return res.status(200).json({
                message: "Incorrect password"

            })
        }
        const username = checkUser.email
        req.session.user = {username}
        return res.status(200).json({
            message: "Log in successfully",
            data: checkUser
        })
      
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    } 
    
}

exports.logOut=(req,res)=>{
    req.session.destroy()
res.json({success:true, message:"Logged out successful"})
}


const passport = require('passport')

