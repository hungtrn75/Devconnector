const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const zipSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  loc: {
    type: Array,
    required: true
  },
  pop: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});
zipSchema.plugin(mongoosePaginate);
module.exports = Zip = mongoose.model("Zip", zipSchema);
