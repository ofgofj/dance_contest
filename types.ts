
export enum CriterionKey {
  Technique = 'technique',
  Performance = 'performance',
  Choreography = 'choreography',
  Costume = 'costume',
}

export interface Criterion {
  id: CriterionKey;
  name: string;
}

export interface Scores {
  [CriterionKey.Technique]: number;
  [CriterionKey.Performance]: number;
  [CriterionKey.Choreography]: number;
  [CriterionKey.Costume]: number;
}

export interface Team {
  id: number;
  name: string;
  genre: string;
  totalScore: number;
  rank: number;
  previousRank: number;
  scores: Scores;
  votes?: number;
}
