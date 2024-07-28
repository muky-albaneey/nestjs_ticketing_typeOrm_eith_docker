import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly deptRepo : Repository<Department>
  ){}

  async create(createDepartmentDto: CreateDepartmentDto) {

      try {
          const valDept = await this.deptRepo.findOne({
            where : {name: createDepartmentDto.name}
          });

          if(valDept) throw new ConflictException({message: 'department name already exist'});

          const newDept = await this.deptRepo.create(createDepartmentDto);
          const userSaved = await this.deptRepo.save(newDept);
          return userSaved;

      } catch (error) {
        console.log(error);
        
        throw error
      }
  }

  async findAll() {

    const valDept = await this.deptRepo.find()

    return valDept;
    // if(!valDept) throw new NotFoundException({message: 'the name of this dept does not exist'});
  
  }

  async findOne(id) {
    try {
      // const valDept = await this.deptRepo.findOne(where: { id });
      const valDept = await this.deptRepo.findOne({
        where: { id } });
      if(!valDept) throw new NotFoundException({message: 'the name of this dept does not exist'});

      return valDept;

    } catch (error) {
      
    }
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
