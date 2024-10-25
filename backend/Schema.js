import mongoose from "mongoose"; // Ensure mongoose is imported

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Ensure names are unique
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // This option adds createdAt and updatedAt fields
    }
);

export const User = mongoose.model("User", Schema, "user_details");
