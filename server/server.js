require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const {register} = require('./Controllers/Auth')
const AuthRoute = require('./Routes/auth')
const ProjectRoute = require('./Routes/projects')
const TaskRoute = require('./Routes/task')
const UserRoute= require('./Routes/user')

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the database");
})
.catch((error) => {
    console.error("Database connection error:", error);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/auth/register', upload.single('avatar'), register);
app.use('/Auth',AuthRoute)
app.use('/projects',ProjectRoute)
app.use('/Task',TaskRoute)
app.use('/User',UserRoute)


const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port", server.address().port);
});
