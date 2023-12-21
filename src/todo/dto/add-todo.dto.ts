import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "la taille minimale du champ name est 6 caractéres",
  })
  @MaxLength(10, {
    message: "la taille maximale du champ name est 6 caractéres",
  })
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
