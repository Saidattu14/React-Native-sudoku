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
    async (request, response, next) => {
      try {
        var user = jwt.sign(request.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username')
        if(result != null)
        {
        let psd = await redis_client.hgetAsync(user,'password');
        if(psd == request.body.password)
        {
            let token = {
                'username' : request.body.username,
                'password' : request.body.password,
              }
            var token_data = 'Bearer '+ jwt.sign(token, 'shhhhhsjjs');
            await redis_client.hsetAsync(user,'status','Online');
            await redis_client.setAsync(token_data,user);
            return response.status(200).json(token_data);
        }
        else
        {
            return response.status(400).json("Password is Incorrect");
        }
        }
        else
        {
          
          return response.status(400).json("Username Does not Exits");
        }
      } catch (err) {
        return next(err);
      }
    },
);

module.exports = router;