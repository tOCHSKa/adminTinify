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

export default { login }
