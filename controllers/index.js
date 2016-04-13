var fs = require('fs');

module.exports = function router(app) {
    
    function defaultRoute(req, res) {
    
        res.render('index');

    }
    
    function dataRoute(req, res){
        
        var payload = fs.readFileSync('./data_set.json', 'utf8');
        res.json(JSON.parse(payload));
        
    }
    
    app.get('/', defaultRoute);
    app.get('/data', dataRoute);
    
};
