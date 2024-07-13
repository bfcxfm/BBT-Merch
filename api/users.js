// This is the base path of the Express route we'll define
const BASE_URL = "http://localhost:3000/users";

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const res = await fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const searchParams = new URLSearchParams({ email: email });
  const getLoginDetailsURL = BASE_URL + "/login?" + searchParams;
  console.log(getLoginDetailsURL);
  const res = await fetch(getLoginDetailsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid User");
  }
}

export async function loginUser(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const loginURL = BASE_URL + "/login";
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function storeToken(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const createURL = BASE_URL + "/storeToken";
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Token");
  }
}

export async function logoutUser(token, userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const logoutURL = BASE_URL + "/logout";
  console.log(logoutURL);
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}

export async function checkLogin(token) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const loginURL = BASE_URL + "/checklogin";
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}
export async function checkPermission(token) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const loginURL = BASE_URL + "/checkpermission";
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    // body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function getOrderDetails(token,userData) {
  // Define the URL for fetching order details
  const orderURL = BASE_URL + "/order";
  console.log(orderURL);

  // Perform the fetch request
  const res = await fetch(orderURL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": token 
    },
    body: JSON.stringify(userData),
  });

  // Check if request was successful
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Error fetching order details");
  }
}


export async function updateOrderDetails(token, orderId, updateOrder) {
  // Define the URL for updating order details
   const updateURL = BASE_URL + "/order/" + orderId;
   console.log(updateURL);
   console.log("update",updateOrder);

   const res = await fetch(updateURL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(updateOrder),
  });
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Error updating order details");
  }
}



export async function getAllOrderDetails(token, userData) {
  // Define the URL for fetching order details
  const orderURL = BASE_URL + "/orders";
  console.log(orderURL);
  console.log(token);

  // Perform the fetch request
  const res = await fetch(orderURL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": token 
    },
    body: JSON.stringify(userData),
  });

  // Check if request was successful
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Error fetching order details");
  }
}



export async function getProductPrice(productName) {
  const productURL = `${BASE_URL}/product?name=${encodeURIComponent(productName)}`;
  console.log(productURL);

  const res = await fetch(productURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    console.log("api",data);
    const price= data.data.price;
    console.log("api price",price);
    return price;
    
  } else {
    throw new Error(`Error fetching price for product: ${productName}`);
  }
}

export async function getAllProduct() {
  const productsURL = `${BASE_URL}/products`;
  console.log(productsURL);

  const res = await fetch(productsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data;
  } else {
    throw new Error("Error fetching all product prices");
  }
}

export async function placeOrder(token, order) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  console.log(order);

  const jsonString = JSON.stringify(order, null, 2);  // Pretty print with 2-space indentation

  console.log(jsonString);
  
  const orderURL = BASE_URL + "/neworder";
  console.log(orderURL);
  const res = await fetch(orderURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(order),
  });
  // Check if request was successful
  console.log(res);
  if (res.ok) {
    // res.json() will resolve to the JWT
    // console.log(res);
    return res.json();
  } else {
    throw new Error("Error placing order");
  }
}