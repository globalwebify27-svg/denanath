const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const dns = require('dns');

// Set DNS to Google to resolve MongoDB Atlas SRV query issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function runMigration() {
  const mongoUri = process.env.MONGODB_URI;
  const mysqlUri = process.env.DATABASE_URL;

  // Safety check: Prevent overwriting Hostinger production database
  if (!mysqlUri) {
    console.error("❌ Error: DATABASE_URL is missing in .env");
    process.exit(1);
  }
  
  // NOTE: If you are migrating to production, temporarily comment out this safety block:
  if (mysqlUri.includes('hstgr.io') || mysqlUri.includes('srv2108')) {
    console.error("❌ CRITICAL ERROR: DATABASE_URL points to Hostinger production. Migration aborted for safety!");
    process.exit(1);
  }

  console.log("--------------------------------------------------");
  console.log("SAFETY CHECK PASSED.");
  console.log(`Source (Atlas): ${mongoUri}`);
  console.log(`Target: ${mysqlUri}`);
  console.log("--------------------------------------------------");

  const mongoClient = new MongoClient(mongoUri);
  const prisma = new PrismaClient();

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoClient.connect();
    console.log("✅ Connected successfully to Atlas.");

    // Connect to the 'test' database as seen in MongoDB Explorer
    const db = mongoClient.db('test');
    const collection = db.collection('doctors');

    console.log("Fetching doctors from MongoDB Atlas...");
    const mongoDoctors = await collection.find({}).toArray();
    console.log(`Found ${mongoDoctors.length} doctors in Atlas.`);

    if (mongoDoctors.length === 0) {
      console.log("❌ No doctors found in MongoDB. Please check connection.");
      return;
    }

    console.log("Clearing existing records in MySQL Doctor table...");
    await prisma.doctor.deleteMany({});
    console.log("MySQL Doctor table cleared.");

    console.log("Mapping and inserting doctors into MySQL...");
    let successCount = 0;

    for (const doc of mongoDoctors) {
      try {
        // Extract specialty from the first branch in opdTimings, or default to General Medicine
        let specialty = "General Medicine";
        if (doc.opdTimings && doc.opdTimings[0] && doc.opdTimings[0].branch) {
          specialty = doc.opdTimings[0].branch;
        }

        // Clean timings schema to match MySQL
        const cleanTimings = doc.opdTimings
          ? doc.opdTimings.map(t => ({
              branch: t.branch || "",
              day: t.day || "",
              time: t.time || ""
            }))
          : [];

        // Format publication string URL to MySQL expected publications structure [{ title, link }]
        const cleanPublications = doc.publication
          ? [{ title: "View PDF Link", link: doc.publication }]
          : [];

        await prisma.doctor.create({
          data: {
            name: doc.fullName || "Unknown Doctor",
            image: doc.photo || null,
            qualifications: doc.qualifications || null,
            specialty: specialty,
            timings: JSON.stringify(cleanTimings),
            education: doc.education ? JSON.stringify(doc.education) : "[]",
            training: doc.training ? JSON.stringify(doc.training) : "[]",
            experience: doc.experience ? JSON.stringify(doc.experience) : "[]",
            publications: JSON.stringify(cleanPublications),
          }
        });
        successCount++;
      } catch (err) {
        console.error(`❌ Error migrating doctor ${doc.fullName}:`, err.message);
      }
    }

    console.log("--------------------------------------------------");
    console.log(`MIGRATION COMPLETE!`);
    console.log(`Successfully migrated ${successCount} out of ${mongoDoctors.length} doctors.`);
    console.log("--------------------------------------------------");

  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await mongoClient.close();
    await prisma.$disconnect();
  }
}

runMigration();
