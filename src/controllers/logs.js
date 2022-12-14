const { Client } = require('@elastic/elasticsearch');
const { es: { host, fluentdLogs } } = require('../config');

const client = new Client({
    node: host
});

exports.getLogs = async (req, res) => {
    try {
        const executionId = req.query.executionId;
        const functionName = req.query.functionName;
        const logLevel = req.query.logLevel;

        const additionalMust = [];
        if (executionId) {
            additionalMust.push({ match: { executionId  } });
        }

        if (functionName) {
            additionalMust.push({ match: { 'data.functionName': functionName  } });
        }

        if (logLevel) {
            additionalMust.push({ match: { level: logLevel  } });
        }

        const result = await client.search({
            index: fluentdLogs,
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                '@log_name': 'nodejs-runtime.log'
                            }
                        },
                        ...additionalMust,
                    ]
                }
            }
        });

        const logs = mapEsHitsToLogs(result);

        return res.status(200).send(logs);
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: 'Internal server error.',
        });
    }
};

const mapEsHitsToLogs = (esResults) => {
    return {
        items: esResults.hits.hits.map(esRecord => ({
            level: esRecord._source.level,
            message: esRecord._source.message,
            executionId: esRecord._source.executionId,
            time: esRecord._source['@timestamp'],
            data: esRecord._source.data
        })),
    };
};