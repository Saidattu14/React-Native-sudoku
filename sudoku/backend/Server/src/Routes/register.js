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
    async (request, response, next) => {
      try {
          let token = {
            'username' : request.body.username,
            'password' : request.body.password,
            'email' : request.body.email
          }
          var token_data = 'Bearer '+ jwt.sign(token, 'shhhhhsjjs');
          var user = jwt.sign(request.body.username, 'shhhhhsjjs');
          var result = await redis_client.hgetAsync(user,'username')
          if(result == null)
          {
                await redis_client.hsetAsync(user,'username',request.body.username);
                await redis_client.hsetAsync(user,'password',request.body.password);
                await redis_client.hsetAsync(user,'email',  request.body.email);
                await redis_client.hsetAsync(user,'status','Online');
                await redis_client.hsetAsync(user,'Easy','0');
                await redis_client.hsetAsync(user,'Medium','0');
                await redis_client.hsetAsync(user,'Hard','0');
                await redis_client.hsetAsync(user,'Samurai','0');
                await redis_client.hsetAsync(user,'Score','0');
                await redis_client.saddAsync(request.body.username,String(token_data));
                await redis_client.zaddAsync('Leader-Board','0',user);
                await redis_client.setAsync(token_data,user);
                return response.status(200).json(token_data);
          }
          else
          {
            return response.status(400).json("Username Already Exits");
          }
      } catch (err) {
        return next(err);
      }
    }
);

module.exports = router;