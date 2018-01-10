angular.module('todoService', [])

    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/todos');
            },

            create : function(todoData) {
                return $http.post('/todos', todoData);
            },

            delete : function(id) {
                return $http.delete('/todos/' + id);
            }
        }

    });