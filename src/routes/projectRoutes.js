const express = require("express");

const router = express.Router();


const {

    addProject,

    getAllProjects,

    getFeatured,

    getSingleProject,

    editProject,

    removeProject

} = require("../controllers/projectController");


const authenticateToken =
    require("../middleware/authMiddleware");



// =====================================================
// PUBLIC ROUTES
// =====================================================

// Featured projects
router.get(
    "/featured",
    getFeatured
);


// All projects
router.get(
    "/",
    getAllProjects
);


// Single project
router.get(
    "/:id",
    getSingleProject
);



// =====================================================
// ADMIN ROUTES
// =====================================================

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