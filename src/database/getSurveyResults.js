// Survey123 data can be accessed through the survey's feature service using the standard feature service REST API:

// https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm


// Use the Standard Feature service rest API to get data '
// Use your specific survey's feature service 


// {
//     "currentVersion" : 11.2, 
//     "services" : [
//       {
//         "name" : "survey123_067b9772239d43d6bab30d083d94b9f0", 
//         "type" : "FeatureServer", 
//         "url" : "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_067b9772239d43d6bab30d083d94b9f0/FeatureServer", 
//         "serviceItemId" : "7171002e2ad941dea8ee24d799574293"
//       }
//     ]
//   }

// https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/survey123_067b9772239d43d6bab30d083d94b9f0_results/FeatureServer



// https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/survey123_cdb9a6adf99842549c037c0630f1ca1f_results/FeatureServer

// let url = "https://intern-hackathon.maps.arcgis.com/home/item.html?id=22e54c3534ff414297e93c77570fca06&view=service"

// curl "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_067b9772239d43d6bab30d083d94b9f0_results/FeatureServer/0/query? \
// -d f=json \
// -d &token="3NKHt6i2urmWtqOuugvr9bF0pyLX9pdXGhJHFEJFP-7D5CXGCFwctF4x7L9Y1cwLmHrPuUldpyutjTx0m87etmCAEVjHrd0vBHMQytH-C4jQ5aRoigLtCK99STr2JHmq_h9d-AJ9A2iUssLQQa4jiRmUgjsT_tlvCWLzrRK1JOK2YFivZIqkxNwXh2WHZUWwIAAZyZmL_n6snwAjBnH7uooPJbWd5mrSq0xXZ-4IqO-EM38jH_WPEW3spjaDGtK32AbXmUv_-KzuCEgh0-fy7w.."
// -d &where="1=1" \
// -d &outFields="*"

// https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0/query?f=pbf&cacheHint=true&resultRecordCount=100&where=UseType = 'Irrigated Farm'&outFields=APN,UseType,TaxRateCity,TaxRateArea,Roll_LandValue&returnGeometry=false&token=<ACCESS_TOKEN>

const MongoClient = require('mongodb').MongoClient;

// Function to insert documents into MongoDB
async function insertDocuments(features, databaseName) {
    const client = new MongoClient('mongodb://localhost:27017/');
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db('Green_Library');
      const collection = db.collection(databaseName);
  
      // Iterate through each object in the array
      console.log("Features = ", features);
      console.log("******************************************")
      for (const feature of features) {
        const attributes = feature.attributes;
  
        // Insert the attributes object as a new document
        await collection.insertOne(attributes);
      }
  
      console.log('Documents inserted successfully');
    } catch (error) {
      console.error('Error inserting documents:', error);
    } finally {
      // Close the connection
      await client.close();
      console.log('Connection closed');
    }
}

// Pre Trip Survey 
let url1 = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_68517ecb324a461a9269c67e84046cf7_results/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnHiddenFields=true&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=AAPT3NKHt6i2urmWtqOuugvr9T0tVKPglJ7nFiNUYV0-2YM7lm0zmMgz2epVNPeqGyNGxEM7ulo8Fy2e7f7kBzcZvOmtLzvcejQAQ2cuuzBgCS5GXjHk_UnrT-yIbRieou3soEywP1iYkXq2UcKoZEqGFxcM9phybCejJZq-pbNqkWCDNrPAeCRnAvvoAiLA1ofMRZuGz1D0U5sOEzpDel2CsmoGL9cY-yIoAAI7xgN21iJYy660qXju8JikaPGdjUjCoI0MD6Kye3KgExuFyQL9LA.."

// fetch(url1).then((response) => {
//     console.log(response)
//     console.log("***")

//    response.json()
//   .then((body) => {
//     console.log('Body content:', body);
//     const features = body.features;
//     console.log("**** Features = ", features);
//     const databaseName = 'pre_trip_survey';
//     // Call the function to insert documents
//     insertDocuments(features, databaseName);
//   })
//   .catch((error) => {
//     console.error('Error reading body content:', error);
//   });
// })


// console.log("*****************************************************************************************************************")


// // Post Trip Survey 
let url = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_cdb9a6adf99842549c037c0630f1ca1f_results/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnHiddenFields=true&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=AAPT3NKHt6i2urmWtqOuugvr9T0tVKPglJ7nFiNUYV0-2YM7lm0zmMgz2epVNPeqGyNGxEM7ulo8Fy2e7f7kBzcZvOmtLzvcejQAQ2cuuzBgCS5GXjHk_UnrT-yIbRieou3soEywP1iYkXq2UcKoZEqGFxcM9phybCejJZq-pbNqkWCDNrPAeCRnAvvoAiLA1ofMRZuGz1D0U5sOEzpDel2CsmoGL9cY-yIoAAI7xgN21iJYy660qXju8JikaPGdjUjCoI0MD6Kye3KgExuFyQL9LA.."

fetch(url).then((response) => {
    console.log(response)
    console.log("***")

   response.json()
  .then((body) => {
    console.log('Body content:', body);
    const features = body.features;
    console.log("**** Features = ", features);
    const databaseName = 'post_trip_survey';
    // Call the function to insert documents
    insertDocuments(features, databaseName);
  })
  .catch((error) => {
    console.error('Error reading body content:', error);
  });
})


// get average of all numerical values 


// MongoClient.connect('mongodb://localhost:27017/')
//   .then((client) => {
//     console.log('Connected to MongoDB');

//     const db = client.db('Green_Library');
//     const collection = db.collection('post_trip_survey');

//     // Find all the records in the collection
//     collection.find({}).toArray()
//       .then((records) => {
//         // Calculate the average value of knowledge
//         const totalKnowledge = records.reduce((sum, record) => sum + record.knowledge, 0);
//         const averageKnowledge = totalKnowledge / records.length;

//         console.log('Average value of knowledge:', averageKnowledge);


//         // Calculate the average value of HowMuchValue)
//         const totalHowMuchValue = records.reduce((sum, record) => sum + record.how_much_value_did_you_gain_fro, 0);
//         const averageHowMuchValue = totalHowMuchValue / records.length;

//         console.log('Average value of HowMuchValueDidYouGain:', averageHowMuchValue);


//         // Calculate the average value of Recommend
//         const totalRecommend = records.reduce((sum, record) => sum + record.reccomend, 0);
//         const averageRecommend = totalRecommend / records.length;

//         console.log('Average value of Recommend:', averageRecommend);
//       })
//       .catch((error) => {
//         console.error('Error retrieving records:', error);
//       })
//       .finally(() => {
//         // Close the MongoDB connection
//         client.close()
//           .then(() => {
//             console.log('Connection closed');
//           })
//           .catch((error) => {
//             console.error('Error closing connection:', error);
//           });
//       });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });


// TODO: check duplicated additions 
// todo: check 