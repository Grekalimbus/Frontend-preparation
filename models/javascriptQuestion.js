import mongoose, { Schema } from "mongoose";

const javascriptSchema = new Schema({
	question: String,
	answer: String,
});

const JS =
	mongoose.models.JS || mongoose.model("JS Question", javascriptSchema);

export default JS;
