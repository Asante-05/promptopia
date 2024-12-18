import  {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type:"string",
        required: [true, "prompt is required"]
    },
    tag: {
        type: "string",
        required: [true, "You need to provide a tag"]
    }
})
const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt