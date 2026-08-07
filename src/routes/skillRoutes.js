const express = require("express");

const router = express.Router();


const {
    addSkill,
    skills,
    skillById,
    editSkill,
    removeSkill

}=require("../controllers/skillController");


const authMiddleware =
require("../middleware/authMiddleware");



// CREATE SKILL
router.post(
"/",
authMiddleware,
addSkill
);


// GET ALL
router.get(
"/",
skills
);


// GET ONE
router.get(
"/:id",
skillById
);


// UPDATE
router.put(
"/:id",
authMiddleware,
editSkill
);


// DELETE
router.delete(
"/:id",
authMiddleware,
removeSkill
);


module.exports = router;