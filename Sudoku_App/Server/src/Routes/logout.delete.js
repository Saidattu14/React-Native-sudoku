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
    async (req, res, next) => {
      try {
        
        let token = req.headers.authorization;
        let user = await redis_client.getAsync(token);
        if (user != null)
        {
          redis_client.setAsync(token,'Logout','EX',1);
          redis_client.hsetAsync(user,'status','Offline');
          return res.status(200).send("ok");
        }
        else
        {
          return res.status(400).send("Bad Request");
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
    async (req, res, next) => {
      try {
        
        var user = jwt.sign(req.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username')
        if(result == null)
        {
        redis_client.hsetAsync(user,'username',req.body.username);
        redis_client.hsetAsync(user,'password',req.body.password);
        redis_client.hsetAsync(user,'email',  req.body.email);
        return res.status(200).json(result);
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