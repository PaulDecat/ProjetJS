// Obtenir les éléments du formulaire, de la liste des dépenses et du montant total
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialiser le tableau des dépenses à partir de localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Déclaration de la variable chartData en tant que variable globale
let chartData;

// Fonction pour afficher les dépenses sous forme de tableau
function renderExpenses() {
    expenseList.innerHTML = "";

    // Initialiser le montant total
    let totalAmount = 0;

    // Parcourir le tableau des dépenses et créer des lignes de tableau
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td class="delete-btn" data-id="${i}">Supprimer</td>
        `;
        expenseList.appendChild(expenseRow);

        // Mettre à jour le montant total
        totalAmount += expense.amount;
    }

    // Mettre à jour l'affichage du montant total
    totalAmountElement.textContent = totalAmount.toFixed(2);

    // Enregistrer les dépenses dans localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Extraire les données du tableau des dépenses
    chartData = extractChartData();

    // Créer le graphique
    createPieChart();
}

// Fonction pour extraire les données du tableau des dépenses pour le graphique
function extractChartData() {
    const data = [];
    for (let i = 0; i < expenses.length; i++) {
        data.push({
            category: expenses[i].name,
            value: expenses[i].amount
        });
    }
    return data;
}

// Fonction pour ajouter une dépense
function addExpense(event) {
    event.preventDefault();

    // Obtenir le nom et le montant de la dépense à partir du formulaire
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    // Effacer les entrées du formulaire
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // Valider les entrées
    if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Veuillez entrer des détails de dépense valides.");
        return;
    }

    // Créer un nouvel objet de dépense
    const expense = {
        name: expenseName,
        amount: expenseAmount,
    };

    // Ajouter la dépense au tableau des dépenses
    expenses.push(expense);

    // Afficher les dépenses
    renderExpenses();
}

// Fonction pour supprimer une dépense
function deleteExpense(event) {
    // Vérifie si l'élément déclencheur de l'event possède la classe "delete-btn"
    if (event.target.classList.contains("delete-btn")) {
        // Récupère l'index de la dépense à supprimer à partir de "data-id"
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));

        // Supprime la dépense du tableau
        expenses.splice(expenseIndex, 1);

        // Met à jour l'affichage des dépenses après la suppression
        renderExpenses();
    }
}

// Ajout des écouteurs d'événements :

// Lors de la soumission du formulaire d'ajout de dépense, la fonction addExpense est appelée
expenseForm.addEventListener("submit", addExpense);

// Lorsqu'un clic est effectué sur la liste des dépenses, la fonction deleteExpense est appelée
expenseList.addEventListener("click", deleteExpense);


// Stocker le graphique actuel
let pieChart;

// Fonction pour créer le graphique en camembert
function createPieChart() {
// Détruire le graphique précédent pour éviter les conflits
    if (pieChart) {
        pieChart.destroy();
    }

    // Obtenir le contexte du canvas HTML
    const ctx = document.getElementById('pie-chart').getContext('2d');

    // Extraire les libellés et les données du tableau des dépenses
    const labels = chartData.map(expense => expense.category);
    const data = chartData.map(expense => expense.value);

    // Définir les couleurs de fond pour chaque tranche de graphique
    const backgroundColors = chartData.map((_, index) => `hsl(${index * 40}, 50%, 50%)`);

    // Créer un nouveau graphique en camembert avec Chart.js
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels, // Libellés des tranches
            datasets: [{
                data: data, // Données à afficher
                backgroundColor: backgroundColors, // Couleurs de fond des tranches
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Répartition des dépenses' // Titre du graphique
            }
        }
    });
}

// Afficher les dépenses initiales lors du chargement de la page
renderExpenses();
