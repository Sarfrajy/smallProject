const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} =require('apollo-server');

const {validateRegisterInput,validateLoginInput} =require('../../util/validators')
const User = require('../../model/User')
const {SECRET_KEY} = require("../../config")


function generateToken(user){

    return jwt.sign({
        id: user.id,
        email:user.email,
        username: user.username
    },
    SECRET_KEY, {expiresIn: '1h'});
}

module.exports={
    Mutation:{
async login(_,{username,password}){

    const {errors,valid} = validateLoginInput(username,password);
    if(!valid)
{
    throw new UserInputError('error',{errors})
}
    //get the user from dataBase
    const user = await User.findOne({username});

    if(!user){
     
        errors.general = 'user not found';
        throw new UserInputError('user not found!!!', {errors});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match)
    {
        errors.general = 'Wrong Credentials!!!!';
        throw new UserInputError('Wrong Credentials!!!!', {errors});
    }
    const token= generateToken(user);
    
    return {
        ...user._doc,
        id: user._id,
        token
    };
},
         

      async  register(_,{registerInput:{username, email, password, confirmPassword}
        },
        context,
        info
        ) {
             //validate user data
             const {valid,errors} = validateRegisterInput(username, email, password, confirmPassword)
             if(!valid)
             {  
                 throw new UserInputError('Errors',{errors})
             }
             //make sure user does not already exist
             const user=await User.findOne({username})
             if(user)
             {
                 throw new UserInputError('user name already taken',{

                    errors:{
                        username: 'This username is all ready taken'
                    }

                 })
             }

             const Email=await User.findOne({email})
             if(Email)
             {
                 throw new UserInputError('email already taken',{

                    errors:{
                        email: 'This email is all ready taken'
                    }

                 })
             }



             //hash password and create and auth token
             password = await bcrypt.hash(password,12);

             const newUser = new User({
                 email,
                 username,
                 password,
                 createAt : new Date().toISOString()

             });

             const res = await newUser.save();
             const token= generateToken(res)

             return {
                 ...res._doc,
                 id: res._id,
                 token
             }

        }
    }
}