const { MongoClient } = require('mongodb');

// Aapka ACTUAL connection string yaha dalna hai
// Aapne jo Atlas se copy kiya wo
const uri = "mongodb+srv://aman06052004_db_user:aman%408882@cluster0.2dazonu.mongodb.net/mokshayatra?appName=Cluster0";

async function testConnection() {
  console.log("🔗 Connecting to MongoDB Atlas...");
  console.log("📌 URI:", uri.replace(/:[^:]*@/, ':********@')); // Password hide karega
  
  const client = new MongoClient(uri);
  
  try {
    // Connect to the server
    await client.connect();
    console.log("✅ Connected successfully!");
    
    // Check connection
    await client.db("mokshayatra").command({ ping: 1 });
    console.log("✅ Database ping successful!");
    
    // List all databases
    console.log("\n📊 Listing all databases:");
    const databases = await client.db().admin().listDatabases();
    
    databases.databases.forEach(db => {
      console.log(`   - ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    
    // Check if our database exists
    const dbExists = databases.databases.some(db => db.name === "mokshayatra");
    if (dbExists) {
      console.log("\n🎯 Found 'mokshayatra' database!");
      
      // List collections in our database
      console.log("📁 Collections in 'mokshayatra':");
      const collections = await client.db("mokshayatra").listCollections().toArray();
      
      if (collections.length > 0) {
        collections.forEach(collection => {
          console.log(`   - ${collection.name}`);
        });
      } else {
        console.log("   No collections found (This is normal for new database)");
      }
    } else {
      console.log("\n⚠️ 'mokshayatra' database not found. It will be created automatically.");
    }
    
    console.log("\n✨ Connection test completed successfully!");
    
  } catch (error) {
    console.error("\n❌ CONNECTION FAILED!");
    console.error("Error details:", error.message);
    
    // Common errors aur solutions
    if (error.message.includes("bad auth")) {
      console.log("\n🔑 Authentication Error - Possible solutions:");
      console.log("1. Check username/password");
      console.log("2. Special characters in password? Try URL encoding:");
      console.log("   @ → %40");
      console.log("   ! → %21");
      console.log("   # → %23");
      console.log("   $ → %24");
    } else if (error.message.includes("timeout")) {
      console.log("\n⏰ Timeout Error - Possible solutions:");
      console.log("1. Check internet connection");
      console.log("2. Add IP to Atlas Network Access (0.0.0.0/0)");
    } else if (error.message.includes("ENOTFOUND")) {
      console.log("\n🌐 DNS Error - Possible solutions:");
      console.log("1. Check connection string");
      console.log("2. Cluster name correct? (cluster0.2dazonu)");
    }
    
  } finally {
    // Always close the connection
    await client.close();
    console.log("\n🔌 Connection closed.");
  }
}

// Run the test
testConnection();