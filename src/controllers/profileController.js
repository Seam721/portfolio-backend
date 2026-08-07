const {
    getProfile,
    updateProfile
}=require("../models/profileModel");




// GET PROFILE

exports.profile = async(req,res)=>{

    try{


        const data =
        await getProfile();



        res.json({

            success:true,

            data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};






// UPDATE PROFILE

exports.editProfile = async(req,res)=>{

    try{


        const data =
        await updateProfile(
            req.params.id,
            req.body
        );



        res.json({

            success:true,

            message:"Profile updated successfully",

            data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};