import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";

import Database from "./database";

import User from "./models/User";
import Image from "./models/Image";
import Location from "./models/Location";
import Tag from "./models/Tag";
import Event from "./models/Event";
import tokenChecker from "./tokenChecker";
import { getTags } from "./routes/tag/Tags";
import { getLocations } from "./routes/location/Locations";
import { getImages } from "./routes/image/Images";
import {
  getImageInfo,
  patchImageInfo,
  deleteImage,
  postImage,
  getImageThumbnail,
  getImageMarked
} from "./routes/image/Image";
import { login, signup, getUser } from "./routes/user/User";
import { getEvents } from "./routes/event/Events";
import { deleteEvent, patchEvent, postEvent } from "./routes/event/Event";
import PriceGroup from "./models/PriceGroup";
import Price from "./models/Price";
import { getPrices, getPricesForGroup } from "./routes/price/Prices";
import { getPriceGroups } from "./routes/priceGroup/PriceGroups";
import BasketItem from "./models/BasketItem";
import {
  deleteBasketItem,
  postBasketItem
} from "./routes/basketItem/BasketItem";
import { clearBasket, getBasket } from "./routes/basketItem/BasketItems";
import {
  getCheckoutSession,
  getClientPublic,
  getClientSecret
} from "./routes/checkout/Checkout";
import { handleStripeWebhook } from "./routes/webhook/Webhook";
import * as dotenv from "dotenv";

dotenv.config();

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

    Image.belongsTo(Location, { foreignKey: "location_key", as: "location" });

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
  });

const app = express();
const router = express.Router();

// Use JSON parser for all non-webhook routes
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req.originalUrl === '/api/webhook') {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  }
);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: Number.MAX_VALUE }
});

app.use("/api", router);

export type RouteFunction = (
  req: Request,
  res: Response
) => Promise<Response | void>;
const routeFunc = async (req: Request, res: Response, func: RouteFunction) => {
  try {
    return await func(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Unknown server error" });
  }
};

// images
router.get("/image", async (req, res) => await routeFunc(req, res, getImages));
router.post(
  "/image",
  tokenChecker,
  upload.single("file"),
  async (req, res) => await routeFunc(req, res, postImage)
);

router.get(
  "/image/thumb/:filename",
  async (req, res) => await routeFunc(req, res, getImageThumbnail)
);

router.get(
  "/image/:filename",
  async (req, res) => await routeFunc(req, res, getImageMarked)
);

router.get(
  "/image/:filename/info",
  async (req, res) => await routeFunc(req, res, getImageInfo)
);

router.patch(
  "/image/:filename/info",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, patchImageInfo)
);

router.delete(
  "/image/:filename",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, deleteImage)
);

// tags and locations
router.get("/tag", async (req, res) => await routeFunc(req, res, getTags));
router.get(
  "/location",
  async (req, res) => await routeFunc(req, res, getLocations)
);

// events
router.get("/event", async (req, res) => await routeFunc(req, res, getEvents));
router.post(
  "/event/:id",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, postEvent)
);
router.patch(
  "/event/:id",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, patchEvent)
);
router.delete(
  "/event/:id",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, deleteEvent)
);

// prices
router.get("/price", async (req, res) => await routeFunc(req, res, getPrices));
router.get(
  "/price/group/:groupId",
  async (req, res) => await routeFunc(req, res, getPricesForGroup)
);
router.get(
  "/pricegroup",
  async (req, res) => await routeFunc(req, res, getPriceGroups)
);

// account
router.post("/login", async (req, res) => await routeFunc(req, res, login));
router.post("/signup", async (req, res) => await routeFunc(req, res, signup));
router.get("/user", tokenChecker, async (req, res) =>
  routeFunc(req, res, getUser)
);

// basket
router.get(
  "/basket",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, getBasket)
);
router.post(
  "/basket",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, postBasketItem)
);
router.delete(
  "/basket",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, clearBasket)
);
router.delete(
  "/basket/:basketItemId",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, deleteBasketItem)
);

router.get(
  "/checkout/public",
  async (req, res) => await routeFunc(req, res, getClientPublic)
);

router.get(
  "/checkout/secret",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, getClientSecret)
);

router.get(
  "/checkout/session/:sessionId",
  tokenChecker,
  async (req, res) => await routeFunc(req, res, getCheckoutSession)
);

router.post(
  "/webhook",
  bodyParser.raw({type: 'application/json'}),
  async (req, res) => await routeFunc(req, res, handleStripeWebhook)
);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ msg: err.message });
  }
  next(err);
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Express listening on port ${process.env.SERVER_PORT}`)
);
