const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.get(
    '/Leader-Board',
    [
    
      apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        let token = req.headers.authorization;
        let user = await redis_client.getAsync(token);
        if (user != null)
        {
          let data = await redis_client.zrevrangebyscoreAsync('Leader-Board','+inf','-inf','WITHSCORES');
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

module.exports = router;