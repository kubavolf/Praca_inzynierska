const mongoose = require('mongoose');


// Schemat dla itemów
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
},
    { timestamps: true }); // Automatycznie dodaje pola `createdAt` i `updatedAt`!!!!


    
const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
