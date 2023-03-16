import { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { randomColor } from './utils/randomColor'

export interface UserData {
  firstName: string
  lastName: string
  progress: number
}

export interface CleanUpData {
  name: string
  value: number
  color: string
  key: number
}

function App() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    progress: 0,
  })
  const [data, setData] = useState<CleanUpData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/users')
      const data = await response.json()
      cleanUpData(data)
    }

    fetchData()
  }, [])

  const cleanUpData = (data: UserData[]) => {
    const cleanedData: CleanUpData[] = data.map(({ firstName, lastName, progress }, index) => ({
      name: `${firstName} ${lastName}`,
      value: progress * 100,
      color: `${randomColor()}`,
      key: index,
    }))

    setData(cleanedData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Header userData={userData} handleChange={handleChange} />
      <Main data={data} />
    </>
  )
}

export default App
