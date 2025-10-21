// Base URL selon l'environnement
const baseURL = process.env.VUE_APP_API_URL

// ---- LOGIN ----
export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // nécessaire pour les cookies cross-site
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Erreur lors du login')
    
  }

  return await response.json()
}

export const register = async (email, password) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Essaye de parser la réponse JSON, même si le corps est vide
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l’inscription.');
    }

    return data;
  } catch (err) {
    // Gestion des erreurs réseau (serveur hors ligne, CORS, etc.)
    throw new Error(err.message || 'Erreur réseau');
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseURL}/users/logout`, {
      method: 'POST',
      credentials: 'include', // indispensable pour effacer le cookie JWT
    });

    const data = await response.json().catch(() => ({})); // éviter erreur si pas de body

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la déconnexion.');
    }

    return data; // exemple: { message: 'Déconnecté avec succès' }

  } catch (err) {
    throw new Error(err.message || 'Erreur réseau');
  }
};


export default { login, register, logout }
