import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { CreateHRArgs } from '../Args/create-hr.args';
import { HR } from './hr.model';

@Injectable()
export class HRModelService {
  constructor(@InjectModel('HR') private readonly hrModel: Model<HR>) {}

  async createHR(createHRArgs: CreateHRArgs): Promise<HR> {
    const { firstName, lastName } = createHRArgs;
    const e = (
      firstName.charAt(0) +
      lastName +
      '@hr.school.edu'
    ).toLocaleLowerCase();
    const hr = new this.hrModel({
      firstName,
      lastName,
      email: e,
      roles: [Role.HR],
    });
    return hr.save();
  }

  async getHRByEmail(email: string): Promise<HR> {
    return await this.hrModel.findOne({ email });
  }

  async getHRs(): Promise<HR[]> {
    return await this.hrModel.find();
  }
}
