const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please add company's name`],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, `Please add company's address`],
  },
  website: {
    type: String,
    required: [true, `Please add company's website`],
  },
  desc: {
    type: String,
    required: [true, `Please add company's description`],
  },
  tel: {
    type: String,
    required: [true, `Please add company phone number`],
  },
});

module.exports = mongoose.model('Company', CompanySchema);
