const bunyan = require('bunyan');
var Bunyan2Loggly = require('bunyan-loggly');
var logglyConfig = {
    token: 'da580656-d89b-48c6-bf32-e35ce5dbceb3',
    subdomain: 'vongohren',
    tags: ["Feeddownloader"],
    json: true
};

var logglyStream = new Bunyan2Loggly(logglyConfig);

class Logger {
    constructor() {
        this.mainLogger = bunyan.createLogger({
            name: "rssFeedHandler",
            streams: [
                  {
                    level: 'info',
                    path: __dirname+'/../log/applogging.log'
                  },
                {
                    type: 'raw',
                    stream: logglyStream,
                },
            ]
        });
    }

    log(level, message) {
        this.mainLogger[level](message);
    }
}

let LoggerClass = new Logger();

module.exports = LoggerClass;
