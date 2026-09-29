import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "./src/model/auth.Model.js";
import Doctor from "./src/model/doctor.Model.js";

dotenv.config();

// ================= SETTINGS =================

const DEFAULT_PASSWORD = "Doctor123";

// ================= CREATE ACCOUNTS =================

const createDoctorAccounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // جيب كل الدكاترة
    const doctors = await Doctor.find();

    console.log(`Found ${doctors.length} doctors`);

    if (doctors.length === 0) {
      console.log("No doctors found");
      await mongoose.disconnect();
      return;
    }

    // Hash موحد للباسورد
    const hash_password = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    for (const doctor of doctors) {
      try {
        // إذا الدكتور عنده User بالفعل
        if (doctor.user) {
          const existingUser = await User.findById(doctor.user);

          if (existingUser) {
            console.log(
              `Already linked: ${doctor.name} -> ${existingUser.email}`,
            );

            continue;
          }
        }

        // Email خاص بالدكتور
        const emailName = doctor.name
          .toLowerCase()
          .replace(/dr\.\s*/g, "")
          .replace(/[^a-z0-9]+/g, ".")
          .replace(/^\.+|\.+$/g, "");

        let email = `${emailName}@clinic.com`;

        // التأكد أن الـ email غير مستخدم
        let existingEmail = await User.findOne({ email });

        let counter = 1;

        while (existingEmail) {
          email = `${emailName}${counter}@clinic.com`;

          existingEmail = await User.findOne({ email });

          counter++;
        }

        // إنشاء User
        const user = await User.create({
          name: doctor.name,
          email,
          hash_password,
          role: "doctor",
        });

        // ربط Doctor بالـUser
        await Doctor.updateOne(
          { _id: doctor._id },
          {
            $set: {
              user: user._id,
            },
          },
        );

        console.log("================================");
        console.log(`Doctor: ${doctor.name}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${DEFAULT_PASSWORD}`);
        console.log(`User ID: ${user._id}`);
        console.log("Account created successfully");
      } catch (error) {
        console.error(`Error with doctor: ${doctor.name}`);
        console.error(error.message);
      }
    }

    console.log("================================");
    console.log("All doctor accounts processed");
    console.log(`Default password: ${DEFAULT_PASSWORD}`);

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("ERROR:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

createDoctorAccounts();
