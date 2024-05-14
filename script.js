// Obtenir les éléments du formulaire, de la liste des dépenses et du montant total
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialiser le tableau des dépenses à partir de localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

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
    totalAmountElement.textContent =
        totalAmount.toFixed(2);

    // Enregistrer les dépenses dans localStorage
    localStorage.setItem("expenses",
        JSON.stringify(expenses));

    // Extraire les données du tableau des dépenses
    chartData = extractChartData();

    // Créer le graphique
    createPieChart();
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
    if (event.target.classList.contains("delete-btn")) {
        const expenseIndex =
            parseInt(event.target.getAttribute("data-id"));

        // Supprimer la dépense du tableau des dépenses
        expenses.splice(expenseIndex, 1);

        // Afficher les dépenses
        renderExpenses();
    }
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
    if (event.target.classList.contains("delete-btn")) {
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));

        // Supprimer la dépense du tableau des dépenses
        expenses.splice(expenseIndex, 1);

        // Afficher les dépenses
        renderExpenses();
    }
}

// Ajouter des écouteurs d'événements
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

// Fonction pour créer le graphique en camembert
async function createPieChart() {
    const options = {
        title: {
            text: "Répartition des dépenses"
        },
        series: [{
            type: "pie",
            angleKey: "value",
            data: chartData
        }]
    };

    // Récupération du conteneur du graphique
    try {
        const chartContainer = document.getElementById("pie-chart-container");

        // Récupération du conteneur du graphique
        if (chartContainer) {
            chartContainer.innerHTML = '';
            // Création du graphique avec les options fournies
            const chart = await agCharts.AgCharts.create(options);
            // Ajout du graphique au conteneur
            chartContainer.appendChild(chart);
        } else {
            console.error("Failed to append chart to container. Chart or container is not a valid DOM element.");
        }
    } catch (error) {
        console.error("Error creating chart:", error);
    }
}


// Afficher les dépenses initiales lors du chargement de la page
renderExpenses();

// Ajouter des écouteurs d'événements
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

// Afficher les dépenses initiales lors du chargement de la page
renderExpenses();
