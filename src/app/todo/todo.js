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
    Todo.save(new_todo, function() {
        $scope.todo_list.push({task:new_todo.task, done:new_todo.done});
        $scope.formTodoText = '';
    });
  };

  $scope.updateTodo = function(todo) {
    console.log(todo);
    todo.$update();
    return true;
  };

})

;
