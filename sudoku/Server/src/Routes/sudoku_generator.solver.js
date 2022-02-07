const router = require('express').Router();
const { body, query,param} = require('express-validator');
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')
const sudoku = require('../Sudoku/sudoku_generator');

router.get(
    '/generator',
    [

        query('level'),
        apiErrorReporter,
    ],
    async (req, res, next) => {
      try {
        let level = String(req.query.level)
        let result = await sudoku(level);
        let token = req.headers.authorization;
        let user = await redis_client.getAsync(token);
        if (user != null && result != "Invalid")
        {

          redis_client.hsetAsync(user,'Continue-Game',JSON.stringify(result))
          return res.status(200).json(result);
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