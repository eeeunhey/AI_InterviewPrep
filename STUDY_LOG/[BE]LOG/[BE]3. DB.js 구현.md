const mongoose = requite("mongoose");

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB connected");

    } catch (err) {
        console.error("Error copnnecting to MongoDB", err);
        process.exitCode(1);
    }
};

module.exports = connectDB;

-> .env 추가한다
MONGO_URL = 