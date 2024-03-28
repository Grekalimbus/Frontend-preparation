import mongoose from "mongoose";

const connetctMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("connect mongodb");
	} catch (error) {
		console.log("error", error);
	}
};

export default connetctMongoDB;
