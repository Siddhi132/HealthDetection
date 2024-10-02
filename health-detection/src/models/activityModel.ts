import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    report: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

export const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);