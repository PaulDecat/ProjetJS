"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFormData = void 0;
function parseFormData(formData) {
    try {
        // Parse la chaîne en un objet
        var parsedData = new URLSearchParams(formData);
        // Convertit l'objet en un objet JavaScript
        var expenseData = {};
        for (var _i = 0, _a = parsedData.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            expenseData[key] = parseInt(value);
        }
        return expenseData;
    }
    catch (error) {
        console.error("Error parsing form data:", error);
        return null;
    }
}
exports.parseFormData = parseFormData;
