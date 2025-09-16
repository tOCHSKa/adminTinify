<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>

    <!-- Feedback -->
    <p v-if="userStore.error" class="text-red-600">{{ userStore.error }}</p>
    <p v-if="userStore.loading" class="text-gray-600">Chargement...</p>

    <!-- Table -->
    <table v-if="!userStore.loading && userStore.users.length" class="min-w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-300 text-left">
          <th class="p-2">Email</th>
          <th class="p-2">Rôle</th>
          <th class="p-2">UUID</th>
          <th class="p-2">Date de création</th>
          <th class="p-2">Plan</th>
          <th class="p-2">Dernière connexion</th>
          <th class="p-2">Nombre de compressions</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user._id" class="border-b">
          <td class="p-2">{{ user.email }}</td>
          <td class="p-2">
            <select v-model="user.role" @change="updateRole(user)" class="cursor-pointer">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <td class="p-2">{{ user.UUID }}</td>
          <td class="p-2">{{ user.createdAt.split('T')[0] }}</td>
          <td class="p-2">{{ user.plan }}</td>
          <td class="p-2">{{ user.lastLogin }}</td>
          <td class="p-2">{{ user.compressionCount }}</td>
          <td class="p-2">
            <button @click="deleteUser(user._id)" class="text-red-600 hover:underline">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!userStore.loading && !userStore.users.length" class="text-gray-500">Aucun utilisateur trouvé.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

const deleteUser = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    await userStore.deleteUser(id)
  }
}

const updateRole = async (user) => {
  await userStore.updateUserRole(user._id, user.role)
}
</script>
