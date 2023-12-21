import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { AddTodoDto } from "./dto/add-todo.dto";
import { GetPaginatedTodoDto } from "./dto/get-paginated-todo.dto";

@Injectable()
export class TodoService {
  todos: Todo[];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(newTodo: AddTodoDto): Todo {
    const todo = new Todo();
    let id;
    const { name, description } = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos?.length) {
      id = this.todos[this.todos.length - 1].id + 1;
      this.todos.push({
        id,
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      id = 1;
      this.todos = [
        {
          id,
          name,
          description,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    return {
      id,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getTodoById(id: number): Todo {
    const todo = this.todos.find((el) => el.id === +id);
    if (todo) return todo;
    throw new NotFoundException("le todo id n existe pas");
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((el) => el.id === +id);
    console.log(index);
    if (index >= 0) {
      this.todos.splice(index, 1);
      return { message: "Todo is deleted" };
    } else {
      throw new NotFoundException("le todo id n existe pas");
    }
  }

  updateTodos(id: number, newTodo: Partial<Todo>): Todo {
    const todo = this.getTodoById(+id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.updatedAt =
      newTodo.description || newTodo.name ? new Date() : todo.updatedAt;
    return todo;
  }
}
