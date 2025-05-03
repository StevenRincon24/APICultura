import slugify from "slugify";

import Hotels from "../models/hotels.models.js";

// FUNCION PARA OBTENER LOS HOTELES
export const getHotels = async (req, res) => {
  const hotels = await Hotels.find();
  res.json({ data: hotels });
};

// FUNCION PARA AGREGAR UN NUEVO HOTEL
export const createHotel = async (req, res) => {
  try {
    const { name, location, description, website, contact } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newHotel = new Hotels({
      name,
      location,
      description,
      website,
      contact,
      image: imagePath, // Guarda la ruta relativa de la imagen
    });

    await newHotel.save();

    res.status(201).json({
      message: "Hotel creado exitosamente",
      ...newHotel._doc,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el hotel", error });
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

    // Construir objeto de actualización
    const updateData = {
      name,
      location,
      description,
      website,
      contact,
    };

    // Si se envió una nueva imagen, agregarla al objeto
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    res.json({
      message: "Hotel actualizado correctamente",
      ...updatedHotel._doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el hotel", error });
  }
};

// FUNCION PARA ELIMINAR UN HOTEL
export const deleteHotel = async (req, res) => {
  const hotel = await Hotels.findByIdAndDelete(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel no encontrado" });
  res.json({ message: "Hotel eliminado exitosamente" });
};
