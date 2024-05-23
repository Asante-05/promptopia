import mongoose, { mongo } from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected){
        console.log("mongodb is connected")
        return 
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log("connection to DB succesfull")
    } catch(error){
        console.error(Error)
    }
}