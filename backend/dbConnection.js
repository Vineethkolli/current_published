import mongoose from "mongoose";

// Function to connect to Cluster 1 and its specific database and collection
export async function connectCluster1() {
    try {
        const uri1 = "mongodb+srv://kz8413:vineeth@cluster0.1pugx.mongodb.net/";
        const connection1 = mongoose.createConnection(uri1); // Create a separate connection for Cluster 1

        const db1 = connection1.useDb("2025"); // Database for cluster 1
        const user_details = db1.collection("user_details"); // Collection in database 1

        console.log('Cluster 1 (user_details) connected');
        return { user_details };
    } catch (error) {
        console.log("Error connecting to Cluster 1:", error);
    }
}

// Function to connect to Cluster 2 and its specific database and collection
export async function connectCluster2() {
    try {
        const uri2 = "mongodb+srv://kz8413:vineeth@cluster0.aq02c.mongodb.net/";
        const connection2 = mongoose.createConnection(uri2); // Create a separate connection for Cluster 2

        const db2 = connection2.useDb("2025"); // Database for cluster 2
        const income = db2.collection("income"); // Collection in database 2

        console.log('Cluster 2 (income) connected');
        return { income };
    } catch (error) {
        console.log("Error connecting to Cluster 2:", error);
    }
}

// Main function to connect to both clusters
export async function mongoDbConnection() {
    const cluster1 = await connectCluster1();
    const cluster2 = await connectCluster2();

    // Return both collections from different clusters
    return { ...cluster1, ...cluster2 };
}
