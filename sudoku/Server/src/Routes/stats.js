const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.get(
    '/stats',
    [
      apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        let token = req.headers.authorization;
        let user = await redis_client.getAsync(token);
        if (user != null)
        {
          let data = 
          {
              "Easy" : await redis_client.hgetAsync(user,'Easy'),
              "Medium" : await redis_client.hgetAsync(user,'Medium'),
              "Hard"  : await redis_client.hgetAsync(user,'Hard'),
              "Samurai" :  await redis_client.hgetAsync(user,'Samurai')
          }
          return res.status(200).json(data);
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
router.patch(
    '/clear_stats',
    [
        apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        
        var user = jwt.sign(req.body.username, 'shhhhhsjjs');
        var result = await redis_client.hgetAsync(user,'username')
        if(result == null)
        {
        let data = 
        {
            "Easy" : redis_client.hgetAsync(user,'Easy'),
            "Medium" : redis_client.hgetAsync(user,'Medium'),
            "Hard"  : redis_client.hgetAsync(user,'Hard'),
            "Samurai" :  redis_client.hgetAsync(user,'Samurai')
        }
        return res.status(200).json(data);
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