const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

router.post(
    '/add_stats',
    [
    
      query('level'),
      apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        let token = req.headers.authorization;
        let user = await redis_client.getAsync(token);
      
        if (user != null)
        {
          let data = await redis_client.hgetAsync(user,req.query.level);
          let total_score = await redis_client.hgetAsync(user,'Score');
          data = parseInt(data)
          let data1 = data + 1
          if(req.query.level == 'Easy')
          {
           total_score = total_score + 2;
          }
          else if(req.query.level == 'Medium')
          {
            total_score = total_score + 4;

          }
          else if(req.query.level == 'Hard')
          {
           total_score = total_score + 8;
            
          }
          else if(req.query.level == 'Samurai')
          {
          total_score = total_score + 16;
          }
          await redis_client.hsetAsync(user,req.query.level,data1)
          await redis_client.zaddAsync('Leader-Board',0,user);
          let score = await redis_client.zscoreAsync('Leader-Board',user);
          score = parseInt(score);
          total_score = score +  data;
          await redis_client.zremAsync('Leader-Board',user);
          await redis_client.zaddAsync('Leader-Board',total_score,user);
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

module.exports = router;