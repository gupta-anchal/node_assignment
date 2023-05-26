const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=> {
    try {
        const {first_name, last_name, email, phone_number, password} = req.body;
        let user = await User.findOne({
            $or: [{
              "email": email
            }, {
              "phone_number": phone_number
            }]
          });
        if(user){
            return(res.status(403).json({
                success : false,
                message : "User Already existing"
            }))
        }
        await User.create({
            first_name : first_name, 
            last_name : last_name, 
            email : email, 
            phone_number : phone_number,
            password : password,
        });

        res.status(201).json({
            success : true,
            message : "User created successfully"
        })
    }
    catch(error) {
        console.log("error", error);
        res.status(500).send("Server error")
    }
}

exports.login = async(req,res)=> {
    try {
        const {email, phone_number, password} = req.body;
        let user = await User.findOne({
            $or: [{
              "email": email
            }, {
              "phone_number": phone_number
            }],
            password : password
          });
        if(user){
            res.status(200).json({
                success : true,
                message : "User login successfull",
            })
        }  
        else {
            res.status(404).json({
                success : false,
                message : "Invalid credentials",
            })
        }
    } catch (error) {
        console.log("error :", error);
        res.status(500).send("Server Error!");
    }
}

exports.passwordReset = async(req,res)=> {
    try {
        const {email, phone_number, old_password, new_password} = req.body;
        let user = await User.findOne({ //findAndUpdate
            $or: [{
              "email": email
            }, {
              "phone_number": phone_number
            }],
            password : old_password
          });
        if(!user){
            res.status(404).json({
                success : false,
                message : "Invalid credentials",
            })
        }  
        else {
            await User.updateOne(
                {$or: [{
                    "email": email
                  }, {
                    "phone_number": phone_number
                  }]},
                {$set: {password: new_password}}
            );
            // let user = await User.find({email : email});
            res.status(200).json({
                success : true,
                message : "User updated successfully",
                // data : user,
            })  
        }
    } catch (error) {
        console.log("error :", error);
        res.status(500).send("Server Error!");
    }
}