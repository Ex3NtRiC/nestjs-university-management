import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://laith_marzouka:JVo97OMDgSjHpkkT@cluster0.ti4dt.mongodb.net/nestjs-school?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    LessonsModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
