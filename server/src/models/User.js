import mongoose from 'mongoose';
import validateAllowedFields from '../util/validateAllowedFields.js';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fullName: {
    first: String,
    last: String,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  phone: Number,
  address: String,
  postCode: String,
  favorites: [{ productId: { type: mongoose.ObjectId, ref: 'products' } }],
  shoppingCart: [
    { productId: { type: mongoose.ObjectId, ref: 'products' }, amount: Number },
  ],
  recentViews: [
    {
      productId: { type: mongoose.ObjectId, ref: 'products' },
      category: String,
      subCategory: String,
    },
  ],
});

const User = mongoose.model('users', userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    'userName',
    'fullName',
    'email',
    'password',
    'isAdmin',
    'phone',
    'address',
    'postCode',
    'favorites',
    'shoppingCart',
    'recentViews',
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.userName == null) {
    errorList.push('userName is a required field');
  }

  if (userObject.email == null) {
    errorList.push('email is a required field');
  }

  if (userObject.password == null) {
    errorList.push('password is a required field');
  }

  return errorList;
};

export default User;
