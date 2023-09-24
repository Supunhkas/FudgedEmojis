import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRequestDto {

    @IsNotEmpty()
    receiptNo: string;

    @IsNotEmpty()
    orderPrice: number;

    @IsNotEmpty()
    imgUrl: string;

    @IsOptional()
    spinnerResult: number;

    @IsNotEmpty()
    spinBy: string;

    @IsOptional()
    voucherType: string;
}
