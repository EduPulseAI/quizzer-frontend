/**
 * [question]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 5:30:08 am
 */
export interface Question {
  id: string;
  text: String;
  difficulty: Difficulty;
  choices: AnswerChoice[];
  tag: string;
}

/**
 * [difficulty]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 5:30:31 am
 */
export type Difficulty =
  | 'BEGINNER'
  | 'EASY'
  | 'INTERMEDIATE'
  | 'HARD'
  | 'ADVANCED';

/**
 * [answer-choice]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 5:33:58 am
 */
export interface AnswerChoice {
  choiceId: string;
  value: string
  isCorrect: boolean
}
