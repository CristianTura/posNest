import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'El nombre de la categoría no puede ir vacio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name: string
}
