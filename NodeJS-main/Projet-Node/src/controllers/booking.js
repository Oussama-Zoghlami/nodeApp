import Booking from "../models/book.js";
import Salles from "../models/salles.js";

export async function bookSalle(req, res) {
    try {
        const { userId, salleId } = req.body;

        // Check if the salle is available
        const salle = await Salles.findById(salleId);
        if (!salle || !salle.disponible) {
            return res.status(404).json({ message: "Salle not available" });
        }

        // Update the salle to mark it as unavailable
        salle.disponible = false;
        await salle.save();

        // Create a new booking document
        const booking = new Booking({
            user: userId,
            salle: salleId
        });

        // Save the booking
        await booking.save();

        res.status(200).json({ message: "Salle booked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
