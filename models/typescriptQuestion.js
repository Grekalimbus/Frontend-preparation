import mongoose, { Schema } from "mongoose";

const typescriptSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const TS =
	mongoose.models.TS || mongoose.model("TS Question", typescriptSchema);

export default TS;
