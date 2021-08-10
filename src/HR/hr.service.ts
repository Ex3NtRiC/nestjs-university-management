import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHRArgs } from './create-hr.args';
import { HR } from './hr.model';

@Injectable()
export class HRService {
  constructor(@InjectModel('HR') private readonly hrModel: Model<HR>) {}

  async createHR(createHRArgs: CreateHRArgs): Promise<HR> {
    const { firstName, lastName } = createHRArgs;
    const e = (
      firstName.charAt(0) +
      lastName +
      '@birzeit.edu'
    ).toLocaleLowerCase();
    const hr = new this.hrModel({ firstName, lastName, email: e });
    return hr.save();
  }
}
