import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"

const authenticate = async(req ,res ,next) => {
    
    try {
        const token = req.headers.authorization
        // console.log(token);

        const varifyToken = jwt.verify(token, process.env.JWT_SECRET)

        // console.log(varifyToken)

        const rootUser = await User.findOne({_id : varifyToken._id })

        console.log(rootUser)

    

    } catch (error) {
        
    }

}

export default authenticate
