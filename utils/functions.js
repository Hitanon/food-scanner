/**
 * Округляет значение до сотых.
 * @param {number} value - Число для округления.
 * @returns {number} Округленное число или 0, если value не указано.
 */
export function round(value) {
    return value ? Math.round(value * 100) / 100 : 0;
}

/**
 * Конвертирует вес в граммы.
 * @param {string|number} weight - Вес продукта (в граммах или в строковом формате).
 * @returns {number} - Вес в граммах.
 */
export function convertWeightToGrams(weight) {
    if (typeof weight === "string") {
        // Регулярное выражение для "0.5 л", "500 г", "0.5 l", "500 g"
        const match = weight.match(/^([\d.,]+)\s*(л|г|l|g)$/i); 
        if (match) {
            const value = parseFloat(match[1].replace(',', '.'));
            const unit = match[2].toLowerCase();
            if (unit === "л" || unit === "l") {
                return value * 1000;
            }
            if (unit === "г" || unit === "g") {
                return value;
            }
        }
    }
    return typeof weight === "number" ? weight : 0;
}
