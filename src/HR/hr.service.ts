import { Injectable } from '@nestjs/common';
import { HRModelService } from 'src/models/hr-model.service';
import { CreateHRArgs } from '../models/Args/create-hr.args';
import { HR } from '../models/hr.model';

@Injectable()
export class HRService {
  constructor(private readonly hrModelService: HRModelService) {}

  async createHR(createHRArgs: CreateHRArgs): Promise<HR> {
    return this.hrModelService.createHR(createHRArgs);
  }

  async getHRByEmail(email: string): Promise<HR> {
    console.log('hr.service');
    return await this.hrModelService.getHRByEmail(email);
  }

  async getHRs(): Promise<HR[]> {
    return this.hrModelService.getHRs();
  }
}
