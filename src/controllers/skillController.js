const {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill
}=require("../models/skillModel");



// CREATE

exports.addSkill = async(req,res)=>{

    try{

        const skill =
        await createSkill(req.body);


        res.json({
            success:true,
            message:"Skill created successfully",
            data:skill
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// GET ALL

exports.skills = async(req,res)=>{

    try{

        const skills =
        await getSkills();


        res.json({
            success:true,
            data:skills
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// GET ONE

exports.skillById = async(req,res)=>{

    try{

        const skill =
        await getSkillById(req.params.id);


        res.json({
            success:true,
            data:skill
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// UPDATE

exports.editSkill = async(req,res)=>{

    try{

        const skill =
        await updateSkill(
            req.params.id,
            req.body
        );


        res.json({
            success:true,
            message:"Skill updated successfully",
            data:skill
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// DELETE

exports.removeSkill = async(req,res)=>{

    try{

        await deleteSkill(req.params.id);


        res.json({
            success:true,
            message:"Skill deleted successfully"
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};