import { PrismaClient } from '../generated/client/index.js';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

export default prisma;
