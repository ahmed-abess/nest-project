import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  ValidationPipe,
} from "@nestjs/common";
import { Todo } from "./entities/todo.entity";
import { AddTodoDto } from "./dto/add-todo.dto";
import { Response } from "express";
import { GetPaginatedTodoDto } from "./dto/get-paginated-todo.dto";
import { TodoService } from "./todo.service";
import { UpperAndFusionPipe } from "../pipes/upper-and-fusion/upper-and-fusion.pipe";
import { writeFile } from "fs";

@Controller("todo")
export class TodoController {
  constructor(private TodoService: TodoService) {}

  todos: Todo[];

  @Get()
  getTodos(@Query() params: GetPaginatedTodoDto, @Res() res: Response) {
    res.status(201).json(this.TodoService.getTodos());
  }

  @Get("/:id")
  getTodoById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Res() res: Response,
  ) {
    res.status(201).json(this.TodoService.getTodoById(id));
  }

  @Post()
  addTodo(@Body(ValidationPipe) newTodo: AddTodoDto, @Res() res: Response) {
    res.status(201).json(this.TodoService.addTodo(newTodo));
  }

  // supprimer un todos via son id
  @Delete("/:id")
  deleteTodos(@Param("id", ParseIntPipe) id, @Res() res: Response) {
    res.status(201).json(this.TodoService.deleteTodo(id));
  }

  @Put("/:id")
  updateTodos(
    @Param("id", ParseIntPipe) id,
    @Body() newTodo: Partial<Todo>,
    @Res() res: Response,
  ) {
    res.status(201).json(this.TodoService.updateTodos(id, newTodo));
  }

  @Post("/pipe")
  testPipe(@Body(UpperAndFusionPipe) data) {
    return data;
  }

  @Post("/file")
  setFile(@Body() data, @Res() res: Response) {
    console.log(data);
    writeFile("testfile.doc", data.file, { encoding: "base64" }, function (err) {
      console.log(err);
    });
    res.status(201).json("good");
  }
}
