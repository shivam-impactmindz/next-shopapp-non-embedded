import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    state: {
        type: String,
    },
    shop: {
        type: String,
        trim: true,
    },
    accessToken: {
        type: String,
        trim: true,
    },
    isOnline: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
    scope: {
        type: [String],
        default: [],
    },
});
// Check if the model already exists to prevent OverwriteModelError
const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
export default Session;
