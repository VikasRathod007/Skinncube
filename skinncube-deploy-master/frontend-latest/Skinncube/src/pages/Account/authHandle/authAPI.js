const apiUrl = process.env.REACT_APP_API_URL

export async function loginUser(loginInfo) {
    const url = `https://${apiUrl}/api/v1/users/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        // Try to parse JSON if possible
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        throw { status: response.status, ...errorData };
      }
  
      const data = await response.json();
      return { data }; // This will include your user identity
    } catch (error) {
      throw error; // Propagate the error
    }
  }
  
  export async function checkAuth() {
    const url = `https://${apiUrl}/api/v1/users/checkAuth`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        // Try to parse JSON if possible
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        throw { status: response.status, ...errorData };
      }
  
      const data = await response.json();
      return { data }; // This will include your user identity
    } catch (error) {
      throw error; // Propagate the error
    }
}

export async function logoutUser() {
  const url = `https://${apiUrl}/api/v1/users/logout`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Try to parse JSON if possible
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      throw { status: response.status, ...errorData };
    }

    const data = await response.json();
    return { data }; // This will include your user identity
  } catch (error) {
    throw error; // Propagate the error
  }
}