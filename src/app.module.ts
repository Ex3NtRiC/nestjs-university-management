import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from './HR/lessons/lessons.module';
import { StudentsModule } from './HR/students/students.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './HR/teachers/teachers.module';
import { HRModule } from './HR/hr.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://laith_marzouka:JVo97OMDgSjHpkkT@cluster0.ti4dt.mongodb.net/nestjs-school?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    LessonsModule,
    StudentsModule,
    AuthModule,
    TeachersModule,
    HRModule,
    ModelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
