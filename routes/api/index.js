const router = require("express").Router();
const userRoutes = require("./users");
const bookRoutes = require("./books");
const charRoutes = require("./characters");

// API Routes
router.use("/users", userRoutes);
// router.use("/books", bookRoutes);
// router.use("/char", charRoutes);


module.exports = router;