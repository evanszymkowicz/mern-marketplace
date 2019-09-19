import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/users")
	.get(userCtrl.list)
	.post(userCtrl.create);

router.route("/api/users/:userId")
	.get(authCtrl.requireLogin, userCtrl.read)
	.put(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.update)
	.delete(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.remove);
router.route("/api/stripe_auth/:userId")
	.put(authCtrl.requireLogin, authCtrl.hasAuthorization, userCtrl.stripe_auth, userCtrl.update);

router.param("userId", userCtrl.userByID);

export default router;
