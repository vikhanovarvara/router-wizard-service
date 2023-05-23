import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = 'admin';
  const adminHashedPassword = await bcrypt.hash(adminPassword, 5);

  const admin = await prisma.user.create({
    data: {
      name: 'Верховный волшебник',
      email: 'ancient.wizard@gmail.com',
      phone: '',
      password: adminHashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ ...admin, password: adminPassword });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
