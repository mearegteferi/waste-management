export const loginAPI = async (credentials) => {
    const response = await fetch('https://backend.com/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.detail || 'fetching failed');
    }
  
    return data; 
  };


  
export const fetchAPI = () => {
    const response = await fetch('https://backend.com/api/fetch/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
  
    return data; 
}

export const logoutAPI = () => {

}
