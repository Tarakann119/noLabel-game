/** Регулярное выражение для защиты от XSS атаки */
export const XSSRegExp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

/** Регулярное выражение для защиты от SQL инъекций */
export const SQLRegExp = /(['"])(?:(?=(\\?))\2.)*?\1/g;
