/** Регулярное выражение для защиты от XSS атаки */
export const XSSRegExp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
