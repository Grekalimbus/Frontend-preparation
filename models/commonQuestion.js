import mongoose, { Schema } from "mongoose";

const commonSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const CommonQuestionModel =
	mongoose.models.CommonQuestion ||
	mongoose.model("CommonQuestion", commonSchema);

export default CommonQuestionModel;
