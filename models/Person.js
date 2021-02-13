import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true	
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String
	},
	profilepic: {
		type: String,
		default: "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Person = mongoose.model("myPerson",PersonSchema);

export default Person;