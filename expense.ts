export function parseFormData(formData: string): any {
    try {
        // Parse la chaîne en un objet
        const parsedData = new URLSearchParams(formData);
        // Convertit l'objet en un objet JavaScript
        const expenseData: any = {};
        for (const [key, value] of parsedData.entries()) {
            expenseData[key] = value;
        }
        return expenseData;
    } catch (error) {
        console.error("Error parsing form data:", error);
        return null;
    }
}
