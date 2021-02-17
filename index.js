import express from 'express';
const app = express()
const port = process.env.PORT || 3000
import mongoose from 'mongoose';
import passport from 'passport'

import bodyparser from 'body-parser';

//Middleware for bodyparser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//bring all routes
import auth from './routes/api/auth.js';
import profile from './routes/api/profile.js';
import questions from './routes/api/questions.js';

//mongoDB configuration
mongoose
.connect('mongodb://127.0.0.1:27017/mongo-api',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})
.then(() => {
	console.log('MongoDB connected!!!')
})
.catch(err => console.log(`Error!!! ${err}`));

//Passport middleware
app.use(passport.initialize());

//config for JWT strategy
import './strategies/jsonwtstrategy.js'

/*
TYPE: GET,
DESC: Testing,
ACCESS: PUBLIC 
*/
app.get('/',(req,res) => {
	res.send('Hello World!')
})

//routes
app.use('/api/auth',auth)

app.use('/api/auth/profile',profile)

app.use('/api/ques',questions)

app.listen(port, () => {
	console.log(`Running at ${port}`)
})