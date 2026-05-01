import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/gaurds/access.guard';
import { AuthGuard } from 'src/gaurds/auth.guard';

export const withAuth = () =>
  applyDecorators(UseGuards(AuthGuard, AccessGuard));
