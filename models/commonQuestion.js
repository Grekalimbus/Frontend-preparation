import mongoose, { Schema } from "mongoose";

const commonQuestionSchema = new Schema({
	question: String,
	answer: String,
});

const CommonQuestion =
	mongoose.models.Common ||
	mongoose.model("Common Question", commonQuestionSchema);

export default CommonQuestion;
