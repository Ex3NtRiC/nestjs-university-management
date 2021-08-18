import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { ModelsModule } from 'src/models/models.module';

@Module({
  imports: [ModelsModule],
  providers: [TeachersService, TeachersResolver],
})
export class TeachersModule {}
