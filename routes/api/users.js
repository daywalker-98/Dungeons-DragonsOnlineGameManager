const router = require("express").Router();
const usersController = require("../../controllers/usersController");

     // /api/users/logIn
router.route("/logIn")
     .get(usersController.findById);

     // /api/users/new-user
router.route("/new-user")
     .put(usersController.create);

     // /api/users/screen-name/:id
router.route("/:id")
     .put(usersController.update);

module.exports = router;