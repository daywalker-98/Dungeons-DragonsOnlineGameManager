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

     // /api/dnd/books/save/:title
router.route("/books/save/:id")
     .post(booksController.update);

router.route(`/books/gameCode`)
     .post(booksController.update);

router.route(`/books/new`)
     .post(booksController.create);

router.route("/books/book/title/:title")
     .post(booksController.findByTitle);

router.route("/books/book/:id/:title")
     .post(booksController.findByTitle);

router.route("/books-by-user/:id")
     .get(booksController.findAll);

router.route(`/books/delete/:id`)
     .delete(booksController.remove);

router.route(`/messages/send`)
     .post(booksController.sendMessage);

router.route(`/messages/get`)
     .get(booksController.getMessages);

module.exports = router;