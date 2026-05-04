import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const router = useRouter()
  const authStore = useAuthStore()
  const { error, isAuthenticated, loading, profile, user } = storeToRefs(authStore)

  const login = async (email: string, password: string) => {
    await authStore.login(email, password)

    if (authStore.isAuthenticated) {
      router.replace('/')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    await authStore.register(name, email, password)

    if (authStore.isAuthenticated) {
      router.replace('/')
    }
  }

  const logout = async () => {
    await authStore.logout()
    router.replace('/auth/sign-in')
  }

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    error,
    user,
    profile,
  }
}
