import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStaffDto, LoginDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly userRepository: Repository<Staff>,

  ){}
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(createStaffDto: CreateStaffDto) {
    try {
      const userValidate = await this.userRepository.findOne({
        where: { email: createStaffDto.email },
      });

      if (userValidate) {
        throw new UnauthorizedException('The user already exists!');
      }

      // Hash the password before saving
      createStaffDto.password = await this.hashPassword(createStaffDto.password);

      const newUser = await this.userRepository.create(createStaffDto);
      const userSaved = await this.userRepository.save(newUser);

      return { user: userSaved };
    } catch (error) {
      console.error('User creation failed', error);
      throw error;
    }
  }

  async login(createAuthDto: LoginDto): Promise<any> {
    try {
      const userValidate = await this.userRepository.findOne({
        where: { email: createAuthDto.email },
      });

      if (!userValidate) {
        throw new UnauthorizedException('The user does not exist!');
      }

      const isMatch = await bcrypt.compare(createAuthDto.password, userValidate.password);
      if (!isMatch) {
        throw new UnauthorizedException('The password does not match!');
      }

      return userValidate;
    } catch (error) {
      console.error('User login failed', error);
      throw error;
    }
  }
  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
