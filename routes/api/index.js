const router = require("express").Router();
const routes = require("./users");

// API Routes /api/dnd/books/save
router.use("/dnd", routes);


module.exports = router;