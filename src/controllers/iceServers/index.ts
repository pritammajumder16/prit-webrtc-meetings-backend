import { Router } from "express";
import { stunServers, turnServers } from "../../constants/iceServers";
const router = Router();

router.get("/", (req, res) => {
  const iceServers = [...stunServers, ...turnServers];
  res.json({ iceServers });
});
export default router;
