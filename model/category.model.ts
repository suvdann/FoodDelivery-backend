import { model, Schema } from "mongoose";

export type categoryType = {
  categoryName: string;
  createdAt: Date;
  updateAt: Date;
};
const CategorySchema = new Schema<categoryType>({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updateAt: { type: Date, default: Date.now, immutable: true },
});
CategorySchema.index({ categoryName: 1 }, { unique: true });
export const CategoryModel = model<categoryType>("Categories", CategorySchema);
