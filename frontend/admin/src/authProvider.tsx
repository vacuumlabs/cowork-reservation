const login: (params: { username: string }) => Promise<void> = ({
  username,
}) => {
  localStorage.setItem('username', username)
  const regexEmail = /(?<=@)[^.]+(?=\.)/
  if (regexEmail.test(username)) {
    // const domain = regexEmail.exec(username)
    // localStorage.setItem('company', domain ? domain[0] : '')
    localStorage.setItem('company', '1')
    localStorage.setItem('permissions', 'tenantadmin')
  } else {
    localStorage.setItem('permissions', 'superadmin')
  }

  return Promise.resolve()
}

const logout: () => Promise<void> = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('company')
  localStorage.removeItem('permissions')
  return Promise.resolve()
}

const checkError: (params: { status: number }) => Promise<void | never> = ({
  status,
}) => {
  if (status === 401 || status === 403) {
    localStorage.removeItem('username')
    localStorage.removeItem('company')
    localStorage.removeItem('permissions')
    return Promise.reject()
  }
  return Promise.resolve()
}

const checkAuth: () => Promise<void | never> = () => {
  return localStorage.getItem('username') ? Promise.resolve() : Promise.reject()
}

const getPermissions: () => Promise<string> = () => {
  const role = localStorage.getItem('permissions')
  return role ? Promise.resolve(role) : Promise.reject()
}

export default {
  login,
  logout,
  checkError,
  checkAuth,
  getPermissions,
}
