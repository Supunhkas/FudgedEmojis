import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from 'src/schema/requests.schema';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
    private readonly mailService: MailerService,
  ) {}

  async create(dto: CreateRequestDto) {
    const existRecipt = await this.requestModel.findOne({
      receiptNo: dto.receiptNo,
    });

    if (existRecipt) {
      throw new ConflictException('Recipt number already exits');
    }

    const requestData = {
      ...dto,
      voucherCode: '',
      remarks: '',
      mailSent: false,
      status: 0,
    };
    const newRequest = new this.requestModel(requestData);
    return await newRequest.save();
  }

  async findAll() {
    const allRequests = await this.requestModel
      .find()
      .sort({ createdAt: -1 })
      .exec()
      .catch((error) => {
        console.error(error);
        throw new error();
      });
    return allRequests;
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
    const updatedRequest = await this.requestModel
      .updateOne({ _id: id }, { $set: updateRequestDto })
      .exec();

    if (updatedRequest.modifiedCount !== 1) {
      throw new BadRequestException('Update failed!');
    }
    let target = '';

    updateRequestDto.status === 1
      ? (target = 'Approved')
      : (target = 'Rejected');

    return { message: `${target} successfully` };
  }

  // request with spinner value
  async getAllRequestWithSpinner() {
    const query = { spinnerResult: { $ne: null } };

    const allRequestsWithSpinner = await this.requestModel.find(query).exec();
    return allRequestsWithSpinner;
  }

  // requests without spinner value
  async getAllRequestWithoutSpinner() {
    const query = { $or: [{ spinnerResult: null }, { spinnerResult: '' }] };

    const allRequests = await this.requestModel.find(query).exec();
    return allRequests;
  }

  // all completed requests
  async getAllCompletedRequests() {
    const allCompleted = await this.requestModel.find({ status: 1 }).exec();
    return allCompleted;
  }

  // all rejected requests
  async getAllRejectedRequests() {
    const allRejected = await this.requestModel.find({ status: 3 }).exec();
    return allRejected;
  }

  //send mail

  // async sendMail(emailData: any) {
  //   return  await this.mailService.sendMail({
  //     to: emailData.to,
  //     from: emailData.from,
  //     subject: emailData.subject,
  //      template: '../../mails/template.hbs',
  //     context: emailData.context,
  //   });
  // }
  async sendMail(emailData: any) {
    const dynamicData = {
      subject: 'Dynamic Email Subject',
      greeting: 'Hello!',
      message: 'This is a dynamic email message.',
      dynamicContent: 'This content is dynamic.',
    };
    this.mailService
      .sendMail({
        to: 'jayakabaraya@gmail.com',
        from: 'fudgedemoji@gmail.com',
        subject: dynamicData.subject,
        template: '../../mails/template.hbs',
        context: dynamicData,  text: 'welcome',
        html: '<b>welcome</b>',
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  image upload
  async uploadFile(file) {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const uploadPath = '../files';

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    const randomName = uuidv4();
    const extension = extname(file.originalname);
    const fileName = `${randomName}${extension}`;
    const filePath = `${uploadPath}/${fileName}`;

    const fileStream = createWriteStream(filePath);
    fileStream.write(file.buffer);

    const response = {
      originalname: file.originalname,
      filename: fileName,
    };

    return response;
  }
}
