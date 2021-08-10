import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from './HR/lessons/lessons.module';
import { StudentsModule } from './HR/students/students.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './HR/teachers/teachers.module';

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
