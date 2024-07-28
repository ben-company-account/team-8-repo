const MongoClient = require('mongodb').MongoClient;

// Function to insert documents into MongoDB
async function insertDocuments(features, collectionName) {
    const client = new MongoClient('mongodb://localhost:27017/');
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
  
      const db = client.db('Green_Library');
      const collection = db.collection(collectionName);
  
      // Iterate through each object in the array
      for (const feature of features) {
        const attributes = feature.attributes;

         // Find records by name
        const name = attributes.name;
        const query = { name: name };

        const arr = collection.find(query).toArray();
        if((await arr).length != 0) {
            //skip Insertion because record exists 
        } else {
            // Insert the attributes object as a new document
            await collection.insertOne(attributes);
        }
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

async function process_pre_trip_survey() {
    // Pre Trip Survey 
    let pre_trip_url = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_68517ecb324a461a9269c67e84046cf7_results/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnHiddenFields=true&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=AAPT3NKHt6i2urmWtqOuugvr9T0tVKPglJ7nFiNUYV0-2YM7lm0zmMgz2epVNPeqGyNGxEM7ulo8Fy2e7f7kBzcZvOmtLzvcejQAQ2cuuzBgCS5GXjHk_UnrT-yIbRieou3soEywP1iYkXq2UcKoZEqGFxcM9phybCejJZq-pbNqkWCDNrPAeCRnAvvoAiLA1ofMRZuGz1D0U5sOEzpDel2CsmoGL9cY-yIoAAI7xgN21iJYy660qXju8JikaPGdjUjCoI0MD6Kye3KgExuFyQL9LA.."

    fetch(pre_trip_url).then((response) => {
       console.log(response)

       response.json()
      .then((body) => {
        const features = body.features;
        const collectionName = 'pre_trip_survey';
        // Call the function to insert documents
        insertDocuments(features, collectionName);
      })
      .catch((error) => {
        console.error('Error reading body content:', error);
      });
    })
}

async function process_post_trip_survey() {

    // Post Trip Survey 
    let url = "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/ArcGIS/rest/services/survey123_cdb9a6adf99842549c037c0630f1ca1f_results/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnHiddenFields=true&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=AAPT3NKHt6i2urmWtqOuugvr9T0tVKPglJ7nFiNUYV0-2YM7lm0zmMgz2epVNPeqGyNGYBfhvKNxvpZ0NTXJ8g4Wd_g8_ZUwFsSsFTDahHJBedkhWsLtmaoOa5eWXZMe_oOyqavkLHIwcDpJaXoF-M8MURlyBK6pLVDWlwaly8dYm4nXJqECkPdgp6j_hUY-BB8qXlJOWEh_LLXDnlybsZXdkLq7O3tIP8bDeTkUGNrqfwv79xsemzpoIBwCj4zntMyWvbMLKfLQrZ_XZuyzIsSE0g.."

    fetch(url).then((response) => {
    response.json()
    .then((body) => {
        const features = body.features;
        const collectionName = 'post_trip_survey';
        // Call the function to insert documents
        insertDocuments(features, collectionName);
    })
    .catch((error) => {
        console.error('Error reading body content:', error);
    });
    })

}

// get average of all numerical values 
async function process_numerical_post_trip_data() {
    MongoClient.connect('mongodb://localhost:27017/')
    .then((client) => {
        console.log('Connected to MongoDB');

        const db = client.db('Green_Library');
        const collection = db.collection('post_trip_survey');

        // Find all the records in the collection
        collection.find({}).toArray()
        .then((records) => {
            // Calculate the average value of knowledge
            const totalKnowledge = records.reduce((sum, record) => sum + record.knowledge, 0);
            const averageKnowledge = totalKnowledge / records.length;

            console.log('Average value of knowledge:', averageKnowledge);


            // Calculate the average value of HowMuchValue)
            const totalHowMuchValue = records.reduce((sum, record) => sum + record.how_much_value_did_you_gain_fro, 0);
            const averageHowMuchValue = totalHowMuchValue / records.length;

            console.log('Average value of HowMuchValueDidYouGain:', averageHowMuchValue);


            // Calculate the average value of Recommend
            const totalRecommend = records.reduce((sum, record) => sum + record.reccomend, 0);
            const averageRecommend = totalRecommend / records.length;

            console.log('Average value of Recommend:', averageRecommend);
        })
        .catch((error) => {
            console.error('Error retrieving records:', error);
        })
        .finally(() => {
            // Close the MongoDB connection
            client.close()
            .then(() => {
                console.log('Connection closed');
            })
            .catch((error) => {
                console.error('Error closing connection:', error);
            });
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

process_post_trip_survey()