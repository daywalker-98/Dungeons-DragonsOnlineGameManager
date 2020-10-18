const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/logIn/:id")
     .get(usersController.findById());

router.route("/new-user/:id")
     .post(usersController.create());

router.route("/screen-name/:id")
     .post(usersController.update({id:req.params.id}, req.body))

module.exports = router;