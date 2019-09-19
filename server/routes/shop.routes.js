import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import storeCtrl from "../controllers/store.controller";

const router = express.Router();

router.route("/api/stores")
	.get(storeCtrl.list);

router.route("/api/store/:storeId")
	.get(storeCtrl.read);

router.route("/api/stores/by/:userId")
	.post(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.isSeller, storeCtrl.create)
	.get(authCtrl.requireLogin, authCtrl.hasAuthorization, storeCtrl.listByOwner);

router.route("/api/stores/:storeId")
	.put(authCtrl.requireLogin, storeCtrl.isOwner, storeCtrl.update)
	.delete(authCtrl.requireLogin, storeCtrl.isOwner, storeCtrl.remove);

router.route("/api/stores/logo/:storeId")
	.get(storeCtrl.photo, storeCtrl.defaultPhoto);

router.route("/api/stores/defaultphoto")
	.get(storeCtrl.defaultPhoto);

router.param("storeId", storeCtrl.storeByID);
router.param("userId", userCtrl.userByID);

export default router;
