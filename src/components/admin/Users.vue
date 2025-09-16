<template>
    <section>
      <h2 class="text-2xl font-semibold mb-4">Utilisateurs</h2>
  
      <div v-if="store.loading" class="text-gray-500">Chargement…</div>
      <div v-if="store.error" class="text-red-600">{{ store.error }}</div>
  
      <table v-if="!store.loading && !store.error" class="min-w-full bg-white shadow rounded">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="p-2">Email</th>
            <th class="p-2">UUID</th>
            <th class="p-2">Rôle</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in store.users" :key="user._id" class="border-b">
            <td class="p-2">{{ user.email }}</td>
            <td class="p-2">{{ user.UUID }}</td>
            <td class="p-2">
              <select v-model="roles[user._id]" @change="changeRole(user._id)" class="border p-1 rounded">
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </td>
            <td class="p-2">
              <button @click="remove(user._id)"
                      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  
  const store = useUserStore()
  const roles = reactive({})
  
  onMounted(async () => {
    await store.fetchUsers()
    // pré-remplit les selects avec les rôles actuels
    store.users.forEach(u => { roles[u._id] = u.role })
  })
  
  const changeRole = async (id) => {
    await store.updateUserRole(id, roles[id])
  }
  
  const remove = async (id) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      await store.deleteUser(id)
      delete roles[id]
    }
  }
  </script>
  