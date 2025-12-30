import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        duration: {
            type: Number, // in minutes
            required: true,
            min: 5
        },

        priority: {
            type: Number, // 1 = high, 3 = low
            default: 2,
            index: true
        },

        date: {
            type: Date, // intended day (optional)
            index: true
        },

        // 🔑 Backend-assigned start/end (final source of truth)
        start: {
            type: Date,
            default: null,
            index: true
        },

        end: {
            type: Date,
            default: null,
            index: true
        },

        status: {
            type: String,
            enum: ["pending", "scheduled", "completed", "skipped"],
            default: "pending"
        },

        // 🤖 AI hints / suggestions (safe, optional)
        aiHints: {
            flexibility: {
                type: String,
                enum: ["low", "medium", "high"],
                default: "medium"
            },
            suggestedStart: { type: Date, default: null }, // AI startTime
            suggestedEnd: { type: Date, default: null }    // AI endTime
        },

        createdBy: {
            type: String,
            enum: ["manual", "ai"],
            default: "manual"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);