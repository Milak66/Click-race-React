import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TextForMessage = 'Were you even clicking?' 
| "It's a so-so result; it could have been better."
| "Not bad, but you should practice more"
| "You're clicking quite fast, keep it up!"
| "Wow, you're a real clicking champion! Now go do something more productive.";

type TextForStarts = '✭' | '✭✭' | '✭✭✭' | '✭✭✭✭' |'✭✭✭✭✭';

type ScoreColor = 'worst_score' 
| 'bad_score' 
| 'average_score' 
| 'good_score' 
|'best_score';

interface UserScore<T, S, C> {
    userMessage: T;
    userStars: S;
    scoreColor: C;
}

const userScore1: UserScore<TextForMessage, TextForStarts, ScoreColor> = {
    userMessage: 'Were you even clicking?',
    userStars: '✭',
    scoreColor: 'worst_score'
}

const userScore2: UserScore<TextForMessage, TextForStarts, ScoreColor> = {
    userMessage: "It's a so-so result; it could have been better.",
    userStars: '✭✭',
    scoreColor: 'bad_score'
}

const userScore3: UserScore<TextForMessage, TextForStarts, ScoreColor> = {
    userMessage: "Not bad, but you should practice more",
    userStars: '✭✭✭',
    scoreColor: 'average_score'
}

const userScore4: UserScore<TextForMessage, TextForStarts, ScoreColor> = {
    userMessage: "You're clicking quite fast, keep it up!",
    userStars: '✭✭✭✭',
    scoreColor: 'good_score'
}

const userScore5: UserScore<TextForMessage, TextForStarts, ScoreColor> = {
    userMessage: "Wow, you're a real clicking champion! Now go do something more productive.",
    userStars: '✭✭✭✭✭',
    scoreColor: 'best_score'
}

interface InitialState {
    clicks: number;
    showTime: boolean;
    time: number;
    timerRunning: boolean; 
    userScore: UserScore<TextForMessage, TextForStarts, ScoreColor>[];
    showScore: boolean;
    removeBtn: boolean;
}

const initialState: InitialState = {
    clicks: 0,
    showTime: false,
    time: 10,
    timerRunning: false,
    userScore: [userScore1, userScore2, userScore3, userScore4, userScore5],
    showScore: false,
    removeBtn: false
}

const reducer = createSlice({
    name: 'reduser',
    initialState,
    reducers: {
        plusClick: (state) => {
            state.clicks++;
        },
        openTime: (state, action: PayloadAction<(boolean)>) => {
            state.showTime = action.payload;
        },
        minusTime: (state) => {
            if (state.time > 0) {
                state.time--;
            }
        },
        setTimerRunning: (state, action: PayloadAction<boolean>) => {
            state.timerRunning = action.payload;
        },
        openScore: (state) => {
            state.showScore = !state.showScore;
        },
        closeBtn: (state) => {
            state.removeBtn = !state.removeBtn;
        }
    },
});
  
export const {
    plusClick,
    openTime,
    minusTime,
    setTimerRunning,
    openScore,
    closeBtn
} = reducer.actions;

export default reducer;