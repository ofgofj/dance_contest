import { Team, Criterion, CriterionKey, Scores } from './types';

export const SCORING_CRITERIA: Criterion[] = [
  { id: CriterionKey.Technique, name: 'テクニック' },
  { id: CriterionKey.Performance, name: 'パフォーマンス' },
  { id: CriterionKey.Choreography, name: '振付' },
  { id: CriterionKey.Costume, name: '衣装・小道具' },
];

export const initialScores: Scores = {
  [CriterionKey.Technique]: 75,
  [CriterionKey.Performance]: 80,
  [CriterionKey.Choreography]: 70,
  [CriterionKey.Costume]: 85,
};

export const INITIAL_TEAMS: Team[] = [
  {
    id: 1,
    name: 'サイバネティック・フロー',
    genre: 'テクノ・ヒップホップ',
    totalScore: 0,
    rank: 1,
    previousRank: 1,
    scores: { ...initialScores, [CriterionKey.Technique]: 88, [CriterionKey.Performance]: 92 },
    votes: 12,
  },
  {
    id: 2,
    name: 'コズミック・ワッカーズ',
    genre: 'スペースディスコ・ワッキング',
    totalScore: 0,
    rank: 2,
    previousRank: 2,
    scores: { ...initialScores, [CriterionKey.Performance]: 85, [CriterionKey.Costume]: 95 },
    votes: 8,
  },
  {
    id: 3,
    name: 'リズム・レイダーズ',
    genre: 'ストリート・ブレイクダンス',
    totalScore: 0,
    rank: 3,
    previousRank: 3,
    scores: { ...initialScores, [CriterionKey.Choreography]: 78 },
    votes: 15,
  },
  {
    id: 4,
    name: 'オーロラ・ポッパーズ',
    genre: 'リリカル・ポッピング',
    totalScore: 0,
    rank: 4,
    previousRank: 4,
    scores: { ...initialScores, [CriterionKey.Technique]: 90 },
    votes: 5,
  },
  {
    id: 5,
    name: 'ヴェロシティ・クルー',
    genre: 'ハイエナジー・クランプ',
    totalScore: 0,
    rank: 5,
    previousRank: 5,
    scores: { ...initialScores, [CriterionKey.Performance]: 88 },
    votes: 20,
  },
   {
    id: 6,
    name: 'ソウル・ステッパーズ',
    genre: 'コンテンポラリー・フュージョン',
    totalScore: 0,
    rank: 6,
    previousRank: 6,
    scores: { ...initialScores, [CriterionKey.Choreography]: 91, [CriterionKey.Technique]: 85 },
    votes: 9
  },
  {
    id: 7,
    name: 'ロックダウン・レジェンズ',
    genre: 'ファンク・ロッキング',
    totalScore: 0,
    rank: 7,
    previousRank: 7,
    scores: { ...initialScores, [CriterionKey.Costume]: 75, [CriterionKey.Performance]: 82 },
    votes: 11
  }
];