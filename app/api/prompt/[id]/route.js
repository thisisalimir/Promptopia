import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET/Find prompt
export const GET = async (req, { params }) => {
  try {
    // Connect to DB
    await connectToDB();

    // Find prompt
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get Prompts", { status: 500 });
  }
};

// Patch(Update)
export const PATCH = async (request, { params }) => {
  // Get new Data
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    // Find Prompt
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    // Update Prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// Delete(delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    // Delete Prompt
    await Prompt.findOneAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
