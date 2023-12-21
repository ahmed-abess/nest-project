import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { Request, response, Response } from "express";
import { User } from "./entities/user";
import * as console from "console";

@Controller("user")
export class UserController {
  constructor() {
    this.users = [];
  }

  users: User[];

  @Get()
  getUsers(@Req() request: Request, @Res() response: Response) {
    response.status(201).json({ content: "response" });
  }

  @Get("/:id")
  getUser(@Param("id") id, @Res() response: Response) {
    const usr = this.users.filter((el) => el.id === +id);

    if (usr.length > 0) return response.status(201).json({ user: usr });
    throw new NotFoundException("le utilisateur n existe pas");
  }

  @Post()
  addUser(@Body() user: User, @Res() response: Response) {
    if (this.users.length > 0) {
      user.id = this.users[this.users.length - 1].id + 1;
    } else {
      user.id = 1;
    }

    this.users.push(user);
    response.status(201).json(this.users);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id, @Res() response: Response) {
    const index = this.users.findIndex((el) => el.id === +id);
    console.log(index);
    if (index > -1) {
      this.users.splice(index, 1);
      return response.status(201).json(this.users);
    }
    throw new NotFoundException("le utilisateur n existe pas");
  }

  @Put()
  updateUser() {
    console.log("put");
    return "update :)";
  }
}
