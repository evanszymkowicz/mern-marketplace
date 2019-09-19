import express from "express";
import productCtrl from "../controllers/product.controller";
import authCtrl from "../controllers/auth.controller";
import storeCtrl from "../controllers/store.controller";

const router = express.Router();

router.route("/api/products/by/:storeId")
	.post(authCtrl.requireLogin, storeCtrl.isOwner, productCtrl.create)
	.get(productCtrl.listByStore);

router.route("/api/products/latest")
	.get(productCtrl.listLatest);

router.route("/api/products/related/:productId")
	.get(productCtrl.listRelated);

router.route("/api/products/categories")
	.get(productCtrl.listCategories);

router.route("/api/products")
	.get(productCtrl.list);

router.route("/api/products/:productId")
	.get(productCtrl.read);

router.route("/api/product/image/:productId")
	.get(productCtrl.photo, productCtrl.defaultPhoto);
router.route("/api/product/defaultphoto")
	.get(productCtrl.defaultPhoto);

router.route("/api/product/:storeId/:productId")
	.put(authCtrl.requireLogin, storeCtrl.isOwner, productCtrl.update)
	.delete(authCtrl.requireLogin, storeCtrl.isOwner, productCtrl.remove);

router.param("storeId", storeCtrl.storeByID);
router.param("productId", productCtrl.productByID);

export default router;
