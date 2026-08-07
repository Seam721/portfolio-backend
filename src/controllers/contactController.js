const {
    createContactMessage,
    getAllContacts,
    getContactById,
    deleteContact
} = require("../models/contactModel");

// CREATE CONTACT
const createContact = async (req, res) => {

    try {

        const {
            name,
            email,
            message
        } = req.body;


        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const contact = await createContactMessage(
            name,
            email,
            message
        );


        res.json({
            success: true,
            message: "Contact saved successfully",
            data: contact
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// GET ALL
const getContacts = async (req, res) => {

    try {

        const contacts = await getAllContacts();

        res.json({
            success: true,
            data: contacts
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


// GET ONE
const getContact = async (req,res)=>{

    try{

        const contact = await getContactById(req.params.id);

        if(!contact){
            return res.status(404).json({
                success:false,
                message:"Contact not found"
            });
        }


        res.json({
            success:true,
            data:contact
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// DELETE

const removeContact = async(req,res)=>{

    try{

        const contact = await deleteContact(req.params.id);


        if(!contact){
            return res.status(404).json({
                success:false,
                message:"Contact not found"
            });
        }


        res.json({
            success:true,
            message:"Contact deleted successfully",
            data:contact
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    createContact,
    getContacts,
    getContact,
    removeContact
};