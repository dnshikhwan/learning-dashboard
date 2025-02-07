export const configs = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET_KEY:
    "47e07625ca99b193e75ef98616e4359d9f4c77d2c6fe35b36084924e833bf78ab6173e938155a812ecddf7148e3b46dcc0ea9b85725a90ad9b787406be162dd7eedd49f781754c30c6e04f7a85cac20e4e6705c4dd9f3d5bb4691891f7a5b5654ea982fd4fdc8c3c8d907ee57ea5fda575b365ffce50d59a72c54aec5bd7711dc38aa171b0b4c5222c9aab4e047a7db9a3cddd118af1d2800e78eba2689e8a580fb3fd145eb7f5ce3d9aa9dd55efb9ba35403c4716d2da2b7dacb83095fb42374fc1a40d82b4ce5539a169aef3bd88c77c8cf46ee5b4f9712f0b3e8ae2705851ef42461f198944d9b766746f08848e47265bbeb9e5e265cb1f877f41d761d423",
  MAILTRAP_TOKEN: "b6d78bf5d84418d547917c5541868653",
};

export const emailConfig = {
  sender: {
    address: "support@microlearn.com",
    name: "Support Team",
  },
};

export const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
  domain:
    process.env.NODE_ENV === "production"
      ? process.env.BACKEND_BASE_DOMAIN
      : "localhost",
};
