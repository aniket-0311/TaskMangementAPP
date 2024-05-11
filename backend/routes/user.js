const router = require("express").Router();
const userController = require("../controller/userController")
const {verifySession} = require("../middleware/jwt");

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/me/access-token', verifySession, userController.generateAccessToken);

module.exports = router;
