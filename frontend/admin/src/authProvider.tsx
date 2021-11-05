const login: (params: { username: string }) => Promise<void> = ({
  username,
}) => {
  localStorage.setItem('username', username)
  return Promise.resolve()
}

const logout: () => Promise<void> = () => {
  localStorage.removeItem('username')
  return Promise.resolve()
}

const checkError: (params: { status: number }) => Promise<void | never> = ({
  status,
}) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem('username')
    return Promise.reject()
  }
  return Promise.resolve()
}

const checkAuth: () => Promise<void | never> = () => {
  return localStorage.getItem('username') ? Promise.resolve() : Promise.reject()
}

const getPermissions: () => Promise<void> = () => Promise.resolve()

export default {
  login,
  logout,
  checkError,
  checkAuth,
  getPermissions,
}
