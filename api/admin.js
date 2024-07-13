const BASE_URL = "http://localhost:3000";

export async function editUser(userData) {
  const response = await fetch(`${BASE_URL}/users/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function deleteUser(userData) {
  const response = await fetch(`${BASE_URL}/users/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function editOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
}

export async function deleteOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
}