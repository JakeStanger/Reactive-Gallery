import express from "express";
import config from "./config.json";

const app = express();
const router = express.Router();

app.use("/api", router);

router.get("/test", async (req, res) => {
  res.send("Hello world!");
});

app.listen(config.port, () => console.log(`Express listening on port ${config.port}`));