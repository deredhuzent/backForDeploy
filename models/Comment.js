const { Schema, model } = require('mongoose');
const {ObjectId} = Schema.Types;

const commentSchema = new Schema(
    {
        userId:{
            type: ObjectId,
            ref:'User'
        },
        comment: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Comment', commentSchema);