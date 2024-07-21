import { Router, Request, Response, NextFunction } from "express";

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

export default router;
