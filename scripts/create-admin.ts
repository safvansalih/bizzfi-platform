import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = "admin@bizzfi.com";
  const name = "Bizzfi Admin";

  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Set it temporarily before running this script."
    );
  }

  if (password.length < 12) {
    throw new Error("Admin password must be at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: {
        name,
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
    });

    console.log(`Admin user updated: ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
    });

    console.log(`Admin user created: ${email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
