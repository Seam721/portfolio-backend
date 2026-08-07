const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{

        const uniqueName =
        Date.now() +
        "-" +
        file.originalname;


        cb(null,uniqueName);

    }

});



const upload = multer({

    storage:storage,


    limits:{
        fileSize:5 * 1024 * 1024
    },


    fileFilter:(req,file,cb)=>{


        const allowed = [
            ".png",
            ".jpg",
            ".jpeg",
            ".pdf"
        ];


        const ext =
        path.extname(file.originalname);



        if(allowed.includes(ext)){

            cb(null,true);

        }else{

            cb(
                new Error("Invalid file type"),
                false
            );

        }

    }

});


module.exports = upload;