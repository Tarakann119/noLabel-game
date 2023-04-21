/** RegExp для валидации phone */
export const phoneRegExp = /^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/;

/** RegExp для валидации login */
export const loginRegExp = /^[a-z0-9_-]{2,19}$/;

/** RegExp для валидации first_name и second_name */
export const nameRegExp = /^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g;
