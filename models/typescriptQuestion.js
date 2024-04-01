import mongoose, { Schema } from "mongoose";

const typescriptSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const TypescriptQuestionModel =
	mongoose.models.TS || mongoose.model("TypescriptQuestion", typescriptSchema);

export default TypescriptQuestionModel;
