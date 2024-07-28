import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { DepartmentModule } from './department/department.module';
import { ConfigModule, ConfigService,  } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff/entities/staff.entity';
import { Department } from './department/entities/department.entity';

@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal : true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: 'db',
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [Staff, Department],
      synchronize: true,
    }),
  }),StaffModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
