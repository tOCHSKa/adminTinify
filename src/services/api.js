// Base URL selon l'environnement
const baseURL = 'http://localhost:3000'

// ---- LOGIN ----
// Le backend place déjà le cookie 'token' (httpOnly) dans la réponse
export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Erreur lors du login')
  }

  return await response.json()
}

export default { login }
