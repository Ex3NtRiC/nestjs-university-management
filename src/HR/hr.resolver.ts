import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { of } from 'rxjs';
import { CreateHRArgs } from './create-hr.args';
import { HRService } from './hr.service';
import { HRType } from './hr.type';

@Resolver((of) => HRType)
export class HRResolver {
  constructor(private readonly hrService: HRService) {}

  @Mutation((returns) => HRType)
  createHR(@Args() createHRArgs: CreateHRArgs) {
    return this.hrService.createHR(createHRArgs);
  }
}
