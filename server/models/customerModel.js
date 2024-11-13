const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");

// Declare the Schema of the Mongo model
var customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [0, 1, 2],
      default: 0,
    },
    code: {
      type: String,
      default: null,
    },
    cart: [
      {
        pid: { type: mongoose.Types.ObjectId, ref: "Product" },
        attributeId: {
          type: String,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],

    sex: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      default: "Nam",
    },
    memberShipType: {
      type: String,
      enum: ["Basic", "Member", "VIP Member"],
      default: "Basic",
    },
    stackMoney: {
      type: Number,
      default: 0,
    },
    totalPurchasePrice: {
      type: Number,
      default: 0,
    },
    purchaseHistory: [
      {
        pid: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        date: Date,
      },
    ],
    paymentHistory: [
      {
        date: Date,
        total: Number,
        paymentMethod: String,
        status: String,
      },
    ],
    isBlocked: {
      type: Boolean,
      default: true,
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
        "https://asset.cloudinary.com/dgthe0zuj/426512c1702396bd962a4de573a60b15",
    },
    birthday: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Methods for customerSchema
customerSchema.methods = {
  // Check if the entered password matches the hashed password
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  // Create a token for password reset
  createPasswordChangeToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExprires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },

  // Update code method
  updateCode: function (newCode) {
    this.code = newCode;
    return this.save(); // Save the customer document with the updated code
  },

  // Add product to cart method

  addToCart: async function (productId, attributeId, quantity = 1) {
    const cartItemIndex = this.cart.findIndex(
      (item) =>
        item.pid.toString() === productId.toString() &&
        item.attributeId.toString() === attributeId.toString()
    );

    if (cartItemIndex > -1) {
      // Product with the same variant exists, update quantity
      this.cart[cartItemIndex].quantity += quantity;
    } else {
      // New product with variant, add to cart
      this.cart.push({ pid: productId, attributeId, quantity });
    }

    await this.save();
    return this.cart;
  },
};

// Export the model
module.exports = mongoose.model("Customer", customerSchema);
