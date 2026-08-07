const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
    createContact,
    getContacts,
    getContact,
    removeContact
} = require("../controllers/contactController");


// Public route - anyone can send contact message
router.post(
    "/",
    createContact
);


// Protected routes - admin only
router.get(
    "/",
    authMiddleware,
    getContacts
);


router.get(
    "/:id",
    authMiddleware,
    getContact
);


router.delete(
    "/:id",
    authMiddleware,
    removeContact
);


module.exports = router;