import { initializeApp } from 'firebase/app'
import {
  getAuth,
  ParsedToken,
  signInWithEmailAndPassword,
  UserCredential,
  User as FirebaseUser,
} from 'firebase/auth'
import { CustomUserClaims, User, UserRole } from 'shared/models'

const firebaseConfig = {
  apiKey: 'AIzaSyDWEi46ncDnVLlZBfQtJUQaExTTS0vfFV4',
  authDomain: 'zeta-store-338710.firebaseapp.com',
  projectId: 'zeta-store-338710',
  storageBucket: 'zeta-store-338710.appspot.com',
  messagingSenderId: '150065018955',
  appId: '1:150065018955:web:181764ae5d5d134502f5ce',
}

initializeApp(firebaseConfig)
const auth = getAuth()

type UserClaims = ParsedToken & CustomUserClaims

export const getIdToken: () => Promise<string | null> = async () => {
  return auth.currentUser ? await auth.currentUser?.getIdToken() : null
}

const login: (params: {
  username: string
  password: string
}) => Promise<void | UserCredential> = async ({ username, password }) => {
  return await signInWithEmailAndPassword(auth, username, password)
}

const logout: () => Promise<void> = async () => {
  return await auth.signOut()
}

const checkError: (params: { status: number }) => Promise<void | never> = ({
  status,
}) => {
  if (status === 401 || status === 403) {
    auth.signOut()
    return Promise.reject('Unauthorized or forbidden.')
  }
  return Promise.resolve()
}

const checkAuth: () => Promise<void | never> = () => {
  return auth.currentUser
    ? Promise.resolve()
    : Promise.reject('No user available.')
}

const getUserClaims: (user: FirebaseUser) => Promise<UserClaims> = async (
  user
) => {
  return Promise.resolve((await user.getIdTokenResult()).claims as UserClaims)
}

const getPermissions: () => Promise<UserRole> = async () => {
  if (!auth.currentUser) return Promise.reject()
  return Promise.resolve((await getUserClaims(auth.currentUser)).role)
}

const getIdentity: () => Promise<User> = async () => {
  if (!auth.currentUser) return Promise.reject()
  const claims = await getUserClaims(auth.currentUser)

  return Promise.resolve({
    id: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    tenantId: claims.tenantId,
    role: claims.role,
  } as User)
}

export default {
  login,
  logout,
  checkError,
  checkAuth,
  getPermissions,
  getIdentity,
}
