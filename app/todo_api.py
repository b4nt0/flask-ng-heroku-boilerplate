from .models import todo_list
from app import api
from flask_restful import Resource, abort, reqparse
import random


parser = reqparse.RequestParser()
parser.add_argument('task', type=str)
parser.add_argument('done', type=bool)
parser.add_argument('id', type=str)


def find_index_by_id_or_abort(todo_id):
    for idx, todo in enumerate(todo_list):
        if todo['id'] == todo_id:
            return idx
    abort(404, message="Todo {} doesn't exist".format(todo_id))


# To-do
# shows a single to-do item and lets you delete a to-do item
class Todo(Resource):
    def get(self, todo_id):
        return todo_list[find_index_by_id_or_abort(todo_id)]

    def delete(self, todo_id):
        to_delete = find_index_by_id_or_abort(todo_id)
        del todo_list[to_delete]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'id': todo_id, 'task': args['task'], 'done': args['done']}
        todo_index = find_index_by_id_or_abort(todo_id)
        todo_list[todo_index] = task
        return task, 201


# TodoList
# shows a list of all to-dos, and lets you POST to add new tasks
class TodoList(Resource):
    def get(self):
        return todo_list

    def post(self):
        args = parser.parse_args()
        todo_id = random.randint(len(todo_list) + 1, 100000)
        todo_list.append({'id': todo_id, 'task': args['task'], 'done': args['done']})
        return todo_list[find_index_by_id_or_abort(todo_id)], 201

##
## Actually setup the Api resource routing here
##
api.add_resource(TodoList, '/api_v1/todos')
api.add_resource(Todo, '/api_v1/todos/<int:todo_id>')