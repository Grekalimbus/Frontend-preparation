import mongoose, { Schema } from "mongoose";

const reduxSchema = new Schema({
	question: String,
	answer: String,
});

const Redux =
	mongoose.models.Redux || mongoose.model("Redux Question", reduxSchema);

export default Redux;
