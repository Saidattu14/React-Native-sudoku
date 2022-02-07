const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.post(
    '/login',
    [

        body('username').isAlphanumeric(),
        body('password').isStrongPassword(),
        apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        console.log(req.body)
        var user = jwt.sign(req.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username')
        if(result != null)
        {
        let psd = await redis_client.hgetAsync(user,'password');
        if(psd == req.body.password)
        {
            let token = {
                'username' : req.body.username,
                'password' : req.body.password,
              }
            var token_data = 'Bearer '+ jwt.sign(token, 'shhhhhsjjs');
            redis_client.hsetAsync(user,'status','Online');
            redis_client.setAsync(token_data,user);
            return res.status(200).json(token_data);
        }
        else
        {
            return res.status(400).json("Password is Incorrect");
        }
        
        }
        else
        {
          
          return res.status(400).json("Username Does not Exits");
        }
      } catch (err) {
        return next(err);
      }
    },
);

module.exports = router;