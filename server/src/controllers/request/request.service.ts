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
    const requestData = {
      ...createRequestDto,
      voucherCode: '',
      remarks: '',
      mailSent: false,
      status: 0,
    };
    const newRequest = new this.requestModel(requestData);
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

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const updatedRequest = await this.requestModel.updateOne(
      { _id: id },
      { $set: updateRequestDto },
    ).exec();

    console.log(updatedRequest )
    if (updatedRequest.modifiedCount !== 1 ) {
      throw new BadRequestException('Update failed!');
    }
    let target = '';

    updateRequestDto.status === 1
      ? (target = 'Approved')
      : (target = 'Rejected');

    return { message: `${target} successfully` };
  }

  // async remove(id: number) {
  //   const deletedRequest = await this.requestModel.deleteOne({ _id: id });

  //   if (deletedRequest.deletedCount === 0) {
  //     throw new BadRequestException('Cannot be deleted');
  //   }
  //   return { message: 'Successfully deleted' };
  // }

  // request with spinner value
  async getAllRequestWithSpinner() {
    const allRequestsWithSpinner = await this.requestModel.find({}).exec();
    return allRequestsWithSpinner;
  }

  // requests without spinner value
  async getAllRequestWithoutSpinner() {
    const allRequests = await this.requestModel.find({}).exec();
    return allRequests;
  }

  // all completed requests
  async getAllCompletedRequests() {
    const allCompleted = await this.requestModel.find({status: 1}).exec();
    return allCompleted;
  }

  // all rejected requests
  async getAllRejectedRequests() {
    const allRejected = await this.requestModel.find({status: 3}).exec();
    return allRejected;
  }

  //send mail 
  async sendMail(){}

}
