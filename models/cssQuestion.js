import mongoose, { Schema } from "mongoose";

const cssSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const CssQuestionModel =
	mongoose.models.СssQuestion || mongoose.model("СssQuestion", cssSchema);

export default CssQuestionModel;
