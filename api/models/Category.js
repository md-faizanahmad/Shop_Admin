// import mongoose from "mongoose";
// const categorySchema = new mongoose.Schema(
//   { name: { type: String, required: true, unique: true }, description: String },
//   { timestamps: true }
// );
// export default mongoose.model("Category", categorySchema);
/////////////////////////
/// update reviews and all
// models/Category.js
import mongoose from "mongoose";
import slugify from "slugify";

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Category name is required"],
//       trim: true,
//       unique: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     image: String, // category banner
//     parent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       default: null,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
// );

//// Update After Test
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true, // Creates { slug: 1 }
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true, // Creates { parent: 1 }
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Virtual: subcategories
categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

// Index for fast lookup
/// update after test
// categorySchema.index({ slug: 1 });
// categorySchema.index({ parent: 1 });

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
