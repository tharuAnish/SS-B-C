import mongoose from "mongoose"

const connectToDb = async () => {
  const connectionUrl =
    "mongodb+srv://namoanishtharu:FAXfRXBMVGoEW0il@cluster0.fckhr.mongodb.net/"

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog DB Connection is succesful"))
    .catch((error) => console.log(error))
}

export default connectToDb
