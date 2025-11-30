export enum Player {
  NONO = 'Nono',
  MATHOU = 'Mathou'
}

export interface QuestionState {
  text: string;
  target: Player;
}