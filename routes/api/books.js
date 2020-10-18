const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const booksController = require("../../controllers/booksController");

router.route("/chars/:id")
     .get(usersController.findAllCharacters)
     .delete(booksController.remove);

router.route("/:userId")
     .post(booksController.create({userId:req.params.userId}));

module.exports = router;