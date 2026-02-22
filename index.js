import app from "./app.js";
import { connectDB } from "./db.js";

const startServer = async () => {
    try {
        await connectDB(); // Espera a que conecte Mongo

        app.listen(3001, () => {
            console.log("Server on port 3001");
        });

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();