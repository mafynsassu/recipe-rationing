const history = [];

document.getElementById('calculate').addEventListener('click', () => {
  const kuihName = document.getElementById('kuih-name').value.trim();
  const basePortions = parseFloat(document.getElementById('base-portions').value);
  const desiredPortions = parseFloat(document.getElementById('desired-portions').value);
  const ingredientsInput = document.getElementById('ingredients').value;

  if (!kuihName || isNaN(basePortions) || isNaN(desiredPortions) || !ingredientsInput) {
    alert('Please fill out all fields correctly!');
    return;
  }

  const ingredients = ingredientsInput.split(',').map(ingredient => {
    const [amount, ...nameParts] = ingredient.trim().split(' ');
    return {
      amount: parseFloat(amount),
      name: nameParts.join(' ')
    };
  });

  const scaleFactor = desiredPortions / basePortions;
  const scaledIngredients = ingredients.map(ingredient => ({
    name: ingredient.name,
    amount: (ingredient.amount * scaleFactor).toFixed(2)
  }));

  // Display the results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h2>Scaled Ingredients for ${kuihName}</h2>
    <p><strong>Desired Portions:</strong> ${desiredPortions}</p>
  `;
  scaledIngredients.forEach(ingredient => {
    resultsDiv.innerHTML += `<p>${ingredient.amount} ${ingredient.name}</p>`;
  });

  // Save to history
  history.push({ kuihName, desiredPortions, scaledIngredients });
  updateHistory();
});

// Function to update the history section with a delete button
function updateHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = ''; // Clear existing history

  history.forEach((entry, index) => {
    const historyItem = document.createElement('div');
    historyItem.innerHTML = `
      <strong>${index + 1}. ${entry.kuihName} (Desired Portions: ${entry.desiredPortions})</strong>
    `;
    entry.scaledIngredients.forEach(ingredient => {
      historyItem.innerHTML += `<p>${ingredient.amount} ${ingredient.name}</p>`;
    });

    // Create and add the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteHistoryItem(index);

    historyItem.appendChild(deleteButton);
    historyDiv.appendChild(historyItem);
  });
}

// Function to delete a history item
function deleteHistoryItem(index) {
  history.splice(index, 1); // Remove the item from the array
  updateHistory(); // Re-render the history
}
