const path = require('path');
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
let bucketName = '';

const storage = new Storage({
    keyFilename : path.join(__dirname,"ajirkhabar-3c865acc2bdd.json"),
    projectId: 'ajirkhabar'
});

// Lists all buckets in the current project
async function getAllBucketInfo() {
    // Creates the new bucket
    const [buckets] = await storage.getBuckets();
   // console.log(buckets); - (All Raw information)
   
  buckets.forEach(bucket => {
   //  console.log(bucket.name); - Each Bucket Name
        console.log(bucket.name);
    if(bucket.name === 'testajir2'){
        bucketName = bucket.name;
        uploadFile();
    }
  });
}
  // Get all the bucket from current project

  getAllBucketInfo();

//  Local file to upload, e.g. ./local/path/to/file.txt
    const filename = 'aboutUs.jpg';

  async function uploadFile() {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });
  
    console.log(`${filename} uploaded to ${bucketName}.`);
  }
  
  