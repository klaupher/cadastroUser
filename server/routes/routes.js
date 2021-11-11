const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdmAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', AdmAuth, UserController.index);
router.get('/user/:id', AdmAuth, UserController.findUser);
router.put('/user', AdmAuth, UserController.edit);
router.delete('/user/:id', AdmAuth, UserController.remove);
router.post('/recover', UserController.recoverPassword);
router.post('/changepwd', UserController.changePassword);
router.post('/login', UserController.login);
router.get('/validade', AdmAuth, HomeController.validade);

module.exports = router;