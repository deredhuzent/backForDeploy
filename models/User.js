const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email:{
      type: String,
      unique: true
    },
    username: {
      type: String 
    },
    profileImg: {
      type: String,
      default: 'https://dl.dropboxusercontent.com/s/sp7n9788gamjam1/profileDefault.jpg?dl=0'
    },
    realName: {
      type: String
    },
    bday: Date,
    location: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    speciality: [Object],
    presentation: {
      type: String,
      default: ''
    },
    tools: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    deviantArt: {
      type: String,
      default: ''
    }, 
    linkedin: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    },
    dailymotion: {
      type: String,
      default: ''
    },
    projects: {
     type: [{ 
       type: Schema.Types.ObjectId, 
       ref: 'Project' 
      }]
     }, 
    timeline: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Timeline'
      }]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(PLM, { usernameField: 'email'});

module.exports = model('User', userSchema);