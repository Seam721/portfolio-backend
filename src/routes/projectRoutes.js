const express = require("express");

const router = express.Router();

const {
    addProject,
    getAllProjects,
    getSingleProject,
    editProject,
    removeProject
} = require("../controllers/projectController");


const authenticateToken =
require("../middleware/authMiddleware");



// ==========================
// PUBLIC PROJECT ROUTES
// ==========================


// Website
router.get(
    "/",
    getAllProjects
);


router.get(
    "/:id",
    getSingleProject
);



// ==========================
// ADMIN PROJECT ROUTES
// ==========================


// Create
router.post(
    "/",
    authenticateToken,
    addProject
);


// Update
router.put(
    "/:id",
    authenticateToken,
    editProject
);


// Delete
router.delete(
    "/:id",
    authenticateToken,
    removeProject
);



module.exports = router;