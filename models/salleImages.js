import mongoose from "mongoose";

const salleImageSchema = new mongoose.Schema({
    image:{
        data: Buffer,
        contentType :String,
    },
})

const sallesImage = mongoose.model("sallesImage",salleImageSchema);




export default sallesImage;