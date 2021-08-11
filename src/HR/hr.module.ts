import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsModule } from 'src/models/models.module';
import { HRSchema } from '../models/hr.model';
import { HRResolver } from './hr.resolver';
import { HRService } from './hr.service';

@Module({
  imports: [ModelsModule],
  providers: [HRService, HRResolver],
  exports: [HRService],
})
export class HRModule {}
