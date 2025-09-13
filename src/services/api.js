// Base URL selon l'environnement
const baseURL =  'http://localhost:3000'

// Fonction pour login
export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Erreur lors du login')
  }

  const data = await response.json()
  return data
}

export default { login }
