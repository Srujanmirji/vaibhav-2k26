export const AUTH_TOKEN_KEY = 'vaibhav2k26_token';
export const AUTH_CHANGED_EVENT = 'vaibhav2k26_auth_changed';

export type AuthUser = {
  name: string;
  email: string;
  picture: string;
};

const decodeJwtToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    return JSON.parse(decodeURIComponent(jsonPayload));
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const payload = decodeJwtToken(token);
    if (!payload || !payload.exp) return false; // If we can't find exp, assume NOT expired for now
    
    // exp is in seconds, Date.now() is in milliseconds
    const now = Math.floor(Date.now() / 1000);
    const leeway = 30; // 30 seconds leeway
    return payload.exp < (now - leeway); 
  } catch (error) {
    return false; // On error, let the backend decide
  }
};

const notifyAuthChanged = () => {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const getStoredAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const persistAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  notifyAuthChanged();
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  notifyAuthChanged();
};

export const getAuthUserFromToken = (token: string): AuthUser | null => {
  const payload = decodeJwtToken(token);
  if (!payload) {
    return null;
  }

  return {
    name: payload.name || '',
    email: payload.email || '',
    picture: payload.picture || '',
  };
};

export const getStoredAuthUser = (): AuthUser | null => {
  const token = getStoredAuthToken();
  if (!token) {
    return null;
  }

  return getAuthUserFromToken(token);
};
