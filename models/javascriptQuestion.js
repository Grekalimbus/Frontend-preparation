import mongoose, { Schema } from "mongoose";

const jsSchema = new Schema({
	question: String,
	answer: String,
});

const JS = mongoose.models.JS || mongoose.model("HTML Question", jsSchema);

export default JS;
