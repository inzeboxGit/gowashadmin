import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { FirebaseError } from 'firebase/app'
import { getAuthErrorMessage, loginWithEmail, logoutFromFirebase, registerWithEmail, subscribeToAuthChanges } from '~/services/auth.service'
import { getUserProfile } from '~/services/users.service'
import type { AuthUser, UserProfile } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const initialized = ref(false)
  const error = ref<string | null>(null)
  const profileLoadError = ref<string | null>(null)

  let initPromise: Promise<void> | null = null

  const loadProfile = async (currentUser: AuthUser | null) => {
    try {
      profileLoadError.value = null
      profile.value = currentUser ? await getUserProfile(currentUser.uid) : null
    } catch (err) {
      profile.value = null
      const code = (err as FirebaseError).code

      profileLoadError.value =
        code === 'permission-denied'
          ? 'Firestore refuse la lecture du profil supers. Verifie les Security Rules.'
          : err instanceof Error
            ? err.message
            : 'Impossible de charger le profil utilisateur.'
    }
  }

  const isAuthenticated = computed(() => !!user.value)

  const init = () => {
    if (initPromise) {
      return initPromise
    }

    initPromise = new Promise((resolve) => {
      subscribeToAuthChanges(async (currentUser) => {
        user.value = currentUser
        await loadProfile(currentUser)

        if (currentUser && !profile.value) {
          await logoutFromFirebase()
          user.value = null
          profile.value = null
          error.value = profileLoadError.value ?? 'Error 403. Compte non autorise. Profil introuvable dans supers.'
        }

        initialized.value = true
        resolve()
      })
    })

    return initPromise
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      user.value = await loginWithEmail(email, password)
      await loadProfile(user.value)

      if (!profile.value) {
        await logout()
        error.value = profileLoadError.value ?? 'Error 403. Compte non autorise. Profil introuvable dans supers.'
      }
    } catch (err) {
      error.value = getAuthErrorMessage(err)
    } finally {
      loading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      user.value = await registerWithEmail(name, email, password)
      await loadProfile(user.value)
    } catch (err) {
      error.value = getAuthErrorMessage(err)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await logoutFromFirebase()
    user.value = null
    profile.value = null
  }

  return {
    user,
    profile,
    loading,
    initialized,
    error,
    isAuthenticated,
    init,
    login,
    register,
    logout,
  }
})
