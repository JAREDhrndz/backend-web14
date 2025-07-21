import mongoose from "mongoose";

const connectDBmongo = async (): Promise<void> => {
  const mongoUrl = "mongodb+srv://adminApp:admin123@hernandezjared.jbrf42w.mongodb.net/proyecto?retryWrites=true&w=majority";

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000, // 5 segundos de espera
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB Atlas:", error);
    process.exit(1); // Detiene la aplicación si hay error
  }
};

export default connectDBmongo;