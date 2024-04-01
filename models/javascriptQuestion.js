import mongoose, { Schema } from "mongoose";

const javascriptSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const JavascriptQuestionModel =
	mongoose.models.JavascriptQuest ||
	mongoose.model("JavascriptQuest", javascriptSchema);

export default JavascriptQuestionModel;
