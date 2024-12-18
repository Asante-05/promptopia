import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { userId, prompt, tag } = await req.json();

        console.log("POST API accessed");

        if (!userId || !prompt || !tag) {
            return new Response("All fields must be filled", {status: 400})
        }

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 200})
    } catch (error) { 
        return new Response("Failed to create a new prompt", {status: 500})
    }
};
