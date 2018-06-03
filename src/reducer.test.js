import reducer from './reducer';
import { restartGame, makeGuess, generateAuralUpdate } from './actions';


describe('Reducer', () =>{
    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '_UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.auralStatus).toEqual('');
    })
    it('should return the current state when no action is passed in', ()=>{
        let currentState = {};
        const state = reducer(currentState, { type: '_UNKNOWN' });
        expect(state).toEqual(currentState);
    })

    describe('restartGame', ()=>{
       it('should start a new game', () =>{
           let state = {
               correctAnswer: 25,
               feedback: 'You got it',
               guesses: [1,2,3,4]
           }
           const correctAnswer = 10;
           state = reducer(state, restartGame(correctAnswer));
           expect(state.guesses).toEqual([]);
           expect(state.feedback).toEqual('Make your guess!');
           expect(state.correctAnswer).toEqual(correctAnswer);
           expect(state.auralStatus).toEqual('');
       })
    })

    describe('makeGuess', () => {
        it('should make a guess', ()=>{
            let state = {
                guesses: [],
                feedback: '',
                correctAnswer: 80
            }
            state = reducer(state, makeGuess(25));
            expect(state.guesses).toEqual([25]);
            expect(state.feedback).toEqual("You're Ice Cold...");

            state = reducer(state, makeGuess(60))
            expect(state.guesses).toEqual([25,60]);
            expect(state.feedback).toEqual("You're Warm.");

            state = reducer(state,makeGuess(75))
            expect(state.guesses).toEqual([25,60,75]);
            expect(state.feedback).toEqual("You're Hot!")

            state = reducer(state, makeGuess(80))
            expect(state.guesses).toEqual([25, 60, 75, 80]);
            expect(state.feedback).toEqual("You got it!")
        })
    })

    describe('generateAuralUpdate', () => {
        it('should generate aural updates', () => {
            let state = {
                correctAnswer: 5,
                guesses: [1,2,3,4],
                feedback: "You're Hot!",
                auralStatus: ''
            }
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(
                "Here's the status of the game right now: You're Hot! You've made 4 guesses. In order of most- to least-recent, they are: 4, 3, 2, 1"
            )
        })
    })
})