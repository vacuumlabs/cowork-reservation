import auth from '@react-native-firebase/auth'

export type IdToken = string | null

const getIdToken: () => Promise<IdToken> = async () => {
  return (await auth().currentUser?.getIdToken()) ?? null
}

const signIn: (email: string, password: string) => void = async (
  email,
  password
) => {
  await auth().signInWithEmailAndPassword(email, password)
}

const signOut: () => void = async () => {
  await auth().signOut()
}

const resetPassword: (email: string) => void = async (email) => {
  await auth().sendPasswordResetEmail(email)
}

export default {
  getIdToken,
  signIn,
  signOut,
  resetPassword,
}
