import { prisma } from '../lib/prisma';
import { errorResponse } from './responses';

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const doesUserExist = async (
  key: 'email' | 'userName',
  value: string
) => {
  return prisma.user.findUnique({
    where: { [key]: value } as any,
  });
};

export const checkId = (id: string) => {
  return !id ? errorResponse('Missing id.') : null;
};

export const checkUserBody = async (body: UserUpdateBody | UserCreateBody) => {
  if (body.email) {
    if (!isValidEmail(body.email))
      return errorResponse('Invalid email address.');
    if (await doesUserExist('email', body.email))
      return errorResponse('Email address already in use.');
  }
  if (body.userName && (await doesUserExist('userName', body.userName))) {
    return errorResponse('User name already in use.');
  }
  return null;
};