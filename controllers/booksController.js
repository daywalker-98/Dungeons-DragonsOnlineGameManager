const db = require("../models");

module.exports = {
     findAll: function(req, res){
          db.books
               .find({})
               .sort({date:-1})
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     findById: function(req, res){
          db.books
               .findById(req.params.id)
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     create: function(req, res){
          db.books
               .create(req.body)
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     update: function(req, res){
          db.books
               .findOneAndUpdate({_id: req.params.id}, req.body)
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     remove: function(req, res){
          db.books
               .findById({_id: req.params.id})
               .then(dbModel=>dbModel.remove())
               .then(dbModel=>res.json(dbModel))
               .catch(err=>res.status(422).json(err));
     },
     getParty: function(req, res){
          db.books
               .findById({_id: req.params.books}
     }
};