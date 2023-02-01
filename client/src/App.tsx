import { Application, Login, PageNotFound, Register } from '~/views'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { getMe } from './service/auth'
import { LoadingState } from './components'

interface AuthAccount {
  _id: string,
  name: string,
  email: string,
  username: string,
  password: string
}

export const AuthContext = createContext<AuthAccount | null>(null)

export const App: React.FC = () => {
  const [authAccount, setAuthAccount] = useState<AuthAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await getMe()
      setAuthAccount(result ? result.data : null)
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <LoadingState />
  }

  return (
    <AuthContext.Provider value={authAccount}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            {!authAccount ? <Redirect to='/login' /> : <Redirect to='/app' />}
          </Route>
          <Route path='/login' exact>
            {!authAccount ? <Login /> : <Redirect to='/app' />}
          </Route>
          <Route path='/register' exact>
            {!authAccount ? <Register /> : <Redirect to='/app' />}
          </Route>
          <Route path='/app'>
            {authAccount ? <Application /> : <Redirect to='/login' />}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
