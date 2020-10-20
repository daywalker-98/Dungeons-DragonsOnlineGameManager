const router = require("express").Router();
const routes = require("./users");

// API Routes
router.use("/dnd", routes);


module.exports = router;