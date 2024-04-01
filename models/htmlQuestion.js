import mongoose, { Schema } from "mongoose";

const htmlSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const HtmlQuestionModel =
	mongoose.models.HtmlQuestion || mongoose.model("HtmlQuestion", htmlSchema);

export default HtmlQuestionModel;
