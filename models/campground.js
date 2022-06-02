// requiring mongoose
const mongoose = require("mongoose");
const review = require("./review");
// variable for schema
const Schema = mongoose.Schema;

// making our schema
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});
CampgroundSchema.post('findOneAndDelete',async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }

    })
    
  }
})
// we are exporting
module.exports = mongoose.model("Campground", CampgroundSchema);
