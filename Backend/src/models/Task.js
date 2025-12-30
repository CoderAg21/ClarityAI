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
            default: "" // Matches 'note' from frontend
        },

        category: {
            type: String,
            enum: ["work", "personal", "health", "learning"], // Matches frontend options
            default: "work"
        },

        duration: {
            type: Number, // in minutes
            required: true,
            min: 5
        },

        priority: {
            type: Number, // 1 = high, 2 = medium, 3 = low
            default: 2,
            index: true
        },

        date: {
            type: Date, // The intended "Scheduled Date"
            index: true
        },
        
        // Optional Due Date (if different from scheduled date)
        dueDate: {
            type: Date,
            default: null
        },

        // 🔑 Backend-assigned start/end (final source of truth for Calendar)
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

        // 🤖 AI hints / suggestions
        aiHints: {
            flexibility: {
                type: String,
                enum: ["low", "medium", "high"],
                default: "medium"
            },
            suggestedStart: { type: Date, default: null },
            suggestedEnd: { type: Date, default: null }
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