import { IsNotEmpty } from "class-validator";

export class UpdateRequestDto {

    @IsNotEmpty()
    status: number;

    @IsNotEmpty()
    id: string;
   
}
