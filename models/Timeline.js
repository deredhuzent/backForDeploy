const { Schema, model }= require('mongoose');

const timelineSchema = new Schema(
    {
        userId: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }]
        },
        title: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        link: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Timeline', timelineSchema);