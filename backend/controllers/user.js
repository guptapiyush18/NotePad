const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      userId: req.body.userId,
      emailId: req.body.emailId,
      password: hash
    })
    user.save().then(result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    }).catch(err => {
      let message;
      if (Object.keys(err.errors).length === 1) {
        errorKey = Object.keys(err.errors).toString()
        if (errorKey === 'userId')
          message = 'User id already Exists'
        else if (errorKey === 'emailId')
          message = 'Email Id already Exists'
      }
      else
        message = 'User Id & Email Id already Exists'

      res.status(500).json({
        message: message,
      });
    })


  })
};

exports.userLogin = (req, res, next) => {
  let fetchUser;
  User.findOne({ emailId: req.body.emailId })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "No User Found" });
      }
      this.fetchUser = user;
      return bcrypt.compare(req.body.password, user.password)
    }).then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Email and Password does not match"
        });
      }
      const token = jwt.sign({ emailId: this.fetchUser.emailId, userId: this.fetchUser.userId }, "JinGaLalaHuAuhu", { expiresIn: '1h' });
      res.status(200).json({
        token: token,
        userId: this.fetchUser.userId,
        expiresIn: 3600
      });
    }).catch(err => {
      return res.status(401).json({
        message: "Internal Server Error"
      });
    });
}
