var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    image_24: {type: String, required: false},
    image_48: {type: String, require: false},
    image_72: {type: String, require: false},
    image_192: {type: String, require: false},
    image_512: {type: String, require: false}

});
var User = mongoose.model('User', UserSchema);

User.findOrCreate = function(profile, cb) {
    console.log(profile.id);
    User.findOne({id: profile.id}).exec(function(err, user) {
        if(err) return cb(err);
        else if(user){
            console.log('user found');
            return cb(null, user);
        }
        else {
            console.log(profile);
            console.log('creating user');
            var u = new User(profile);
            return u.save(function(err, user) {
                console.log('saving profile');
                if(err) console.log(err);
                else return cb(undefined, user);
            });
        }
    });
};




module.exports = User;