const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
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
    },
    tel: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CompanySchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'company_id',
  justOne: false,
});

CompanySchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log(`Sessions being removed from company ${this._id}`);
    await this.model('Session').deleteMany({ hospital: this._id });
    next();
  },
);

module.exports = mongoose.model('Company', CompanySchema);
