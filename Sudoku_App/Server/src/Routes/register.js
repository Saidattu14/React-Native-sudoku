const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4, stringify } = require('uuid');

router.post(
    '/register',
    [

        body('username').isAlphanumeric(),
        body('email').isEmail(),
        body('password').isStrongPassword(),
        apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        let token = {
          'username' : req.body.username,
          'password' : req.body.password,
          'email' : req.body.email
        }
        var token_data = 'Bearer '+ jwt.sign(token, 'shhhhhsjjs');
        var user = jwt.sign(req.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username')
        if(result == null)
        {
        redis_client.hsetAsync(user,'username',req.body.username);
        redis_client.hsetAsync(user,'password',req.body.password);
        redis_client.hsetAsync(user,'email',  req.body.email);
        redis_client.hsetAsync(user,'status','Online');
        redis_client.hsetAsync(user,'Easy','0');
        redis_client.hsetAsync(user,'Medium','0');
        redis_client.hsetAsync(user,'Hard','0');
        redis_client.hsetAsync(user,'Samurai','0');
        redis_client.hsetAsync(user,'Score','0');
        redis_client.saddAsync(req.body.username,String(token_data));
        redis_client.zaddAsync('Leader-Board','0',user);
        redis_client.setAsync(token_data,user);
        return res.status(200).json(token_data);
        }
        else
        {
          return res.status(400).send("Username Already Exits");
        }
      } catch (err) {
        return next(err);
      }
    },
);

module.exports = router;