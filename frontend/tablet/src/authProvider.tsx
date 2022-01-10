import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

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

const googleSignIn: () => void = async () => {
  const { idToken } = await GoogleSignin.signIn()
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  return auth().signInWithCredential(googleCredential)
}

export default {
  getIdToken,
  signIn,
  signOut,
  resetPassword,
  googleSignIn,
}
