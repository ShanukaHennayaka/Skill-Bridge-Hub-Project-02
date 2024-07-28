import config from 'config'
import mongoose from 'mongoose'

export default function (){
    const db = config.get("db");
    const env = config.get("name");
    mongoose
      .connect(db)
      .then(() => {
        console.log(`Running on ${env} environment.Connected to ${db}.`);
      })
      .catch((err) => {
        console.log(err);
      });
}