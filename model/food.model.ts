import { model, Schema } from "mongoose";
export type Foodtype = {
  _id: Schema.Types.ObjectId;
  foodName: String;
  image: string;
  price: number;
  ingredients: string;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
};
export const FoodSchema = new Schema<Foodtype>({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: { type: Schema.ObjectId, required: true, ref: "Categories" },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updateAt: { type: Date, default: Date.now, immutable: true },
});
FoodSchema.index({ foodName: 1 }, { unique: true });
export const FoodModel = model<Foodtype>("Foods", FoodSchema);
