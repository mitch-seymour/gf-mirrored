var 
    express = require('express'),
    logger = require('morgan'),
    controllers = require('./controllers'),
    path = require('path'),
    
    app = express();

// logging
app.use(logger('dev'));

// view settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static paths
app.use(express.static(path.join(__dirname, 'public')));

// set up controller actions
controllers(app);

server = app.listen(1337, function () {

    console.log('Express server listening on port ' + server.address().port);

});

