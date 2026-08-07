const express = require("express");
const cors = require("cors");


// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const authenticateToken = require("./middleware/authMiddleware");


// Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const profileRoutes = require("./routes/profileRoutes");



// Create Express App FIRST
const app = express();




/* ==========================================
   Global Middleware
========================================== */


app.use(cors());


app.use(express.json());


app.use(express.urlencoded({
    extended:true
}));


app.use(logger);



// Upload folder access

app.use(
    "/uploads",
    express.static("uploads")
);





/* ==========================================
   Health Check
========================================== */


app.get("/", (req,res)=>{

    res.status(200).json({

        success:true,

        message:"Portfolio API Running"

    });

});



app.get("/api/health",(req,res)=>{

    res.status(200).json({

        success:true,

        message:"Portfolio API is running",

        timestamp:new Date().toISOString(),

        uptime:process.uptime()

    });

});





/* ==========================================
   Public Routes
========================================== */


// Authentication

app.use(
    "/api/auth",
    authRoutes
);



// Contact

app.use(
    "/api/contact",
    contactRoutes
);



// Profile

app.use(
    "/api/profile",
    profileRoutes
);






/* ==========================================
   Protected Routes
========================================== */


// Projects

app.use(
"/api/projects",
projectRoutes
);


// Skills

app.use(
"/api/skills",
skillRoutes
);    







/* ==========================================
   Dashboard Test
========================================== */


app.get(
    "/api/dashboard",
    authenticateToken,
    (req,res)=>{


        res.status(200).json({

            success:true,

            message:"Welcome Admin",

            admin:req.admin

        });


    }
);







/* ==========================================
   404 Middleware
========================================== */


app.use(notFound);






/* ==========================================
   Error Middleware
========================================== */


app.use(errorHandler);





module.exports = app;