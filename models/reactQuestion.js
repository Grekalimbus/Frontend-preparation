import mongoose, { Schema } from "mongoose";

const reactSchema = new Schema({
	question: String,
	answer: String,
});

const React =
	mongoose.models.React || mongoose.model("React Question", reactSchema);

export default React;
