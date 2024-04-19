import Salles from "../models/salles.js";
import Equipment from "../models/equipment.js";

export async function addSalle(req, res) {

    const { name, details, capacity, equipment } = req.body;
    try {

        // Create an array to store equipment ObjectIds
        const equipmentIds = [];

        // Iterate through the equipment data
        for (const eq of equipment) {
            // Create new equipment document for each item
            const newEquipment = new Equipment({
                name: eq.name,
                number: eq.number,
            });

            // Save the new equipment document
            const savedEquipment = await newEquipment.save();

            // Push the ObjectId of the saved equipment to equipmentIds array
            equipmentIds.push(savedEquipment._id);
        }

        // Create new Salle document with the equipment ObjectIds and reference to SalleImage
        const newSalles = new Salles({
            name,
            details,
            capacity,
            equipment: equipmentIds,
        });

        // Save the new Salle document
        const savedSalles = await newSalles.save();
        res.status(200).json({
            status: "success",
            message: "Salle saved successfully",
            data: savedSalles,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Database Error",
        });
    }
}


export async function allSalles(req, res) {
    try {
        // Retrieve all sales from the database
        const allSalles = await Salles.find();
        res.status(200).json({
            status: "success",
            data: allSalles,
            message: "All sales retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}


export async function deleteSalles(req, res) {
    const { id } = req.params;
    try {
        // Find the salle by ID and delete it
        const deletedSalle = await Salles.findByIdAndDelete(id);
        if (!deletedSalle) {
            // If the salle with the specified ID is not found
            return res.status(404).json({
                status: "error",
                message: "Salle not found",
            });
        }
        // If the salle is successfully deleted
        res.status(200).json({
            status: "success",
            message: "Salle deleted successfully",
            deletedSalle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
    
}

export async function findSalleById(req, res){
    const { id } = req.params;
    try {
        // Find the salle by ID and delete it
        const selectedSalle = await Salles.findById(id);
        if (!selectedSalle) {
            // If the salle with the specified ID is not found
            return res.status(404).json({
                status: "error",
                message: "Salle not found",
            });
        }
        // If the salle is successfully deleted
        res.status(200).json({
            status: "success",
            selectedSalle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}