import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  { clerk_user_id: 'user_2pFtIDNTrv3P2RiJkkItokrPQgA' },
  { clerk_user_id: 'user_2pIYz8dyGdi2eJ4710o9wkvboRS' },
  { clerk_user_id: 'user_2pZgRdHRDI3RpIImTn9ITZ2FFDQ' },
  { clerk_user_id: 'user_2pb7tHCAxQCkbDp8kSskMNCgIAe' },
];

async function main() {
  for (const user of users) {
    try {
      await prisma.users.create({
        data: user,
      });
      console.log(`User with clerk_user_id ${user.clerk_user_id} created successfully.`);
    } catch (error) {
      console.error(`Error creating user with clerk_user_id ${user.clerk_user_id}:`, error);
    }
  }
  console.log('User seeding completed.');
}

main()
  .catch((e) => console.error('An error occurred during seeding:', e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from the database.');
  });
