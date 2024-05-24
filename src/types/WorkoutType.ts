export type WorkoutsType = {
  count: number;
  results: Workout[]
}

export type Workout = {
  id: number;
  exerciseday: number;
  sets: number;
  order: number;
  comment: string;
  exerciseId: number;
}
