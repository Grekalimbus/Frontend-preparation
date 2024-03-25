import mongoose, { Schema } from "mongoose";

const commonSchema = new Schema({
	question: String,
	answer: String,
});

const Common =
	mongoose.models.Common || mongoose.model("Common Question", commonSchema);

export default Common;
