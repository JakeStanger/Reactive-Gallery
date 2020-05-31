import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import Database from "./database";

import User from "./database/models/User";
import Image from "./database/models/Image";
import Location from "./database/models/Location";
import Tag from "./database/models/Tag";
import Event from "./database/models/Event";
import tokenChecker from "./tokenChecker";
import { getTags } from "./routes/tag/Tags";
import { getLocations } from "./routes/location/Locations";
import { getImages } from "./routes/image/Images";
import {
  deleteImage,
  getImageInfo,
  getImageMarked,
  getImageThumbnail,
  patchImageInfo,
  postImage
} from "./routes/image/Image";
import { getUser, login, signup } from "./routes/user/User";
import { getEvents } from "./routes/event/Events";
import { deleteEvent, patchEvent, postEvent } from "./routes/event/Event";
import PriceGroup from "./database/models/PriceGroup";
import Price from "./database/models/Price";
import { getPrices, getPricesForGroup } from "./routes/price/Prices";
import { getPriceGroups } from "./routes/priceGroup/PriceGroups";
import BasketItem from "./database/models/BasketItem";
import {
  deleteBasketItem,
  postBasketItem
} from "./routes/basketItem/BasketItem";
import { clearBasket, getBasket } from "./routes/basketItem/BasketItems";
import {
  createCheckoutSession,
  getCheckoutSession,
  getClientPublic
} from "./routes/checkout/Checkout";
import { handleStripeWebhook } from "./routes/webhook/Webhook";
import morgan from "morgan";
import * as dotenv from "dotenv";

dotenv.config();

// Database initialization
Database.get()
  .init()
  .then(() => {
    User.load();
    Image.load();
    Location.load();
    Tag.load();

    Event.load();
    PriceGroup.load();
    Price.load();

    BasketItem.load();

    Image.belongsTo(Location, {
      foreignKey: "location_key",
      as: "location"
    });

    Image.belongsToMany(Tag, {
      through: "image_tag",
      foreignKey: "image_id",
      as: "tags"
    });

    Image.belongsTo(PriceGroup, {
      foreignKey: "price_group_id",
      as: "priceGroup"
    });

    Tag.belongsToMany(Image, {
      through: "image_tag",
      foreignKey: "tag_id",
      as: "images",
      constraints: false
    });

    Price.belongsTo(PriceGroup, {
      foreignKey: "price_group_id",
      as: "priceGroup"
    });

    BasketItem.belongsTo(Image, {
      foreignKey: "image_id",
      as: "image"
    });

    BasketItem.belongsTo(User, {
      foreignKey: "user_id",
      as: "user"
    });

    BasketItem.belongsTo(Price, {
      foreignKey: "price_id",
      as: "price"
    });

    if (process.env.DATABASE_DO_SYNC) {
      Database.getConnection()
        .sync()
        .catch(console.error);
    }
  });

const app = express();

const router = express.Router();

// file uploading middleware
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: Number.MAX_VALUE }
});

// Logging middleware
app.use(morgan("combined"));

// Use JSON parser middleware for all non-webhook routes
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req.originalUrl === "/api/webhook") {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  }
);

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ message: "An internal server error has occured" });
  }
);

// Add router middleware.
// This must be done after the app-level middleware!
app.use("/api", router);

// images
router.get("/image", getImages);
router.post("/image", tokenChecker, upload.single("file"), postImage);

router.get("/image/thumb/:filename", getImageThumbnail);

router.get("/image/:filename", getImageMarked);

router.get("/image/:id/info", getImageInfo);

router.patch("/image/:id/info", tokenChecker, patchImageInfo);

router.delete("/image/:id", tokenChecker, deleteImage);

// tags and locations
router.get("/tag", getTags);
router.get("/location", getLocations);

// events
router.get("/event", getEvents);
router.post("/event/:id", tokenChecker, postEvent);
router.patch("/event/:id", tokenChecker, patchEvent);
router.delete("/event/:id", tokenChecker, deleteEvent);

// prices
router.get("/price", getPrices);
router.get("/price/group/:groupId", getPricesForGroup);
router.get("/pricegroup", getPriceGroups);

// account
router.post("/login", login);
router.post("/signup", signup);
router.get("/user", tokenChecker, getUser);

// basket
router.get("/basket", tokenChecker, getBasket);
router.post("/basket", tokenChecker, postBasketItem);
router.delete("/basket", tokenChecker, clearBasket);
router.delete("/basket/:basketItemId", tokenChecker, deleteBasketItem);

router.get("/checkout/public", getClientPublic);

router.post("/checkout/secret", tokenChecker, createCheckoutSession);

router.get("/checkout/session/:sessionId", tokenChecker, getCheckoutSession);

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleStripeWebhook
);

// Auth check error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ msg: err.message });
  }
  next(err);
});

app.listen(
  parseInt(process.env.SERVER_PORT) || 9000,
  process.env.SERVER_HOST || "127.0.0.1",
  () => console.log(`Express listening on port ${process.env.SERVER_PORT}`)
);
