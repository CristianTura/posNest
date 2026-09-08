import { IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateCouponDto {
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    name: string;

    @IsNotEmpty({message: 'El descuento no puede ir vacío'})
    @IsInt({message: 'El descuento debe ser entre 1 y 100'})
    @Min(1, {message: 'El descuento debe ser mayor a 0'})
    @Max(100, {message: 'El descuento debe ser menor a 100'})
    percentage: number;

    @IsNotEmpty({message: 'La fecha de expiración es obligatoria'})
    @IsDateString({},{message: 'La fecha no es válida'})
    expirationDate: Date;
}
