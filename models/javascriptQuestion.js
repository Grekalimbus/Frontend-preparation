import mongoose, { Schema } from "mongoose";

const javascriptSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const JavascriptQuestionModel =
	mongoose.models.JavascriptQuestion ||
	mongoose.model("JavascriptQuestion", javascriptSchema);

export default JavascriptQuestionModel;
