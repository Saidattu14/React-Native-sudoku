const config = require('better-config');

config.set('../config.json');


const client = redis.getClient();

const testSuiteName = 'Basic';



