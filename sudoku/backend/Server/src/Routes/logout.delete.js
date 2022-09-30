const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.post(
    '/logout',
    [
      apiErrorReporter,
    ],
    async (request, response, next) => {
      try {
        let token = request.headers.authorization;
        let user = await redis_client.getAsync(token);
        console.log(user)
        if (user != null)
        {
          await redis_client.setAsync(token,'Logout','EX',1);
          await redis_client.hsetAsync(user,'status','Offline');
          return response.status(200).send("ok");
        }
        else
        {
          return response.status(400).send("Bad Request");
        }
      } catch (err) {
        return next(err);
      }
    },
);
router.post(
    '/delete',
    [

        body('username').isAlphanumeric(),
        body('email').isEmail(),
        body('password').isStrongPassword(),
        apiErrorReporter,
    ],
    async (request, response, next) => {
      try {
        
        var user = jwt.sign(request.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username');
        console.log(result)
        if(result == null)
        {
        await redis_client.hsetAsync(user,'username',request.body.username);
        await redis_client.hsetAsync(user,'password',request.body.password);
        await redis_client.hsetAsync(user,'email',  request.body.email);
        return response.status(200).json(result);
        }
        else
        {
          return response.status(400).send("Username Already Exits");
        }
      } catch (err) {
        return next(err);
      }
    },
);

module.exports = router;