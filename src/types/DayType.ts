export type DayType = {
  count: number;
  results: TrainingType[]
}

type TrainingType = {
  id: number;
  training: number;
  description: string;
  day: number[];
}
