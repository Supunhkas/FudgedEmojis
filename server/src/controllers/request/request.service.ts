import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from 'src/schema/requests.schema';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  ) {}
  
  async create(createRequestDto: CreateRequestDto) {
    const newRequest = new this.requestModel(createRequestDto);
    return await newRequest.save();
  }

  async findAll() {
    const allRequets = await this.requestModel.find().exec();
    return allRequets;
  }

  async findOne(id: string) {
    const filter = { _id: id };
    const request = await this.requestModel.findOne(filter).exec();
    if (!request) {
      throw new NotFoundException(`request with ID ${id} not found.`);
    }

    return request;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const updatedRequest = await this.requestModel.findByIdAndUpdate(
      id,
      { $set: updateRequestDto },
      { new: true },
    );

    return updatedRequest;
  }

  async remove(id: number) {
    const deletedRequest = await this.requestModel.deleteOne({ _id: id });

    if (deletedRequest.deletedCount === 0) {
      throw new BadRequestException('Cannot be deleted');
    }
    return { message: 'Successfully deleted' };
  }
}
