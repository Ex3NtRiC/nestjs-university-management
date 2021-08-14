import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ModelsModule } from 'src/models/models.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlRolesGuard } from './graphql-roles.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ModelsModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {
        expiresIn: '1hr',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlRolesGuard],
  exports: [AuthService, JwtStrategy, PassportModule, GqlRolesGuard],
})
export class AuthModule {}
