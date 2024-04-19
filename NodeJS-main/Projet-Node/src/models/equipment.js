import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    number:{
        type: Number,
    },
});


const Equipment = mongoose.model("Equipment",equipmentSchema);

export default Equipment;