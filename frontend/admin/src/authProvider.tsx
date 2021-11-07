import { User, UserRole } from './models'

const login: (params: { username: string }) => Promise<void> = ({
  username,
}) => {
  const isSuperadmin = username === 'superadmin'
  const user = isSuperadmin
    ? {
        email: username,
        name: 'Super Admin',
        tenantId: '',
        role: UserRole.SUPER_ADMIN,
      }
    : {
        email: username,
        name: 'Tenant Admin',
        tenantId: '1',
        role: UserRole.TENANT_ADMIN,
      }
  localStorage.setItem('user', JSON.stringify(user))
  return Promise.resolve()
}

const logout: () => Promise<void> = () => {
  localStorage.removeItem('user')
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
