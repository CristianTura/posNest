import { IsNotEmpty } from "class-validator";

export class ApplyCouponDto {
    @IsNotEmpty({message: 'el nombre del cupon es requerido'})
    coupon_name: string;
}