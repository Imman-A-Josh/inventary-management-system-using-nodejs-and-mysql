const bcrypt = require('bcrypt');

const User = require('../model/user');

exports.login = async (req, res) => {
  
    User.login(req.body, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the users."
        });
    else res.status(200).send(data);
});
}

exports.newuser = async (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    try {

        var Value = req.body.password;
        const salt = await bcrypt.genSalt(5);
        Value = await bcrypt.hash(Value, salt);
    }
    catch {
        console.log("error");
    }

    var user = new User({
        username: req.body.username,
        password: Value,
        role: req.body.role
    })


    User.newuser(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        else res.send(data);
    });
}

exports.get = async (req, res) => {

    User.get(req, res);
};

exports.getbyId = (req, res) => {

    User.getbyId(req.params.id, (req, res))
}

// User Logout

exports.logout = (req, res) => {

    User.logout(req.headers.authorization,(err, data) => {
  
      if (err){
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the User."
        });
      }
      else res.send(data);
    });
  };

  exports.dashboard=(req,res)=>{
    User.dashboard((err,data)=>{
        if(err){
            console.log(err);
            res.status(500).send({
               message: err.message || "some error occurred while updating the user"
            });
        }
        else res.send(data);
    })
  }