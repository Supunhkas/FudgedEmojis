import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
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
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(id, updateRequestDto);
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
 async getEmail(@Body() payload) {
  await this.requestService.sendMail()
  }
}

