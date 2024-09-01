import mongoose from "mongoose"

const connectToDb = async () => {
  const connectionUrl =
    "mongodb+srv://namo:c_anish33@@cluster0.utxrc.mongodb.net/"

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Blog DB Connection is succesful"))
    .catch((error) => console.log(error))
}

export default connectToDb
