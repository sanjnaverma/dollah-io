var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//establish schema
var Expenditure = mongoose.Schema({
  /*
  What did I buy
  How much was it for
  When did I buy it
  Why did I buy it
  Where did I buy it
  Which card did I use
  Need to get reimbursed
  */
  items_purchased: String,
  price_paid: Number,
  date_bought: {type: Date, default: Date.now},
  reason_for_purchase: String,
  location_of_purchase: String,
  payment_method: String,
  reimbursement_needed: Boolean

});

var UserSchema = new mongoose.Schema({ });
UserSchema.plugin(passportLocalMongoose);
mongoose.model('Expenditure', Expenditure);



mongoose.connect('mongodb://localhost/dollah-io');
