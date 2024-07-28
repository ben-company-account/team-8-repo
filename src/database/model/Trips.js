import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Schema of the Table (Document)
const Trips_Schema = new Schema({
    trip_name: String,
});

// Instance of Schema 
const Trips_Schema_Model = model("Trips", Trips_Schema);

export default Trips_Schema_Model;