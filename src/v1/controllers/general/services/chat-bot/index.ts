import { Request, Response } from "express";
import OpenAI from "openai";

export const chatBot = async (req: Request, res: Response) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Who won the world series in 2020?" },
        {
          role: "assistant",
          content: "The Los Angeles Dodgers won the World Series in 2020.",
        },
        { role: "user", content: "Where was it played?" },
      ],
      model: "gpt-3.5-turbo-0125",
    //   model: "gpt-4o-mini",
    });

    console.log(completion);

    return res
      .status(200)
      .json({ message: "Success", answer: completion.choices[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong..." });
  }
};
