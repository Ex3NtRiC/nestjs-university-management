import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHRArgs } from './Args/create-hr.args';
import { HR } from './hr.model';

@Injectable()
export class HRModelService {
  constructor(@InjectModel('HR') private readonly hrModel: Model<HR>) {}

  async createHR(createHRArgs: CreateHRArgs): Promise<HR> {
    const { firstName, lastName } = createHRArgs;
    const e = (
      firstName.charAt(0) +
      lastName +
      '@school.edu'
    ).toLocaleLowerCase();
    const hr = new this.hrModel({ firstName, lastName, email: e });
    return hr.save();
  }

  async getHRByEmail(email: string): Promise<HR> {
    const hr = await this.hrModel.findOne({ email });
    if (hr) return hr;
    throw new NotFoundException();
  }
}
