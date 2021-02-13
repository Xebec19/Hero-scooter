import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/mongo-api',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})