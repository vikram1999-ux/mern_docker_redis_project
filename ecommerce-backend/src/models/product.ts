import mongoose from  "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Name"],
        },
        photos: [
            {
            public_id: {
                type: String,
                required: [true, "Please enter Public ID"],
            },
            url: {
                type: String,
                required: [true, "Please enter URL"],
            },
            },
        ],  
        price: {
            type: Number,
            required: [true, "Please enter product Price"],
            min: [0, "Price must be greater than or equal to 0"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter Product Stock"],
            min: [0, "Stock must be greater than or equal to 0"],
        },
        category: {
            type: String,
            required: [true, "Please enter Product Category"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please enter Description"],
        },
        ratings: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", schema);