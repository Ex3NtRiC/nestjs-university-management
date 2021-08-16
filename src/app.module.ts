import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HRModule } from './HR/hr.module';
import { ModelsModule } from './models/models.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://laith_marzouka:JVo97OMDgSjHpkkT@cluster0.ti4dt.mongodb.net/nestjs-school?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    HRModule,
    ModelsModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
