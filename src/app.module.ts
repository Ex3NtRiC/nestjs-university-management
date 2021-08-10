import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://laith_marzouka:JVo97OMDgSjHpkkT@cluster0.ti4dt.mongodb.net/nestjs-school?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    LessonsModule,
    StudentsModule,
    // AuthModule,
    TeachersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
