import Student_Responses_Model from './model/StudentResponses.js';
import Trips_Schema_Model from './model/Trips.js';
import mongoose from 'mongoose';

try {
    mongoose.connect('mongodb://localhost:27017/Green_Library');
    console.log('Connected to Mongo DB')
} catch(error) {
    console.log(error)
}


// // Adding a new item 
// const stud_response = new Student_Responses_Model({
//     name: 'Shivam Butale', 
//     sport: 'Cricket'
// });

// // Insert the article in our MongoDB database
// await stud_response.save();

// // Find a single blog post
// const firstArticle = await Student_Responses_Model.findOne({});
// console.log(firstArticle);


// Create a new trip 
// // Adding a new item 
await Trips_Schema_Model.insertMany([
    {
        trip_name: 'Esri-Hackathon-Visit'
    }
    ]
);

// Find 
try {
    const trips = await Trips_Schema_Model.find();
    console.log(trips);
} catch(error) {
    console.log(error);
}



// // // Adding a new item 
// await Student_Responses_Model.insertMany([
//     {
//         name: 'Virat', 
//         sportChoice: 'Cricket', 
//         parkChoice: 'Picnic'
//     }, 
//     {
//         name: 'Ben', 
//         sportChoice: 'Tennis', 
//         parkChoice: 'Playground'
//     }
//     ]
// );



////////// WORKING //////////////////////
// Find 
try {
    const students = await Student_Responses_Model.find();
    console.log(students);
} catch(error) {
    console.log(error);
}

// Student_Responses_Model.find()
//   .then((students) => {
//     console.log('Retrieved students:', students);
//   })
//   .catch((error) => {
//     console.error('Error retrieving students:', error);
//   });
////////////////////////////////////////////////////////