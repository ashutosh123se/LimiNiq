import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@liminiq.com";
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("LiminiqAdmin123!", 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Liminiq Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log("✅ Admin user seeded successfully!");
  } else {
    console.log("✅ Admin user already exists!");
  }

  // Create site settings
  let settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        id: "1",
        companyEmail: "hello@liminiq.com",
        companyPhone: "+91 XXXXX XXXXX",
        companyCity: "India",
        socialLinks: {},
        seoDefaults: {},
        emailSettings: {},
      }
    });
    console.log("✅ Site settings seeded!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
