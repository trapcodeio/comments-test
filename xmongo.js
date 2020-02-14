const {Client} = require('xpress-mongo');
const config = $.$config.get('mongodb', {});
console.log(config);

module.exports = Client(config.url, config.options)
    .connect(() => {
        console.log("Error connecting to mongodb!")
    })
    .useDb(config.database);