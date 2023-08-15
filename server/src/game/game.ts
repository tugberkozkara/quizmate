import { Player } from "../player/player";

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
    questions: question[];
    playerAnswers: playerAnswers[];
    playerScores: score[];

    constructor(roomId: string, players: Player[], categories: string[]){
        this.id = Math.floor(Math.random() * (9 - 1) + 1).toString();
        this.roomId = roomId;
        this.players = players;
        this.questions = this.getQuestions(categories);
        this.playerAnswers = [];
        this.playerScores = [];
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
            },
            {
                id: 3,
                category: "Coffee",
                question: "What is the name of the coffee drink that is made with equal parts espresso, steamed milk, and foamed milk?",
                answer: "Cappuccino"
            }
        ];
        return questions;
    }

    addPlayerAnswers(player: Player, selfAnswers: answer[]): void{
        const playerAnswer: playerAnswers = {
            player: player,
            answers: selfAnswers
        }
        if(this.playerAnswers.filter(e => e.player.id === player.id).length === 0){
            this.playerAnswers.push(playerAnswer);
            const score: number = this.getPlayerScore(player);
            const playerScore: score = {
                player: player,
                score: score
            }
            this.playerScores.push(playerScore);
        }
    }

    getPlayerScore(player: Player): number{
        const playerAnswer: playerAnswers = this.playerAnswers.filter(e => e.player.id === player.id)[0];
        const score: number = playerAnswer.answers.filter(e => e.answer === this.questions.filter(f => f.id === e.questionId)[0].answer).length;
        return score;
    }
}