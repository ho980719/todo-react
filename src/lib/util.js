function convertFormData(formData) {
    const camelCasedFormData = new FormData();

    for (const [key, value] of formData.entries()) {
        const camelCasedKey = key.replace(/_([a-z])/g, function (match, letter) {
            return letter.toUpperCase();
        });
        camelCasedFormData.append(camelCasedKey, value);
    }

    return camelCasedFormData;
}
function convertObject(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    const camelCasedObj = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelCasedKey = key.replace(/_([a-z])/g, function (match, letter) {
                return letter.toUpperCase();
            });
            camelCasedObj[camelCasedKey] = convertKeysToCamelCase(obj[key]);
        }
    }

    return camelCasedObj;
}