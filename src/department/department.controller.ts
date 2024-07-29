import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus, ParseUUIDPipe} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import type { Response } from 'express';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
  create(@Body() createDepartmentDto: CreateDepartmentDto, @Res({ passthrough: true }) response: Response) {
    let result= this.departmentService.create(createDepartmentDto);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Dept successfully created',
      result: result    
    });
  }

  @Get('all')
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch('update')
  update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(updateDepartmentDto.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
