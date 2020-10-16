const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");

if(process.env.NODE_ENV === "production"){
     app.use(express.static("client/build"));
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/DnDgameManager", {
     useNewUrlParser: true,
     useFindAndModify: false,
     useUnifiedTopology: true
});

app.use(routes);

app.get("*", (req, res)=>{
     res.sendFile(path.join(__dirname, "./client/build/index/html"));
});

app.listen(PORT, ()=>{
     console.log(`🌎 ==> API server now on port ${PORT}.`);
});