import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'

export interface UserData {
  firstName: string
  lastName: string
  progress: number
}

function App() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    progress: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Header userData={userData} handleChange={handleChange} />
      <Main />
    </>
  )
}

export default App
