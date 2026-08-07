const express = require("express");

const router = express.Router();


const {
    profile,
    editProfile

}=require("../controllers/profileController");



const authMiddleware =
require("../middleware/authMiddleware");



// GET PROFILE

router.get(
"/",
profile
);



// UPDATE PROFILE

router.put(
"/:id",
authMiddleware,
editProfile
);



module.exports = router;