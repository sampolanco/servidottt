var pgp = require("pg-promise")(/*options*/);
var cn = {
    host: 'postgresql://postgresql/',
    port: 5432,
    //database: 'postgres',
    database: 'pestDataBase',
    user: 'userUYG',
    password: 'Am5aBWqsmfDpYyAG'
};
var db = pgp(cn);
db.one("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
});

module.exports=db;