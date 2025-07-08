const mongoose = require('mongoose');

const sendRequestSchema = mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum:{
            values : ['intersted','ignored','accepted','rejected'],
            message : `{VALUE} is not in the status`
        }
    }
},
 {timestamps: true}
)

sendRequestSchema.pre('save', async function (){
    if(this.fromUser.equals(this.toUser)){
        throw new Error("you can send request to yourself") 
    }
})

module.exports = mongoose.model("SendRequestModel", sendRequestSchema)