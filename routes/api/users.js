const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const booksController = require("../../controllers/booksController");

     // /api/dnd/users/logIn
router.route("/users/logIn")
     .post(usersController.findById);

     // /api/dnd/users/new-user
router.route("/users/new-user")
     .put(usersController.create);

     // /api/dnd/users/screen-name/:id
router.route("/users/:id")
     .put(usersController.update);

// router.route("/chars/:id")
//      .get(usersController.findAllCharacters)
//      .delete(booksController.remove);

     // /api/dnd/books/:userId
router.route("/books/save")
     .put(booksController.create)
     .post(booksController.update);

router.route("/books/book/:userId")
     .post(booksController.findById);

router.route("/books-by-user/:id")
     .get(booksController.findAll);

module.exports = router;