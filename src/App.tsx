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
      const cleanedData = cleanUpData(data)

      setData(cleanedData)
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

    return cleanedData
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDelete = async (str: string) => {
    if (data.length > 1) {
      const response = await fetch(`http://localhost:8080/user/${str}`, {
        method: 'DELETE',
      })
      const status = await response.json()

      if (status.message === `User ${str} deleted`) {
        const newData = data.filter(({ name }) => name.split(' ')[1] !== str)
        setData(newData)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { firstName, lastName, progress } = userData
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          progress: progress / 100,
        }),
      })

      const status = await response.json()
      if (status.message === 'User created') {
        const newData = [
          ...data,
          {
            name: `${firstName} ${lastName}`,
            value: Number(progress),
            color: `${randomColor()}`,
            key: data.length,
          },
        ]
        console.log(newData)
        setUserData({
          firstName: '',
          lastName: '',
          progress: 0,
        })
        setData(newData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header userData={userData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <Main data={data} handleDelete={handleDelete} />
    </>
  )
}

export default App
