// Set up event listener for order button click
document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('orderButton');
    orderButton.addEventListener('click', handleOrder);
});

// Display a notification message with a timeout
function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.textContent = message;
    notificationContainer.style.display = 'block';
    setTimeout(hideNotification, 5000);
}

// Hide the notification container
function hideNotification() {
    document.getElementById('notification-container').style.display = 'none';
}

// Handle order button click
async function handleOrder() {
    const userName = document.getElementById('userName').value.trim();
    const productName = document.getElementById('productName').value.trim();

    if (!userName || !productName) {
        showNotification('Please enter both a user and a product name.');
        return;
    }

    try {
        await addUserOrder(userName, productName);
        showNotification('Order placed successfully!');
    } catch (error) {
        showNotification(error);
    }
}

// Send a GraphQL request and handle errors
async function sendGraphQLRequest(query, variables = {}) {
    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    const responseBody = await response.json();
    if (responseBody.errors) {
        throw new Error(responseBody.errors.map(error => error.message).join('\n'));
    }
    return responseBody.data;
}

// Add a user order using a GraphQL mutation
async function addUserOrder(userName, productName) {
    // Define a GraphQL mutation query
    const mutation = `
        mutation AddUserOrder($userName: String!, $productName: String!) {
            addUserOrder(userName: $userName, productName: $productName) {
                id
                name
            }
        }
    `;

    await sendGraphQLRequest(mutation, { userName, productName });
}
