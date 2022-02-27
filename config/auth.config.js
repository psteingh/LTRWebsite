module.exports = {
    secret: "key-liestoremember-secret",
    jwtExpiration: 3600,
    jwtRefreshExpiration: 86400,

    /* for standard setup */
    // jwtExpiration: 3600,          // 1 hour
    // jwtRefreshExpiration: 86400,  // 24 hours

    /* for testing only */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes

};