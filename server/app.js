import  express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db/conn.js";
import router from "./router/user.router.js";

const app = express()

dotenv.config()

connectDb()

app.use(express.json())
app.use(cors())
app.use(router)

app.get("/" , (req , res)=>{
    res.send("Server is start")
})


app.listen(process.env.PORT , ()=>{
    console.log( `server running at http://localhost:8800`)
})