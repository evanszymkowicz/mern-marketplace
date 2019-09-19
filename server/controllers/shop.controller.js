import Store from "../models/store.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import profileImage from "./../../client/assets/images/profile-pic.png";

const create = (req, res, next) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			res.status(400).json({
				message: "Image could not be uploaded"
			});
		}
		let store = new Store(fields);
		store.owner= req.profile;
		if(files.image){
			store.image.data = fs.readFileSync(files.image.path);
			store.image.contentType = files.image.type;
		}
		store.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler.getErrorMessage(err)
				});
			}
			res.status(200).json(result);
		});
	});
};

const storeByID = (req, res, next, id) => {
	Store.findById(id).populate("owner", "_id name").exec((err, store) => {
		if (err || !store)
			return res.status("400").json({
				error: "Store not found"
			});
		req.store = store;
		next();
	});
};

const photo = (req, res, next) => {
	if(req.store.image.data){
		res.set("Content-Type", req.store.image.contentType);
		return res.send(req.store.image.data);
	}
	next();
};
const defaultPhoto = (req, res) => {
	return res.sendFile(process.cwd()+profileImage);
};

const list = (req, res) => {
	Store.find((err, stores) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler.getErrorMessage(err)
			});
		}
		res.json(stores);
	});
};

const listByOwner = (req, res) => {
	Store.find({owner: req.profile._id}, (err, stores) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler.getErrorMessage(err)
			});
		}
		res.json(stores);
	}).populate("owner", "_id name");
};

const read = (req, res) => {
	return res.json(req.store);
};

const update = (req, res, next) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			res.status(400).json({
				message: "Photo could not be uploaded"
			});
		}
		let store = req.store;
		store = _.extend(store, fields);
		store.updated = Date.now();
		if(files.image){
			store.image.data = fs.readFileSync(files.image.path);
			store.image.contentType = files.image.type;
		}
		store.save((err) => {
			if (err) {
				return res.status(400).send({
					error: errorHandler.getErrorMessage(err)
				});
			}
			res.json(store);
		});
	});
};

const isOwner = (req, res, next) => {
	const isOwner = req.store && req.auth && req.store.owner._id == req.auth._id;
	if(!isOwner){
		return res.status("403").json({
			error: "User is not authorized"
		});
	}
	next();
};

const remove = (req, res, next) => {
	let store = req.store;
	store.remove((err, deletedStore) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler.getErrorMessage(err)
			});
		}
		res.json(deletedStore);
	});
};

export default {
	create,
	storeByID,
	photo,
	defaultPhoto,
	list,
	listByOwner,
	read,
	update,
	isOwner,
	remove
};
