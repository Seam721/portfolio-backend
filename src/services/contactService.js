const contactModel = require("../models/contactModel");


const createContact = async(data)=>{

    const {
        name,
        email,
        message
    } = data;


    if(!name || !email || !message){

        throw new Error(
            "All fields are required"
        );

    }


    return await contactModel.createContact(
        name,
        email,
        message
    );

};


module.exports = {
    createContact
};