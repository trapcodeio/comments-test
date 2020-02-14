// Import Xpresser
const xpresser = require("xpresser");
const {Client} = require("xpress-mongo");
// Import Config
const config = require("./config");



// Initialize and boot() xpresser
const $ = xpresser(config)

$.on.boot((next) => {
    const config = $.$config.get('mongodb');

    $.logIfNotConsole("Connecting to mongodb...");
    /**
     * @type {XMongoClient}
     */
    return Client(config.url, config.options)
        .connect((client) => {
            client.useDb(config.database);
            /**
             * Create a model using a collection name.
             * @param collection
             * @return {typeof XMongoModel}
             */
            global.$.collection = (collection) => {
                return client.model(collection);
            };

            next()
        }, () => {
            $.logErrorAndExit("Error connecting to mongodb!")
        });
});

$.boot();
