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
    async (request, response, next) => {
      try {
        let level = String(request.query.level)
        let result = await sudoku(level);
        let token = request.headers.authorization;
        let user = await redis_client.getAsync(token);
        if (user != null && result != "Invalid")
        {
          await redis_client.hsetAsync(user,'Continue-Game',JSON.stringify(result))
          return response.status(200).json(result);
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

module.exports = router;