const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author:{
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }]
  },
    date: {
      type: Date,
      required: false
    },
    techniques: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgs: [ String ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Project', projectSchema);