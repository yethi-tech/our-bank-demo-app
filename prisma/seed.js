const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const users = require("./seedData/users");
const prisma = new PrismaClient();

const staticPassword = "P@ssw0rd";

async function main() {
  const createdUsers = [];

  users.forEach(async (user) => {
    let createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: await hash(staticPassword, 10) },
    });
    console.log(`upsert user ${user.email}`);
    createdUsers.push(createdUser);
  });

  console.log(`${createdUsers.length} users seeded`);
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
