export function parseFormData(formData: string): any {
    try {
        const parsedData = new URLSearchParams(formData);
        const expenseData: any = {};
        for (const [key, value] of parsedData.entries()) {
            expenseData[key] = parseInt(value);
        }
        return expenseData;
    } catch (error) {
        console.error("Error parsing form data:", error);
        return null;
    }
}