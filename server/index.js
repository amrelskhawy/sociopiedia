import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { register } from './controllers/auth.js'
import PostClass from './controllers/posts.js'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import { verifyToken } from "./middleware/auth.js"

/*
    
    // UnComment it Only For the First Time To Intilliaze the First Data

    import User from "./models/User.js"
    import Post from "./models/Post.js"
    import { users, posts } from "./data/index.js"
*/

/* CONFIGRATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register)

const post = new PostClass()

app.post("/posts", verifyToken, upload.single("picture"), post.createPost)


/* ROUTES */
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/posts", postsRoutes)


/* MONGOOSE SETUP */
const MOGOOSE_URL = process.env.MONGO_URL
const PORT = process.env.PORT | 3001

mongoose.set('strictQuery', false)

mongoose.connect(MOGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    /*
     // UnComment it Only For the First Time To Intilliaze the First Data

     * User.insertMany(users)
     * Post.insertMany(posts)
     */
    
}).catch((err) => console.log(`${err} did not connect`))
