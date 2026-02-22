import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Hotels from "../models/hotels.models.js";

// FUNCION PARA OBTENER LOS HOTELES
import mongoose from "mongoose";

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.json({ data: hotels });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// FUNCION PARA AGREGAR UN NUEVO HOTEL
export const createHotel = async (req, res) => {
  try {
    const { name, location, description, website, contact } = req.body;

    let imageData = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "hotels" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newHotel = new Hotels({
      name,
      location,
      description,
      website,
      contact,
      image: imageData,
    });

    await newHotel.save();

    res.status(201).json({
      message: "Hotel creado exitosamente",
      ...newHotel._doc,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el hotel" });
  }
};

// FUNCION PARA OBTENER UN HOTEL POR ID
export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel no encontrado" });
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el hotel" });
  }
};

// FUNCION PARA MODIFICAR LA INFORMACION DE UN HOTEL
export const updateHotel = async (req, res) => {
  try {
    const { name, location, description, website, contact } = req.body;

    const hotel = await Hotels.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    const updateData = {
      name,
      location,
      description,
      website,
      contact,
    };

    // Si llega nueva imagen
    if (req.file) {

      // 🔥 Eliminar imagen anterior en Cloudinary
      if (hotel.image?.public_id) {
        await cloudinary.uploader.destroy(hotel.image.public_id);
      }

      // 🔥 Subir nueva imagen
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "hotels" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      updateData.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Hotel actualizado correctamente",
      ...updatedHotel._doc,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el hotel" });
  }
};

// FUNCION PARA ELIMINAR UN HOTEL
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotels.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    // 🔥 Eliminar imagen en Cloudinary
    if (hotel.image?.public_id) {
      await cloudinary.uploader.destroy(hotel.image.public_id);
    }

    await Hotels.findByIdAndDelete(req.params.id);

    res.json({ message: "Hotel eliminado exitosamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el hotel" });
  }
};
