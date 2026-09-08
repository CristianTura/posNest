import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message: 'El nombre es requerido'})
    @IsString({message: 'El nombre no es válido'})
    name: string;
    // image: string;
    @IsNotEmpty({message: 'El precio es requerido'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'El precio no es válido'})
    price: number;

    @IsNotEmpty({message: 'El inventario es requerido'})
    @IsInt({message: 'El inventario no es válido'})
    inventory: number;

    @IsNotEmpty({message: 'El id de la categoría es requerido'})
    @IsInt({message: 'El id de la categoría no es válido'})
    categoryId: number;
}
