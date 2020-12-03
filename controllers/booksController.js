const db = require("../models");

module.exports = {
     findAll: function(req, res){
          console.log(req.params.id);
          db.books
               .find({id:req.params.id})
               .sort({date:-1})
               .then(dbModel=>{
                    console.log(JSON.stringify(dbModel));
                    res.json(dbModel)
               })
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     findById: function(req, res){
          db.books
               .find({_id:req.params.id})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     findByTitle: function(req, res){
          db.books
               .find({title:req.params.title})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     create: function(req, res){
          console.log(req.body);
          db.books
               .create(req.body)
               .then(dbModel=>res.json(dbModel))
               .catch(res.status(422).json(err));
     },
     update: function(req, res){
          db.books
               .findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true})
               .then(dbModel=>{
                    res.json(dbModel);
               })
               .catch(err=>res.status(422).json(err));
     },
     remove: function(req, res){
          console.log(req.params.id)
          db.books
               .findById({_id: req.params.id})
               .then(dbModel=>dbModel.remove())
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    // console.log(err);
                    res.status(422).json(err)
               });
     }
};