var Nerd = require('./models/Nerd');

module.exports = function(router) {

    router.use(function(req, res, next) {
        console.log('Its happening');
        next(); 
    })

    router.get('api/nerds', function(req, res) {
        Nerd.find(function(err, nerds) {

            if(err)
                res.send(err);

            res.json(nerds);
        });
    });

    // router.get('*', function(req, res) {
    //     res.sendfile('./public/views/index.html');
    // });
    
    router.get('/', function(req, res) {
        res.json({'message' : 'hooray! i did it again'});
    });

    router.route('/nerds')

        .post(function(req, res){

            var nerd = new Nerd();
            nerd.name = req.body.name;

            nerd.save(function(err){
                if(err)
                res.send(err);
            
                res.json({'message' : 'Nerd created!' });
            });
        })

        .get(function(req, res){
            Nerd.find(function(err, nerds) {
                if (err)
                    res.send(err);

                res.json(nerds);
            });
        });


    router.route('/nerds/:nerd_id')

        .get(function(req, res){
            Nerd.findById(req.params.nerd_id, function(err, nerd){
                if(err)
                    res.send(err)
                res.json(nerd);

            })
        })

        .put(function(req, res) {
            Nerd.findById(req.params.nerd_id, function(err, nerd){
                if(err)
                    res.send(err);

                nerd.name = req.body.name;
                
                nerd.save(function(err) {
                    if(err)
                        res.send(err);

                    res.json({'message' : 'Nerd updated!'});
                });
                
            });
        })

        .delete(function(req, res){

            Nerd.remove(
                {
                    _id: req.params.nerd_id
                },
                function(err, nerd){
                    if(err)
                        res.send(err);

                    res.json({ 'message' : 'Successfully deleted!'});
                });
        });

};