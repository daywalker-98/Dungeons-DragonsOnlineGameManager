const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

if(process.env.NODE_ENV === "production"){
     app.use(express.static("client/build"));
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost/DnDgameManager";


mongoose.connect(uri, {
     useCreateIndex: true,
     useNewUrlParser: true,
     useFindAndModify: false,
     useUnifiedTopology: true
});

// mongoose.connection.on('error', ()=>{
//      console.log(`uri: ${uri}`);
// });

app.use(routes);

app.get("*", (req, res)=>{
     res.sendFile(path.join(__dirname, "./client/public/build/index.html"));
});

app.listen(PORT, ()=>{
     console.log(`🌎 ==> API server now on port ${PORT}.`);
});