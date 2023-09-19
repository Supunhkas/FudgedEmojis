import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from 'src/schema/requests.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Request.name, schema: RequestSchema}])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
