import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Put,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateSpinDto } from './dto/update-sppin.dto';

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //  @UseGuards(JwtAuthGuard)
  @Post('add')
  @UseInterceptors(FileInterceptor('imgFile'))
  async create(
    @Body() dto: CreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.requestService.create(dto, file);
    return result;
  }

  // @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.requestService.findAll();
  }
  
 @Get('spinning')
  async getAllForSpin(){
    return await this.requestService.getAllForSpin();
  }


  @Get('waiting')
  async getAllAcceptedToSpin(){
    return await this.requestService.getAllAcceptedToSpin();
  }

  @Get('after-spin')
  async getAllAfterSpin(){
    return await this.requestService.getAllAfterSpin();
  }

  @Get('request/:id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRequestDto) {
    return this.requestService.update(id, dto);
  }

  @Put('addresult/:id')
  spinnerResult(@Param('id') id: string, @Body() dto: UpdateSpinDto) {
    return this.requestService.spinnerResult(id, dto);
  }

  // @Delete('remove/:id')
  // remove(@Param('id') id: string) {
  //   return this.requestService.remove(+id);
  // }

  @Get('spinner')
  getAllRequestWithSpinner() {
    return this.requestService.getAllRequestWithSpinner();
  }

  @Get('no-spinner')
  getAllRequestWithoutSpinner() {
    return this.requestService.getAllRequestWithoutSpinner();
  }

  @Get('completed')
  getAllCompletedRequests() {
    return this.requestService.getAllCompletedRequests();
  }

  @Get('rejected')
  getAllRejectedRequests() {
    return this.requestService.getAllRejectedRequests();
  }

  //email
  @Post('email')
  async getEmail(@Body() emailData: any) {
    try {
      await this.requestService.sendMail(emailData);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'Failed to send email' };
    }
  }

  // file upload

  @Post('image')
  @UseInterceptors(FileInterceptor('imgFile'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
