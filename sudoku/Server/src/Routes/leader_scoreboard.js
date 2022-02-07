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
          let data1 = [];
          let index = 0;
          for(let i = 0; i<data.length; i++)
          {
            let user = await redis_client.hgetAsync(data[i],'username');
            let obj = {
              'index' : index,
              'username' : user,
              'score' : data[i+1]
            }
            index++;
            data1.push(obj);
            i++;
          }
          return res.status(200).json(data1);
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