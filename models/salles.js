import mongoose, { mongo } from "mongoose";

const SallesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    
    details: {
        type: String,
        max: 255,
    },

    capacity: {
        type: Number,
    },

    disponible: {
        type: Boolean,
        default: true,
    },

    equipment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipment", 
    }],

    image: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "salleImages", 
    }],

});

const Salles = mongoose.model("Salles",SallesSchema);




export default Salles;