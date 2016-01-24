angular.module( 'ngBoilerplate.todo', [
  'ui.router',
  'ngResource'
])

.factory('Todo', function($resource) {
  return $resource('http://localhost:5000/api_v1/todos/:id', { id: '@id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
})

.config(function config( $stateProvider ) {
  $stateProvider.state( 'todo', {
    url: '/todo',
    views: {
      "main": {
        controller: 'TodoCtrl',
        templateUrl: 'todo/todo.tpl.html'
      }
    },
    data:{ pageTitle: 'Todo RESTful demo' }
  });
})

.controller( 'TodoCtrl', function TodoCtrl( $scope, Todo ) {
  // This is simple a demo for to-do lists.
  $scope.todo_list = Todo.query();

  $scope.getTotalTodos = function () {
    return $scope.todo_list.length;
  };

  $scope.addTodo = function () {
    var new_todo = new Todo();
    new_todo.task = $scope.formTodoText;
    new_todo.done = false;
    new_todo.$save(function() {
        $scope.todo_list.push(new_todo);
        $scope.formTodoText = '';
    });
  };

  $scope.updateTodo = function(todo) {
    console.log(todo);
    todo.$update();
    return true;
  };

  $scope.clearCompleted = function () {

      $scope.todo_list = $scope.todo_list.filter(function(todo){
          if (todo.done) {
              todo.$delete();
          }
          return !todo.done;
      });
  };
})

;
