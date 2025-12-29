import { analyzeUserCommand } from "../services/aiService.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/AsyncHandler.js"; // Using your existing utils
import { ApiResponse } from "../utils/ApiResponse.js";

export const processCommand = asyncHandler(async (req, res) => {
  const { command, localTime } = req.body;
  const userId = req.user._id; // Assumes your auth middleware adds user to req

  // 1. Fetch User Context for the AI
  const user = await User.findById(userId);

  const userContext = {
    currentTime: localTime || new Date(),
    sleepTime: user.onboardingData?.sleepTime,
    workHours: user.onboardingData?.workHours,
    categoryDurations: user.learningMetrics?.categoryDurations
  };

  // 2. Call the AI Brain
  const aiResponse = await analyzeUserCommand(command, userContext);

  // 3. Return the AI's structured plan (Backend logic for saving to DB comes next)
  return res.status(200).json(
    new ApiResponse(200, aiResponse, "Command processed successfully")
  );
});