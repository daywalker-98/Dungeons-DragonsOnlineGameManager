const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const charsController = require("../../controllers/charsController");
const booksController = require("../../controllers/booksController");

router.route("/chars/:id")
     .get(usersController.findAllCharacters({id:req.params.id}, (err, user)=>{
          if(err){
               return res.json(err, user);
          } else {
               res.json(user);
          }
     }))
     .delete(charsController.remove);

router.route("/create-char")
     .post(charsController.create);

router.route("/party/:bookId")
     .get(booksController.getParty({}));

router.route("/user/:id")
     .get((req, res)=>{
          usersController.findById({id:req.params.id}, (err, user)=>{
               if(err){
                    return res.json(err);
               } else {
                    res.json(user);
               }
          });
     }
)
     .post(usersController.create);

module.exports = router;