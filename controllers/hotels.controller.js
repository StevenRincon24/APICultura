import Hotels from "../models/hotels.models.js";

// FUNCION PARA OBTENER LOS HOTELES
export const getHotels = async (req, res) => {
  const hotels = await Hotels.find();
  res.json({ data: hotels });
};

// FUNCION PARA AGREGAR UN NUEVO HOTEL
export const createHotel = async (req, res) => {
  try {
    const { name, description, location, website, contact } = req.body;
    if (!name || !description || !location || !website || !contact) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const newHotel = new Hotels({
      name,
      description,
      location,
      website,
      contact,
    });
    await newHotel.save();

    res.json({ message: "Hotel agregado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el hotel" });
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
  console.log(req.body);
  try {
    const hotel = await Hotels.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel no encontrado" });
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el hotel" });
  }
};

// FUNCION PARA ELIMINAR UN HOTEL
export const deleteHotel = async (req, res) => {
  const hotel = await Hotels.findByIdAndDelete(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel no encontrado" });
  res.json({ message: "Hotel eliminado exitosamente" });
};
