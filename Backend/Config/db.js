const mongoose = require('mongoose');
const dbConnect = async () => {

    try
    {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
        return connection;
        
    } catch (error) {

        console.error('Error connecting to database:', error);
        throw error;
    }
};
module.exports = dbConnect;
