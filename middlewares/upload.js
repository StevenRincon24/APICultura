// middlewares/upload.js
import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // carpeta pública donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // nombre único para la imagen
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes jpeg, jpg, png o webp"), false);
  }
};

export const    upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});
