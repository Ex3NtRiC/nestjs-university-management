import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { CreateHRArgs } from '../models/Args/create-hr.args';
import { HRService } from './hr.service';
import { HRType } from '../models/HR-Model/hr.type';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
@Roles(Role.HR)
@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver((of) => HRType)
export class HRResolver {
  constructor(
    private readonly hrService: HRService,
    private readonly authService: AuthService,
  ) {}

  @Query((returns) => HRType)
  HRgetHRByEmail(@Args('email') email: string) {
    return this.hrService.getHRByEmail(email);
  }

  @Query((returns) => [HRType])
  HRgetHRs() {
    return this.hrService.getHRs();
  }
  @Mutation((returns) => HRType)
  HRcreateHR(@Args() createHRArgs: CreateHRArgs) {
    return this.hrService.createHR(createHRArgs);
  }
}
