import { analyzeUserCommand } from "../services/aiService.js";
import { User } from "../models/User.js";
import { checkConflicts, saveAiTasks, findAlternativeSlots } from "../services/scheduler.js";
import { asyncHandler } from "../utils/AsyncHandler.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";

export const processCommand = asyncHandler(async (req, res) => {
  const { command, localTime } = req.body;
  const userId = "6958f25f6d35ce3af967464f"; // Keep temporary for Postman

  const user = await User.findById(userId);

  const userContext = {
    currentTime: localTime || new Date(),
    sleepTime: user.onboardingData?.sleepTime,
    workHours: user.onboardingData?.workHours,
    categoryDurations: user.learningMetrics?.categoryDurations
  };

  const aiResponse = await analyzeUserCommand(command, userContext);

  if (aiResponse.intent === "ADD_TASK") {
    for (const task of aiResponse.tasks) {
      const conflict = await checkConflicts(userId, task.startTime, task.endTime);
      
      if (conflict) {
        const duration = task.durationMinutes || 60;
        const suggestedTime = await findAlternativeSlots(userId, task.startTime, duration);

        return res.status(200).json(
          new ApiResponse(200, {
            actionRequired: "CONFLICT",
            conflictWith: conflict.title,
            suggestedStartTime: suggestedTime,
            message: `You have a conflict with "${conflict.title}". How about moving this to ${suggestedTime.toISOString()}?`,
            aiInterpretation: aiResponse
          }, "Conflict detected")
        );
      }
    }

    const savedTasks = await saveAiTasks(userId, aiResponse.tasks, command);
    
    return res.status(200).json(
      new ApiResponse(200, {
        actionRequired: "NONE",
        tasks: savedTasks,
        message: aiResponse.responseMessage
      }, "Tasks scheduled successfully")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, aiResponse, "Processed")
  );
});