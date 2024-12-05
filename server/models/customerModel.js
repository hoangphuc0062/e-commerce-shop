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
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
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
          default: null,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    address: {
      type: [
        {
          street: String,
          wards: String,
          districts: String,
          provinces: String,
          isDefault: { type: Boolean, default: false },
        },
      ],
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
        pid: { type: mongoose.Types.ObjectId, ref: "Order" },
        date: Date,
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
        "https://cdn2.cellphones.com.vn/300x300,webp,q100/media/wysiwyg/Shipper_CPS3_1.png",
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

  UpdateCustomer: async function (updateCustomer) {
    this.address = updateCustomer.address;
    this.name = updateCustomer.name;
    this.phone = updateCustomer.phone;
    return this.save();
  },
};

// Export the model
module.exports = mongoose.model("Customer", customerSchema);
