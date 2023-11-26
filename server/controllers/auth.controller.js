import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {errorHandler} from "../utils/error.js"

export const signup= async (req,res, next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(user) return res.status(500).json({msg: "a user with this email address already exists"});
        const password = await bcrypt.hash(req.body.password, 10);
        
        //compare passwords
        // const result = await bcrypt.compare(req.body.password, password);
        // console.log(result);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: password,
        })

            await newUser.save();
            res.status(201).json('User created successfully!');
          } catch (error) {
            next(error)
          }
}