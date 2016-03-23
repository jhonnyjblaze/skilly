'use strict';

const 
  Sequelize = require('sequelize');

let server;

const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    
app
    .use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    })
    .use(bodyParser.json());

module.exports.close = function() {
    console.log('shutting down the server...');
    server.close();
};

// sequelize initialization //
const sequelize = new Sequelize('skilly', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
  }
});
const userService = require("./service/user")(sequelize);
 
//sync the model with the database
sequelize.sync().then(function (res) {
  app.route('/user')
    .get(userService.get)
    .post(userService.create)
  app.route('/user/:id')
  
    server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
      var addr = server.address();
      console.log("Server listening at", addr.address + ":" + addr.port);
    });
})
.catch(function(e) {
    console.log('Error in sequelize.sync(): ' + e);
});
