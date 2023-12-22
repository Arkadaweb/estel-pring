export function formatPhoneNumber(phoneNumber: string): string {

    if (!phoneNumber){
        return '+7 (999) 999-99-99'
    }
    // Удаляем все символы, кроме цифр
    const cleaned: string = phoneNumber.replace(/\D/g, '');

    // Проверяем, если номер содержит 11 цифр (включая код страны)
    const isElevenDigits: boolean = cleaned.length === 11;

    // Форматируем номер в зависимости от количества цифр
    const match: RegExpMatchArray | null = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        if (isElevenDigits) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        } else {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }
    }

    // Если номер не соответствует ожидаемому формату, возвращаем исходную строку
    return phoneNumber;
}
