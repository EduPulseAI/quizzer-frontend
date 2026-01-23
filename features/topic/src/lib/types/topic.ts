import type { Difficulty } from "@edupulse/quiz";

/**
 * [topic]
 * next-feature@0.1.1-beta.4
 * January 11th 2026, 3:38:01 am
 */
export interface Topic {
  id: string;
  skill: string;
  questions: Record<Difficulty, number>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
