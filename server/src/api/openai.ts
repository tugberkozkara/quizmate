import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();

const contentText: string = 'Create a list of 10 one word answered quiz questions for a competition from the given categories: [';
const contentFormatRequest: string = ']. Give the questions in the following format: array of objects with id, category, question and answer. Example: ';
const contentFormatExample: string = '[{"id": 1, "category": "Music", "question": "What instrument is a central part of a traditional mariachi band?","answer": "Trumpet"},{"id": 2,"category": "Coffee","question": "What brewing method uses hot water forced through finely-ground coffee beans to make a strong and concentrated coffee?","answer": "Espresso"}]';


export const apiCall = async (categories: string[]) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "user",
                        "content": contentText + categories + contentFormatRequest + contentFormatExample
                    }
                ],
                max_tokens: 1024,
                temperature: 1,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};

type question = {
    id: number,
    category: string,
    question: string,
    answer: string
}

export const getAIResponse = (response: any): question[] => {
    try{
        const parsedArray = JSON.parse(response.choices[0]?.message.content);
        if (Array.isArray(parsedArray)) {
            return parsedArray;
        }
    }
    catch (error) {
        console.log(error);
    }
    return [
        {
            id: 1,
            category: "Music",
            question: "What instrument is a central part of a traditional mariachi band?",
            answer: "Trumpet"
        },
        {
            id: 2,
            category: "Coffee",
            question: "What brewing method uses hot water forced through finely-ground coffee beans to make a strong and concentrated coffee?",
            answer: "Espresso"
        },
        {
            id: 3,
            category: "Coffee",
            question: "What is the name of the coffee drink that is made with equal parts espresso, steamed milk, and foamed milk?",
            answer: "Cappuccino"
        }
    ];
}
