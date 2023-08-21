import { Room } from "../room/room";
import { Player } from "../player/player";

import { getAIResponse, apiCall } from "../api/openai";

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

type playerAnswers = {
    player: Player,
    answers: answer[]
}

type score = {
    player: Player,
    score: number
}

export class Game{
    id: string;
    roomId: string;
    players: Player[];
    questions: Promise<question[]>;
    playerAnswers: playerAnswers[];
    playerScores: score[];

    constructor(room: Room, players: Player[], categories: string[]){
        this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        while(room.games.filter(e => e.id === this.id).length > 0){
            this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        }
        this.roomId = room.id;
        this.players = players;
        this.questions = this.getQuestions(categories);
        this.playerAnswers = [];
        this.playerScores = [];
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
            playerAnswers: this.playerAnswers,
            playerScores: this.playerScores
        }
    }

    async addPlayerAnswers(player: Player, selfAnswers: answer[]): Promise<void>{
        const playerAnswer: playerAnswers = {
            player: player,
            answers: selfAnswers
        }
        if(this.playerAnswers.filter(e => e.player.id === player.id).length === 0){
            this.playerAnswers.push(playerAnswer);
            const score: number = await this.getPlayerScore(player);
            const playerScore: score = {
                player: player,
                score: score
            }
            this.playerScores.push(playerScore);
        }
    }

    async getPlayerScore(player: Player): Promise<number>{
        const questions : question[] = await this.questions;
        const playerAnswer: playerAnswers = this.playerAnswers.filter(e => e.player.id === player.id)[0];
        const score: number = playerAnswer.answers.filter(e => e.answer === (questions).filter(f => f.id === e.questionId)[0].answer).length;
        return score;
    }
}
