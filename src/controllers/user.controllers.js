const UserService = require("../services/user.services");
const { userCreationValidator, loginValidator } = require("../validators/user.validator");
// console.log("userCreationValidator", userCreationValidator);

exports.register = async(req,res)=> {
    try{
        const {error, value} = userCreationValidator.validate(req.body);
        if(error){
            console.log("error :", error);
            return res.status(403).send(error.details[0].message);
        }
        await UserService.register(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.login = async(req,res)=> {
    try{
        
        await UserService.login(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.passwordReset = async(req,res)=> {
    try{
        await UserService.passwordReset(req,res);
    } catch (error) {
        console.log("error", error);
    }
}