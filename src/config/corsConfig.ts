import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

export default cors(corsOptions);
