import express from "express";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// route - /api/v1/orders/new
app.post("/new", newOrder);
// route - /api/v1/orders/my
app.get("/my", myOrders);
// route - /api/v1/orders/all
app.get("/all", adminOnly, allOrders);

app.route("/:id").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);

export default app; 