import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    salle: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "salles",
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    date:{
        type:Date,
    }
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
