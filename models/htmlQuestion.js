import mongoose, { Schema } from "mongoose";

const htmlSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const HTML =
	mongoose.models.HTML || mongoose.model("HTML Question", htmlSchema);

export default HTML;
