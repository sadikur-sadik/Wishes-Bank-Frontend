import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../src/models/User";
import { UserRole, AccountStatus } from "../src/types/user";

// Ensure script only runs with MONGODB_URI set
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wishes_bank_ltd";

const seedUsers = [
  {
    fullName: "System Administrator",
    email: process.env.SEED_ADMIN_EMAIL || "admin@wishesbank.com",
    password: process.env.SEED_ADMIN_PASSWORD || "AdminPassword123!",
    role: UserRole.ADMIN,
    phoneNumber: "+880 1800 000001",
    accountStatus: AccountStatus.ACTIVE,
    emailVerified: true,
  },
  {
    fullName: "Senior Banking Officer",
    email: process.env.SEED_STAFF_EMAIL || "staff@wishesbank.com",
    password: process.env.SEED_STAFF_PASSWORD || "StaffPassword123!",
    role: UserRole.STAFF,
    phoneNumber: "+880 1800 000002",
    accountStatus: AccountStatus.ACTIVE,
    emailVerified: true,
  },
  {
    fullName: "Premium Customer",
    email: process.env.SEED_CUSTOMER_EMAIL || "customer@wishesbank.com",
    password: process.env.SEED_CUSTOMER_PASSWORD || "CustomerPassword123!",
    role: UserRole.CUSTOMER,
    phoneNumber: "+880 1800 000003",
    accountStatus: AccountStatus.ACTIVE,
    emailVerified: true,
  },
];

async function runSeed() {
  console.log("Connecting to MongoDB for seeding...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB successfully.");

  for (const account of seedUsers) {
    const existing = await User.findOne({ email: account.email });
    if (existing) {
      console.log(`[SKIP] User ${account.email} (${account.role}) already exists.`);
      continue;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(account.password, salt);

    await User.create({
      fullName: account.fullName,
      email: account.email,
      password: hashedPassword,
      role: account.role,
      phoneNumber: account.phoneNumber,
      accountStatus: account.accountStatus,
      emailVerified: account.emailVerified,
    });

    console.log(`[CREATED] Seeded ${account.role} account: ${account.email}`);
  }

  console.log("Seeding process completed successfully.");
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("Seeding failed with error:", err);
  process.exit(1);
});
