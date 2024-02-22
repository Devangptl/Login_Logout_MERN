import express  from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"


const router = new express.Router()



//signup

router.post("/signup" , async(req,res) =>{
    // console.log(req.body)

    const {name , email , password , cpassword} = req.body

    if(!name || !email || !password || !cpassword){
        res.status(420).json({error : "fill the all Details"})
    }

        try {
            if(password !== cpassword){
                res.status(420).json({error : " Password does not match"});
            }else{

                const preuser = await User.findOne({email : email})
                if(preuser){
                    res.status(420).json({error : "User already exists!"});
                }
                else{
                    const finaluser = new User({
                        name,
                        email,
                        password,
                        cpassword
                    })
                    
                    const storeData = await finaluser.save()
                    
                    // console.log(storeData)
                    
                    res.status(201).json({status:201 , storeData})
                }
            }
        } catch (error) {
            res.status(420).json(error);
            console.log("catch block error")
        }
    

})



//login router

router.post("/login" , async(req, res)=>{
    // console.log(req.body)
    const {email , password} = req.body
    if(!email || !password ){
        res.status(420).json({error : "Fill the all Details"})
    }

    try {
        const userValid = await User.findOne({email : email})

        if(userValid){
            const isMatch = await bcrypt.compare(password , userValid.password)

            if(!isMatch){
                res.status(420).json({error : "Invalid Password"})
            }
            else{
                //token generate
                //cookie generate

                res.status(201).json({status : 201 , userValid})
            }
        }
    } catch (error) {
        res.status(420).json({error : " login catch error"})

    }
})


export default router