const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
//
const { campgroundSchema, reviewSchema } = require("./schemas");
const app = express();
// requiring the path
const path = require("path");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
// const { nextTick } = require("process");
//const { number } = require("joi");
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
const Review = require("./models/review");

main().catch((err) => console.log(err));
// connecting to mongoose
async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
  console.log("connected");
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

// setting views directory
app.set("view engine", "ejs");
// 5 to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
app.get("/", (req, res) => {
  res.render("home");
});

1; // app.get("/campgrounds", catchAsync(async(req, res) => {
//   const campgrounds = await Campground.find({});

//   res.render("campgrounds/index", { campgrounds });
// }));

3; // app.get("/campgrounds/new", (req, res) => {
//   res.render("campgrounds/new");
// });

4; // app.post("/campgrounds", validateCampground, catchAsync (async(req, res, next) => {
//   // if(!req.body.campground) throw new ExpressError('Invalid campground data',400)

//   const campground = new Campground(req.body.campground);
//   await campground.save();
//   res.redirect(`/campgrounds/${campground._id}`)

//  }));

2; // app.get("/campgrounds/:id", catchAsync (async(req, res) => {
//   const campground = await Campground.findById(req.params.id).populate('reviews');
//   console.log('campground!')
//   res.render("campgrounds/show", { campground });
// }));

// app.get("/campgrounds/:id/edit", catchAsync (async(req, res) => {
//   const campground = await Campground.findById(req.params.id);
//   res.render("campgrounds/edit", { campground });
// }));

// for update/edit
6; // app.put("/campgrounds/:id", validateCampground, catchAsync (async(req, res) => {
//   const { id } = req.params;
//   const campground = await Campground.findByIdAndUpdate(id, {
//     ...req.body.campground,
//   });
//   res.redirect(`/campgrounds/${campground._id}`);
// }));

7; // app.delete("/campgrounds/:id", catchAsync(async(req, res) => {
//   const { id } = req.params;
//   await Campground.findByIdAndDelete(id);
//   res.redirect("/campgrounds");
// }));

// app.post("/campgrounds/:id/reviews", validateReview, catchAsync(async(req, res) => {
// //  res.send('you made it!!!!')
//  const campground =  await Campground.findById(req.params.id);
// const review = new Review(req.body.review)
//   campground.reviews.push(review)
//   await review.save();
//  await campground.save();
//  res.redirect(`/campgrounds/${campground._id}`);
// }));

// app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync(async(req, res) => {
//  const { id, reviewId } = req.params;
//  await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId }} );

//   await Review.findByIdAndDelete(req.params.reviewId)
//   res.redirect(`/campgrounds/${id}`);
// }))

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("serving  on port 3000");
});
