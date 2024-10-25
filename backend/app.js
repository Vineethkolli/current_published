import express from 'express';
import cors from 'cors';
import { mongoDbConnection } from './dbConnection.js';
import { User } from './Schema.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'; // Ensure mongoose is imported

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: ["https://currentfrontend.vercel.app"], // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}));

// User signup (handled by Cluster 1's "user_details" collection)
app.post('/signupDetails', async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;

    try {
        const { user_details } = await mongoDbConnection('Cluster1'); // Cluster 1 for user_details collection
        const existingUser = await user_details.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, phoneNumber, password });
        await user_details.insertOne(newUser);
        res.status(200).json({ message: 'User successfully inserted into db' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// User sign-in (handled by Cluster 1's "user_details" collection)
app.post('/signinDetails', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user_details } = await mongoDbConnection('Cluster1'); // Cluster 1 for user_details collection
        const user = await user_details.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not in the database' });
        }

        if (user.password === password) {
            const token = jwt.sign({ email: user.email }, 'iloveyou', { expiresIn: '2h' });
            return res.status(200).json({
                message: 'User in the database',
                token: token,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            });
        } else {
            return res.status(400).json({ message: 'Password is incorrect. Please enter valid password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Income Entry (handled by Cluster 2's "income" collection)
app.post('/incomeEntry', async (req, res) => {
    const { name, amount, status, paymentMode, belongsTo } = req.body;

    try {
        const { income } = await mongoDbConnection('Cluster2'); // Cluster 2 for income collection
        const existingEntry = await income.findOne({ name });

        if (existingEntry) {
            return res.status(400).json({ message: 'Entry with this name already exists' });
        }

        const newEntry = { name, amount, status, paymentMode, belongsTo };
        await income.insertOne(newEntry); // Insert into income collection
        res.status(200).json({ message: 'Income entry added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Get Income Data (handled by Cluster 2's "income" collection)
app.get('/incomeData/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const { income } = await mongoDbConnection('Cluster2'); // Cluster 2 for income collection
        const entry = await income.findOne({ name });

        if (!entry) {
            return res.status(404).json(null);
        }
        res.json(entry);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Update Income Data (handled by Cluster 2's "income" collection)
app.put('/updateIncomeData', async (req, res) => {
    const updatedData = req.body;
    try {
        const { income } = await mongoDbConnection('Cluster2'); // Cluster 2 for income collection

        // Remove _id from updatedData if it exists to prevent MongoDB update error
        const { _id, ...dataWithoutId } = updatedData;

        await income.updateOne(
            { _id: new mongoose.Types.ObjectId(_id) },  // Use _id for query
            { $set: dataWithoutId }  // Update other fields excluding _id
        );

        res.status(200).json({ message: 'Income data updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Delete Income Data (handled by Cluster 2's "income" collection)
app.delete('/deleteIncomeData/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { income } = await mongoDbConnection('Cluster2'); // Cluster 2 for income collection
        await income.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ message: 'Income data deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Start server
app.listen(3820, () => {
    console.log('Node.js is running on port 3820');
});
