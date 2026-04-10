const express = require("express")
const http = require("http");
const app = express();
const cors = require("cors");
require("dotenv").config();
const server = http.createServer(app);
const tasksRoutes = require("./routes/Task.routes")
const authRoutes = require("./routes/auth.route")
const cookieParser = require("cookie-parser");


app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
    credentials:true
}))
const tasks = [];
app.get("/test", (req, res) => {
    res.send("This is test route")
})

app.use("/tasks", tasksRoutes);
app.use("/",authRoutes)



server.listen(5000,()=>{console.log("appis running at 5000");
})
