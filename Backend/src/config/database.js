// const mongoose = require('mongoose');

// async function connectToDb()  {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log('Connected to MongoDB');
//     }
//     catch (err){
//         console.log('Failed to connect to MongoDB', err);
//     }
// }

// module.exports = connectToDb;


const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4  // Force IPv4
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
}

module.exports = connectToDb;