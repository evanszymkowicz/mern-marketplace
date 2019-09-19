import express from "express";
import orderCtrl from "../controllers/order.controller";
import productCtrl from "../controllers/product.controller";
import authCtrl from "../controllers/auth.controller";
import storeCtrl from "../controllers/store.controller";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router.route("/api/orders/:userId")
	.post(authCtrl.requireLogin, userCtrl.stripeCustomer, productCtrl.decreaseQuantity, orderCtrl.create);

router.route("/api/orders/store/:storeId")
	.get(authCtrl.requireLogin, storeCtrl.isOwner, orderCtrl.listByStore);

router.route("/api/orders/user/:userId")
	.get(authCtrl.requireLogin, orderCtrl.listByUser);

router.route("/api/order/status_values")
	.get(orderCtrl.getStatusValues);

router.route("/api/order/:storeId/cancel/:productId")
	.put(authCtrl.requireLogin, storeCtrl.isOwner, productCtrl.increaseQuantity, orderCtrl.update);

router.route("/api/order/:orderId/charge/:userId/:storeId")
	.put(authCtrl.requireLogin, storeCtrl.isOwner, userCtrl.createCharge, orderCtrl.update);

router.route("/api/order/status/:storeId")
	.put(authCtrl.requireLogin, storeCtrl.isOwner, orderCtrl.update);

router.route("/api/order/:orderId")
	.get(orderCtrl.read);

router.param("userId", userCtrl.userByID);
router.param("storeId", storeCtrl.storeByID);
router.param("productId", productCtrl.productByID);
router.param("orderId", orderCtrl.orderByID);

export default router;
