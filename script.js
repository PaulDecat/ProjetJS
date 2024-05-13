function submitForm() {
    const travail = document.getElementById('travail').value;
    const investissement = document.getElementById('investissement').value;
    const autres = document.getElementById('autres').value;
    const depense = document.getElementById('depense').value;

    const data = {
        travail: parseInt(travail),
        investissement: parseInt(investissement),
        autres: parseInt(autres),
        depense: parseInt(depense)
    };

    // Envoi des données au serveur
    fetch('/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Affichage des données renvoyées par le serveur dans la console
        updateChart(data); // Mise à jour du graphique avec les données reçues
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateChart(data) {
    // Additionner les valeurs
    const totalIncome = data.travail + data.investissement + data.autres;
    const totalExpense = data.depense;

    // Calculer le solde
    const balance = totalIncome - totalExpense;

    // Calcul des pourcentages pour les hauteurs des barres
    const total = totalIncome + totalExpense + Math.abs(balance);
    const incomeHeight = (totalIncome / total) * 100;
    const expenseHeight = (totalExpense / total) * 100;
    const balanceHeight = (Math.abs(balance) / total) * 100;

    // Sélection des éléments HTML
    const incomeBar = document.getElementById('incomeBar');
    const expenseBar = document.getElementById('expenseBar');
    const balanceBar = document.getElementById('balanceBar');

    // Mise à jour des styles des barres
    incomeBar.style.height = incomeHeight + '%';
    expenseBar.style.height = expenseHeight + '%';
    balanceBar.style.height = balanceHeight + '%';
}
