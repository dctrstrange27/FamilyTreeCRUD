import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB!);
        console.log('MongoDB Database successfully connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;