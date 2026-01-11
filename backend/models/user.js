/* Create imports */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const { isEmail } = validator;
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/* Create Schema */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    age: {
      type: Number,
      min: [1, "Age must be greater than 0"],
      max: [120, "Age not valid"],
    },
    diabetesType: {
      type: String,
      enum: ["type1", "type2", "gestational", "prediabetes"],
      default: "type2",
      required: true,
    },
    targetGlucose: {
      min: {
        type: Number,
        default: 70,
        min: 50,
        max: 140,
      },
      max: {
        type: Number,
        default: 180,
        min: 100,
        max: 340,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/* Create methods */
userSchema.virtual("avatar").get(function () {
  const hash = crypto.createHash("md5").update(this.email.toLowerCase().trim()).digest("hex");

  return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
});

userSchema.statics.register = async function (
  name,
  email,
  password,
  age,
  diabetesType,
  targetGlucose
) {
  if (!name || !email || !password || !age || !diabetesType || !targetGlucose) {
    throw new Error("All fields required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const newUser = await this.create({
    name,
    email,
    password,
    age,
    diabetesType,
    targetGlucose,
  });
  const user = await this.findById(newUser._id);

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const currentUser = await this.findOne({ email }).select("+password");
  if (!currentUser) {
    throw new Error("User does not exist");
  }

  const match = await bcrypt.compare(password, currentUser.password);
  if (!match) {
    throw new Error("Passwords don't match");
  }

  const user = await this.findOne({ email }).select("-password");

  return user;
};

userSchema.statics.updateProfile = async function (
  userId,
  { name, email, password, age, diabetesType, targetGlucose }
) {
  const user = await this.findById(userId).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  if (email && email !== user.email) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    const emailExists = await this.findOne({ email });
    if (emailExists) {
      throw new Error("Email already in use");
    }
    user.email = email;
  }

  if (password && password.trim() !== "") {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    user.password = password;
  }

  if (name) user.name = name;
  if (age) {
    if (age < 1 || age > 120) {
      throw new Error("Age must be between 1 and 120");
    }
    user.age = age;
  }
  if (diabetesType) {
    const validTypes = ["type1", "type2", "gestational", "prediabetes"];
    if (!validTypes.includes(diabetesType)) {
      throw new Error("Invalid diabetes type");
    }
    user.diabetesType = diabetesType;
  }
  if (targetGlucose) {
    if (targetGlucose.min) {
      if (targetGlucose.min < 50 || targetGlucose.min > 140) {
        throw new Error("Min glucose must be between 50-140");
      }
      user.targetGlucose.min = targetGlucose.min;
    }
    if (targetGlucose.max) {
      if (targetGlucose.max < 100 || targetGlucose.max > 340) {
        throw new Error("Max glucose must be between 100-340");
      }
      user.targetGlucose.max = targetGlucose.max;
    }
  }

  await user.save();
  return await this.findById(userId);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});

/* Create exports */
module.exports = mongoose.model("User", userSchema);
