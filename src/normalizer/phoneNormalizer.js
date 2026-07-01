const { parsePhoneNumberFromString } = require("libphonenumber-js");

function normalizePhone(phone) {
    if (!phone) return null;

    const phoneNumber = parsePhoneNumberFromString(phone, "IN");

    if (phoneNumber && phoneNumber.isValid()) {
        return phoneNumber.number;
    }

    return phone;
}

module.exports = normalizePhone;