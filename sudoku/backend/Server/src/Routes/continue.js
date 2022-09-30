const router = require('express').Router();
const apiErrorReporter = require('../utils/api_error_report');
const redis_client = require('../Redis/client')

router.get(
    '/continue',
    [
      apiErrorReporter,
    ],
    async (request, response, next) => {
      try {
        let token = request.headers.authorization;
        let user = await redis_client.getAsync(String(token));
        if (user != null)
        {
          let data = await redis_client.hgetAsync(user,'Continue-Game');
          data = JSON.parse(data)
          return response.status(200).json(data);
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