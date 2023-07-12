export function convertFormData(formData) {
    const camelCasedFormData = new FormData();

    for (const [key, value] of formData.entries()) {
        const camelCasedKey = key.replace(/_([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        });
        camelCasedFormData.append(camelCasedKey, value);
    }
    return camelCasedFormData;
}

export function defaultFormatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    return formattedDate;
}

