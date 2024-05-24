export type UserResponse = {
  /* Имя пользователя **/
  username: string;
  /* Почта **/
  email: string;
  /* Верефикация пройдена **/
  emailVerified: boolean;
  /* Возможность изменять тренировки **/
  is_trustworthy: boolean;
  /* Дата регистрации **/
  date_joined: string;
  /* ? **/
  gym: number;
  /* ? **/
  is_temporary: boolean;
  /* Показывать ли коментарии **/
  show_comments: boolean;
  /* Искать ли продукты на английском **/
  show_english_ingredients: boolean;
  /* Возраст **/
  age: number;
  /* День рождения **/
  birthday: string;
  /* Вес **/
  height: number;
  /* Пол **/
  gender: number;
  /* Среднее количество часов сна **/
  sleep_hours: number;
  work_hours: number;
  sport_hours: number;
  freetime_hours: number;
  /* Калории **/
  calories: number;
  /* Мера веса (кг/фунты) **/
  weight_unit: string;
  workout_reminder_active?: boolean;
  workout_reminder?: number;
  workout_duration?: number;
  notification_language?: string;
  ro_access: boolean;
  num_days_weight_reminder?: number;
}
