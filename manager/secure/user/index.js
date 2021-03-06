const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const imgPath = '../../../img/uploads/avatar';
var fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: '/img/uploads/avatar',
  filename: function (req, file, cb) {
    cb(null, req.decoded.username + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage});

var router = express.Router();

router.get('/self', function (req, res) {
  User.findOne({'id': req.decoded.id}, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(409).json('Test Error');
    } else if (user) {
      return res.status(200).json({
        success: true,
        message: 'User information',
        user: user
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'User not found'
      });
    }
  })
});

router.get('/settings', function (req, res) {
  User.findOne({'id': req.decoded.id}, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(409).json('Test Error');
    } else if (user) {
      if(user.settings) {
        return res.status(200).json({
          success: true,
          message: 'User settings',
          settings: user.settings
        });
      } else {
        return res.status(200).json({
          success: false,
          message: 'Settings not found'
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: 'User not found'
      });
    }
  })
});

router.post('/settings', function (req, res) {
  var user = req.decoded;
  var data = req.body;
  User.findOne({'id': user.id}, function(err, user) {
    if (err) {
      console.log(err);
      return res.status(409).json('Server Error');
    } else {
      user.settings = {
        showQuantity: data.settings.showQuantity,
  	    showOriginalRate: data.settings.showOriginalRate,
  	    showCurrentRate: data.settings.showCurrentRate,
  	    showOriginalValue: data.settings.showOriginalValue,
  	    showCurrentValue: data.settings.showCurrentValue,
  	    showProfitLoss: data.settings.showProfitLoss,
  	    showProfitLossPercentage: data.settings.showProfitLossPercentage,
  	    theme: data.settings.theme,
        refCurrency: data.settings.refCurrency
      }
      user.save((err) => {
        if (err) {
          console.log(err);
          return res.status(409).json('Server Error');
        } else if (user) {
          if(user.settings) {
            return res.status(200).json({
              success: true,
              message: 'Settings updated'
            });
          } else {
            return res.status(200).json({
              success: false,
              message: err.message
            });
          }
        } else {
          return res.status(200).json({
            success: false,
            message: 'User not found'
          });
        }
      })
    }
  })
});

/*
router.get('/self_avatar', function (req, res) {
  var avatarPath = imgPath + req.decoded.username
  console.log(avatarPath);
  if(fs.exists(avatarPath + '.jpg') || fs.exists(avatarPath + '.png')) {
    return res.status(200).sendFile(avatarPath);
  } else {
    return res.status(200).json({
      success: false,
      message: 'No avatar found for user ' + req.decoded.username
    });
  }
});


router.post('/self_avatar', upload.single('file'), function(req,res){
    return res.status(200).json({
      success: true,
      message: 'Avatar updated for user ' + req.decoded.username,
      url: req.file.path
    });
});*/

module.exports = router;
