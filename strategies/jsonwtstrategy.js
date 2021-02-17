import {JwtStrategy, ExtractJwt} from 'passport-jwt'
import mongoose from 'mongoose'
import Person from '../models/Person';


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

//Taken from passport jwt docs
const passport = passport.use( new JwtStrategy(opts, function(jwt_payload,done){
	User.findOne({id: jwt_payload.sub}, function(err,user){
		if(err){
			return done(err,false);
		}
		if(user){
			return done(null,user);
		}
		else{
			return done(null,false);
		}
	})
}))

export default passport;