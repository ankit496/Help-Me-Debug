import mongoose, { connect } from 'mongoose';

const mongoUrl = process.env.MONGO_URI;

const connectDB = () => {
    // Check if mongoose is already connected or connecting
    if (mongoose.connection.readyState === 1) {
        //console.log('Already connected to the database.');
        return;
    }

    if (mongoose.connection.readyState === 2) {
        //console.log('Database connection is in progress.');
        return;
    }

    mongoose.connect(mongoUrl, {
        useNewUrlParser: true, // Recommended to avoid deprecation warnings
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        //console.log('Database connected');
    });
};
export default connectDB;