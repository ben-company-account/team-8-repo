// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017/";
// const client = new MongoClient(uri);

// async function query_from_db() {
//     try {
//         const database = client.db('Green_Library');
//         const student_response = database.collection('Student_Responses');

//         const query = {  };
//         const responses = await student_response.find(query);

//         // Print returned documents
//         for await (const doc of responses) {
//         console.dir(doc);
//         }

//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
// }
// query_from_db().catch(console.dir);


// async function insert_into_db() {
//   try {
//     // Connect to the "insertDB" database and access its "haiku" collection
//     const database = client.db("Green_Library");
//     const haiku = database.collection("Student_Responses");
    
//     // Create a document to insert
//     const docs = [
//         { name: "Ben",content: "Tennis"}, 
//         { name: "Cara",content: "Basketball"}
//     ];
//     // Insert the defined document into the "haiku" collection
//     const result = await haiku.insertMany(docs);
//     console.log('Result = ', result);
//     // Print the ID of the inserted document
//     console.log(`${result.insertedCount} documents were inserted`);
//   } finally {
//      // Close the MongoDB client connection
//     await client.close();
//   }
// }
// // Run the function and handle any errors
// insert_into_db().catch(console.dir);


// query_from_db().catch(console.dir);


// async function delete_from_db() {
//     try {
//       const database = client.db("sample_mflix");
//       const movies = database.collection("movies");
//       /* Delete all documents that match the specified regular
//       expression in the title field from the "movies" collection */
//       const query = { title: { $regex: "Santa" } };
//       const result = await movies.deleteMany(query);
//       // Print the number of deleted documents
//       console.log("Deleted " + result.deletedCount + " documents");
//     } finally {
//       // Close the connection after the operation completes
//       await client.close();
//     }
// }
// // Run the program and print any thrown exceptions
// // delete_from_db().catch(console.dir);