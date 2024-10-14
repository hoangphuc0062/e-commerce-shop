const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: [0, 1, 2, 3],
      default: 3,
    },
    address: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      enum: [0, 1, 2, 3],
      default: 1,
    },
    CCCD: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    commissionRate: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
      enum: ["Sale", "Support", "Warehouse", "Accounting"],
      default: "Sale",
    },
    base: {
      type: String,
    },
    fixedSalary: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExprires: {
      type: String,
    },
    registerToken: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/avatar%2Favatar-default-w.png?alt=media&token=7b7e2290-128d-4eb8-a800-4c86e64c3030",
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

staffSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password); // password : cua ng dun nhap vao, this.password : cua trong mongodb da hash
  },
  createPasswordChangeToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExprires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};
staffSchema.statics.getStaffByToken = async function (refreshToken) {
  return this.findOne({
    refreshToken,
  });
};

//Export the model
module.exports = mongoose.model("Staff", staffSchema);
