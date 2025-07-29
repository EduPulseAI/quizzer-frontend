import type { PageList } from '@feature/base/lib/types';

/**
 * [get-topics]
 * Tue Jul 29 2025
 */
export type GetTopics = Topic[];

/**
 * [topics]
 * Tue Jul 29 2025
 */
export interface Topic {
  title: string;
  questions: number;
}

/**
 * [get-topics-response]
 * Tue Jul 29 2025
 */
export type GetTopicsResponse = PageList<Topic>