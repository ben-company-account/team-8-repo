import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Schema of the Table (Document)
const Student_Responses_Schema = new Schema({
    name: String,
    sportChoice: String, 
    parkChoice: String, 
});

// Instance of Schema 
const Student_Responses_Model = model("Student_Responses", Student_Responses_Schema);

export default Student_Responses_Model;