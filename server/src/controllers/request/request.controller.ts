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

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(@Body() dto: CreateRequestDto) {
    return this.requestService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.requestService.findAll();
  }

  @Get('request/:id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRequestDto) {
    return this.requestService.update(id, dto);
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
      console.log(error)
      return { error: 'Failed to send email' };
    }
  }

  // file upload

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadedFile(@UploadedFile() file) {
    return this.requestService.uploadFile(file);
  }
}
