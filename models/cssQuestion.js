import mongoose, { Schema } from "mongoose";

const cssSchema = new Schema({
	question: String,
	answer: String,
	category: String,
});

const CSS = mongoose.models.CSS || mongoose.model("CSS Question", cssSchema);

export default CSS;
