import { Room } from "../room/room";
import { Player } from "../player/player";

import { getAIResponse, apiCall } from "../api/openai";
import { levenshteinDistance } from "../utils/levenshtein";

type question = {
    id: number,
    category: string,
    question: string,
    answer: string
}

type answer = {
    questionId: number,
    answer: string
}

type playerAnswer = {
    question: question,
    answer: string,
    correct: boolean
}

type playerResult = {
    player: Player,
    score: number,
    answers: playerAnswer[],
    timeLeft: number
}

export class Game{
    id: string;
    roomId: string;
    players: Player[];
    questions: Promise<question[]>;
    timeMax: number;
    playerResults: playerResult[];

    constructor(room: Room, players: Player[], categories: string[]){
        this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        while(room.games.filter(e => e.id === this.id).length > 0){
            this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        }
        this.roomId = room.id;
        this.players = players;
        this.questions = this.getQuestions(categories);
        this.timeMax = 0;
        this.playerResults = [];
    }

    async getQuestions(categories: string[]) : Promise<question[]>{
        const questions: question[] = getAIResponse(await apiCall(categories));
        return questions;
    }

    async getSerializedGame(): Promise<any>{
        const resolvedQuestions: question[] = await this.questions;
        return {
            id: this.id,
            roomId: this.roomId,
            players: this.players,
            questions: resolvedQuestions,
            timeMax: resolvedQuestions.length * 10,
            playerResults: this.playerResults
        }
    }

    isCorrect(realAnswer: string, playerAnswer: string): boolean{
        const realAnswerArray = realAnswer.toLowerCase().split(" ");
        const playerAnswerArray = playerAnswer.toLowerCase().split(" ");
        return realAnswerArray.some(e => playerAnswerArray.some(f => levenshteinDistance(e, f) <= 1)) || realAnswer.replace(" ", "").toLowerCase() === playerAnswer.replace(" ", "").toLowerCase();
    }

    async addPlayerResult(player: Player, selfAnswers: answer[], selfTimeLeft: number): Promise<void> {
        if(this.playerResults.filter(e => e.player.id === player.id).length > 0){
            return;
        }
        const questions: question[] = await this.questions;
        const playerAnswers: playerAnswer[] = selfAnswers.map(e => {
            const question: question = questions.filter(f => f.id === e.questionId)[0];
            return {
                question: question,
                answer: e.answer,
                correct: this.isCorrect(question.answer, e.answer)
            }
        });
        this.playerResults.push({
            player: player,
            score: playerAnswers.filter(e => e.correct).length,
            answers: playerAnswers,
            timeLeft: selfTimeLeft
        });
    }
}
