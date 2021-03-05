const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Person Model
const Person = require("../../models/Person");

//Load Profile Model
const Profile = require("../../models/Profile");


/*
@type GET
@route /api/profile/
@desc route for personal user profile
@access PRIVATE
*/
router.get(
	'/',
	passport.authenticate('jwt',{session: false}),
	(req,res) => {
		Profile.findOne({user: req.user.id})
		.then( profile => {
			if(!profile){
				return res.status(404).json({profilenotfound: 'User profile not available'})
			}
			res.json(profile);
		})
		.catch(err => console.log('got some error in profile' + err));
})

/*
@type POST
@route /api/profile/
@desc route for personal user profile
@access PRIVATE
*/
router.post(
	"/",
	passport.authenticate("jwt",{session:false}),
	(req,res) => {
		const profileValues = {};
		profileValues.user = req.user.id;
		if(req.body.username) profileValues.username = req.body.username;
		if(req.body.username) profileValues.website = req.body.website;
		if(req.body.username) profileValues.country = req.body.country;
		if(req.body.username) profileValues.portfolio = req.body.portfolio;
		if(typeof req.body.languages !== undefined){
		  profileValues.username = req.body.username.split(",")	
		} 
		//get social links
		profileValues.social = {}
		if(req.body.youtube) profileValues.social.youtube = req.body.youtube;
		if(req.body.facebook) profileValues.social.facebook = req.body.facebook;
		if(req.body.instagram) profileValues.social.instagram = req.body.instagram;
		Profile.findOne({user: req.user.id})
		.then(
			profile => {
				if(profile){
					Profile.findOneAndUpdate(
					{user: req.user.id},
					{$set: profileValues }
						,{new: true})
					
					.then(profile => res.json(profile))
					.catch(err => console.log('problem in update' + err));
					}
				 else {
					Profile.findOne({username: profileValues.username})
					.then(profile => {
						if(profile){
							res.status(400).json({'username': 'Username aready exists'})
						}
						//save user
						new Profile(profileValues)
						.save()
						.then(profile => res.json(profile))
						.catch(err => console.log('error while saving profile',err))
					})
					.catch( err => console.log('Error occured !!!',err))
				}
			
			})
		.catch(err => console.log('Problem in fetching profile' + err))
	}
	);  

/*
@type GET
@route /api/profile/username
@desc route for getting user profile based on username
@access PUBLIC
*/
router.get('/:username',(req,res) => {
	Profile.findOne({username: req.params.username})
	.populate("user",["name","profilepic"])
	.then(profile => {
		if(!profile){
			res.status(404).json({'error':'user not found!!'})
		}
		res.json(profile);
	})
	.catch(err => console.log('Error in fetching username ' + err));
})

router.get('/find/users',(req,res) => {
	Profile.find()
	.populate("user",["name","profilepic"])
	.then(profile => {
		if(!profile){
			res.status(404).json({'error':'user not found!!'})
		}
		res.json(profile);
	})
	.catch(err => console.log('Error in fetching username ' + err));
})


router.get('/:id',(req,res) => {
	Profile.findOne({id: req.params.id})
	.populate("user",["name","profilepic"])
	.then(profile => {
		if(!profile){
			res.status(404).json(console.log('Error in fetching id ' + err))
		}
		res.json(profile);
	})
	.catch(err => console.log('Error in fetching username'))
})

/*
@type DELETE
@route /api/profile
@desc route for deleting user
@access PRIVATE
*/
router.delete('/',passport.authenticate('jwt',{session: false}), (req,res) =>{
	Profile.findOne({user:req.user.id})
	Profile.findOneAndRemove({user: req.user.id})
	.then( () => {
		Person.findOneAndRemove({_id: req.user.id})
		.then( () => {
			res.jaon({success: 'delete was a success'})
		} )
		.catch(err => console.log(err))
	} )
	.catch(err => console.log(err));
})

module.exports = router;
