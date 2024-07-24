import { Router, Request, Response, NextFunction } from "express";
import IceServerRoutes from "../controllers/iceServers/index";
const router = Router();
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${req.method} request arrived at: ${req.url} from ${
      req.hostname
    };  cx${new Date()}`
  );
  next();
});
router.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
router.use("/ice-servers", IceServerRoutes);

export default router;
