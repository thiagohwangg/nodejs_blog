module.exports = {
    mutipleMongooseToObject: function (mongosses) {
        return mongosses.map((mongosse) => mongosse.toObject());
    },
    mongosesToObject: function (mongosse) {
        return mongosse ? mongosse.toObject() : mongosse;
    },
};
