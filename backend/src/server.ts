import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import taskRoutes from "./interfaces/http/routes/taskRoutes"
import authRoutes from "./interfaces/http/routes/authRoutes"
import { errorHandler } from "./interfaces/http/middlewares/errorHandler"


const app = express()

app.use(express.json())
// 🔥 LIBERA CORS
app.use(cors())

mongoose.connect("mongodb://localhost:27017/taskdb")
.then(() => console.log("Mongo connected"))


app.use("/api", taskRoutes)
app.use("/api", authRoutes)
// middleware global de erro
app.use(errorHandler)


app.listen(3000, () => {
 console.log("Server running")
})