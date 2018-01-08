var Nerd = require('./models/Nerd');
var Todo = require('./models/Todo');

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

    
    // router.get('/', function(req, res) {
    //     res.json({'message' : 'hooray! i did it again'});
    // });

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

    

        router.route('/todos')

            .get(function(req, res) {
                Todo.find(function(err, todos){
                    if (err)
                        res.send(err)

                    console.log(todos);
                    res.json(todos); 

                });
            })


            .post(function(req, res){
                Todo.create({
                    text: req.body.text,
                    done: false
                }, function(err, todo){
                    if (err)
                        res.send(err)

                    Todo.find(function(err, todos){
                        if (err)

                            res.send(err)

                        res.json(todos);
                    });
                });
            });          

            
        router.route('/todos/:todo_id')

            .delete(function(req, res){
                Todo.remove({
                    _id : req.params.todo_id
                }, function(err, todo){
                    if (err)
                        res.send(err);

                    Todo.find(function(err, todos){

                        if(err)
                            res.send(err)
                        res.json(todos);
                    });
                });
            });
            
    router.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
        
};