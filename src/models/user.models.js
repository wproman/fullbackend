import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt js';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
        unique: true
        lowercase: true
        trim: true
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        lowercase: true
        trim: true
    },
    fullName: {
        type: String,
        required: true
        trim: true
        index: true
    },
    avatar: {
        type: String,// cloudinary url
        required: true
    },
    coverImage: {
        type: String,// cloudinary url
       
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
        ],
        password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }   
}, {timestamps: true});

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    // cody is below
    // bcrypt.hash(this.password, 8, (err, hash) => {
    //     if(err) return next(err);
    //     this.password = hash;
    //     next();
    //  chai aur code is below
    this.password = bcrypt.hashSync(this.password, 8);
    next();
    });
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
    };

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                name: this.name,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        );
    };

    userSchema.methods.generateRefreshToken = function(){
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
            }
        );
    };
    
export const User = mongoose.model('User', userSchema);