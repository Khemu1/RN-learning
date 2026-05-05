import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessGuard } from '@/gaurds/access.guard';
import { AuthGuard } from '@/gaurds/auth.guard';

export const withAuth = () =>
  applyDecorators(UseGuards(AuthGuard, AccessGuard));
