var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return `${this.family_name} ${this.first_name}`;
});

//virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  //return (
  //  this.date_of_death.getYear() - this.date_of_birth.getYear()
  //).toString();
  const date_of_birth_formatted = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
  const date_of_death_formatted = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
  return this.date_of_death
    ? `${date_of_birth_formatted} - ${date_of_death_formatted}`
    : !this.date_of_birth
    ? `-`
    : `${date_of_birth_formatted}`;
});

//virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

//virtual for author's date of birth in yyyy-MM-dd
AuthorSchema.virtual("true_date_birth").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat("yyyy-MM-dd");
});

//virtual for author's date of birth in yyyy-MM-dd
AuthorSchema.virtual("true_date_birth").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat("yyyy-MM-dd");
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
