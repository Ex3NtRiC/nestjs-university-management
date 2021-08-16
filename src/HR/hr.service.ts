import { Injectable, NotFoundException } from '@nestjs/common';
import { HRModelService } from 'src/models/HR-Model/hr-model.service';
import { CreateHRArgs } from '../models/Args/create-hr.args';
import { HR } from '../models/HR-Model/hr.model';

@Injectable()
export class HRService {
  constructor(private readonly hrModelService: HRModelService) {}

  async createHR(createHRArgs: CreateHRArgs): Promise<HR> {
    return this.hrModelService.createHR(createHRArgs);
  }

  async getHRByEmail(email: string): Promise<HR> {
    const hr = await this.hrModelService.getHRByEmail(email);
    if (!hr) {
      throw new NotFoundException();
    }
    return hr;
  }

  async getHRs(): Promise<HR[]> {
    const hr = await this.hrModelService.getHRs();
    if (!hr) {
      throw new NotFoundException();
    }
    return hr;
  }
}
