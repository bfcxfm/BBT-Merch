import * as usersAPI from "../api/users";
import { getToken, removeToken } from "../util/security";


export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  console.log("service", userData);
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

export async function getLoginDetails(email) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  console.log("getLoginDetails", email);
  const loginDetails = await usersAPI.getLoginDetails(email);
  // Baby step by returning whatever is sent back by the server
  return loginDetails;
}

export async function loginUser(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.loginUser(userData);
  // Baby step by returning whatever is sent back by the server
  return res;
}

export async function logoutUser() {
  const token = getToken();
  console.log("part1", token)
  console.log("part2",JSON.parse(atob(token.split(".")[1])).payload)
  if (token) {
    const res = await usersAPI.logoutUser(
      token,
      JSON.parse(atob(token.split(".")[1])).payload
    );
    removeToken();
    return res;
  }
  // return res;
}

export async function updateUser(email, userData) {
  try {
    const response = await fetch(`${usersAPI.BASE_URL}/user/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Assuming you're using a token for authentication
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(email) {
  try {
    const response = await fetch(`${usersAPI.BASE_URL}/user/${email}`, {
      method: 'DELETE',
      headers: {
        // Assuming you're using a token for authentication
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null

  return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
}

export function getAdmin() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null

  return token ? JSON.parse(atob(token.split(".")[1])).payload.is_admin: null;
}

export async function checkLogin() {
  const token = getToken();
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.checkLogin(token);
  // Baby step by returning whatever is sent back by the server
  return res;
}
export async function checkPermission() {
  const token = getToken();
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.checkPermission(token);
  // Baby step by returning whatever is sent back by the server
  return res;
}

export async function getOrderDetails(){
  const token = getToken();
  console.log("token", token);
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.getOrderDetails(token, JSON.parse(atob(token.split(".")[1])).payload);
  // Baby step by returning whatever is sent back by the server
  console.log("service", res);
  return res;

}

export async function updateOrderDetails(orderId, updateOrder){
  const token = getToken();
  console.log("token", token);
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const payload = {
    ...updateOrder,
    ...JSON.parse(atob(token.split(".")[1])).payload,
  };
  const res = await usersAPI.updateOrderDetails(token,orderId,payload);
  // Baby step by returning whatever is sent back by the server
  console.log("service", res);
  return res;
}


export async function getAllOrderDetails(){
  const token = getToken();
  console.log("token", token);
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.getAllOrderDetails(token);
  // Baby step by returning whatever is sent back by the server
  console.log("service", res);
  return res;

}

export async function deleteOrder(orderId) {
  console.log('Deleting order:', orderId);
  try {
    const response = await fetch(`${usersAPI.BASE_URL}/order/${orderId}`, {
      method: 'DELETE', // Changed from 'POST' to 'DELETE'
      headers: {
        'Authorization': `Bearer ${getToken()}`, 
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}


export async function getProductPrice(product){
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.getProductPrice(product);
  // Baby step by returning whatever is sent back by the server
  console.log("service", res);
  return res;

}

export async function getAllProduct(){
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.getAllProduct();
  // Baby step by returning whatever is sent back by the server
  console.log("service", res);
  return res;

}

export async function placeOrder(order){
  const token = getToken();
  const payload = {
    ...order,
    ...JSON.parse(atob(token.split(".")[1])).payload,
  };
  const res = await usersAPI.placeOrder(
    token, 
    payload);
  console.log("service", res);
  return res;
}