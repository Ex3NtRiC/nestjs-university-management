import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HRSchema } from './hr.model';
import { HRResolver } from './hr.resolver';
import { HRService } from './hr.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'HR', schema: HRSchema }])],
  providers: [HRService, HRResolver],
  exports: [HRService],
})
export class HRModule {}
