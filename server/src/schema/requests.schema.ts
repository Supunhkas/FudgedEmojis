import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RequestDocument = Request & Document;

@Schema({timestamps: true})

export class Request {
    @Prop()
    receiptNo: string;

    @Prop()
    orderPrice: number;

    @Prop()
    spinnerResult: number

    @Prop()
    imgUrl: string;

    @Prop()
    description: string;
    

}

export const RequestSchema = SchemaFactory.createForClass(Request);