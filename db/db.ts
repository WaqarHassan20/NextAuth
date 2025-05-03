import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB is connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongodb is having an error while connecting, please make sure the connection",
        err
      );
      process.exit();
    });

    // exclaimation marks is actually the surety of that this
    // line of code will always be resolved , I am sure about it
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
