const db = require("../models");

module.exports = {
     findAll: function(req, res){
          db.books
               .find({id:req.params.id})
               .sort({date:-1})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     findById: function(req, res){
          db.books
               .find({_id:req.params.id})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     findByTitle: function(req, res){
          db.books
               .find({title:req.params.title})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     create: function(req, res){
          // console.log(req.body);
          db.books
               .create(req.body)
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     update: function(req, res){
          db.books
               .findOneAndUpdate({_id: req.body._id}, {$set:req.body}, {new: true})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     sendMessage: function(req, res){
          db.books
               .findOneAndUpdate({_id: req.body.gameId}, {$push:{messages:req.body}}, {new: true})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
     },
     getMessages: function(req, res){
          db.books
               .find(req.body)
               .then(dbModel=>{
                    console.log(dbModel);
                    res.json(dbModel)
               })
               .catch(err=>{
                    console.log(err);
                    res.status(422).json(err)
               });
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