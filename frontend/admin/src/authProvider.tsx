import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { User, UserRole } from './models'

const firebaseConfig = {
  apiKey: 'AIzaSyAJ_GxyUXUkja9DCHXVTbH9Jhje5bsfv9s',
  authDomain: 'coworkreservation.firebaseapp.com',
  projectId: 'coworkreservation',
  storageBucket: 'coworkreservation.appspot.com',
  messagingSenderId: '182196777623',
  appId: '1:182196777623:web:c9d18ac242055ba54f2fd2',
  measurementId: 'G-LRR9NTQ779',
}

initializeApp(firebaseConfig)
const auth = getAuth()

const login: (params: { username: string; password: string }) => Promise<void> =
  async ({ username, password }) => {
    try {
      await signInWithEmailAndPassword(auth, username, password).then(
        (userCredential) => {
          const isSuperadmin =
            userCredential.user.email?.split('@')[0] === 'superadmin'
          const user = isSuperadmin
            ? {
                email: userCredential.user.email,
                name: 'Super Admin',
                tenantId: '',
                role: UserRole.SUPER_ADMIN,
              }
            : {
                email: userCredential.user.email,
                name: 'Tenant Admin',
                tenantId: '1',
                role: UserRole.TENANT_ADMIN,
              }
          localStorage.setItem('user', JSON.stringify(user))
        }
      )
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

const logout: () => Promise<void> = async () => {
  localStorage.removeItem('user')
  await auth.signOut()
  return Promise.resolve()
}

const checkError: (params: { status: number }) => Promise<void | never> = ({
  status,
}) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem('user')
    return Promise.reject()
  }
  return Promise.resolve()
}

const checkAuth: () => Promise<void | never> = () => {
  return localStorage.getItem('user') ? Promise.resolve() : Promise.reject()
}

const getPermissions: () => Promise<UserRole> = () => {
  try {
    const userString = localStorage.getItem('user')
    if (userString === null) {
      throw new Error('No user available')
    }
    const user = JSON.parse(userString) as User
    return Promise.resolve(user.role)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getIdentity: () => Promise<User> = () => {
  try {
    const userString = localStorage.getItem('user')
    if (userString === null) {
      throw new Error('No user available')
    }
    const user = JSON.parse(userString) as User
    return Promise.resolve(user)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  login,
  logout,
  checkError,
  checkAuth,
  getPermissions,
  getIdentity,
}
