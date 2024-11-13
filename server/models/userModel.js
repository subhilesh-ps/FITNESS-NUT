const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method

userSchema.statics.signup = async function (email, password) {
  //validation

  if (!email || !password) {
    throw Error("Please provide both email and password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be at least 8 characters long, contain at least one uppercase an lowercause an  special chr"
    );
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//stacic login method

userSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error("Please provide both email and password");
  } else if (!password) {
    throw Error("Please provide both email and password");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
