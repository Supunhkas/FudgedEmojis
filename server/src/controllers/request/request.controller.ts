import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('add')
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

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
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
