module.exports = {
    app: {
        port: process.env.APPLICATION_PORT || 8003,
        env: process.env.NODE_ENV || "production",
        key: process.env.APPLICATION_KEY,
    },
    es: {
        host: process.env.ES_HOST || 'http://localhost:9200/',
        fluentdLogs: process.env.ES_FLUENTD_LOGS || 'fluentd-*',
    }
};