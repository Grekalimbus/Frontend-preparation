import mongoose, { Schema } from "mongoose";

const tsSchema = new Schema({
	question: String,
	answer: String,
});

const TS = mongoose.models.TS || mongoose.model("TS Question", tsSchema);

export default TS;
