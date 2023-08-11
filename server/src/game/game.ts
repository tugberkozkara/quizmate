import { Player } from "../player/player";

type question = {
    id: number,
    category: string,
    question: string,
    answer: string
}

export class Game{
    id: string;
    roomId: string;
    players: Player[];
    questions: question[];

    constructor(roomId: string, players: Player[], categories: string[]){
        this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        this.roomId = roomId;
        this.players = players;
        this.questions = this.getQuestions(categories);
    }

    getQuestions(categories: string[]){

        //TODO: API call to get questions

        const questions: question[] = [
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
            }
        ];
        return questions;
    }
}