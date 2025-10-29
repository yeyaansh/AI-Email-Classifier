import mongoose from "mongoose";
const mongo_database_connect = async () => {
  await mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`
  );
  console.log("MongoDB Connected...");
};

export default mongo_database_connect;
