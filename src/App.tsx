import { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { randomColor } from './utils/randomColor'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'

export interface UserData {
  firstName: string
  lastName: string
  progress?: number
}

export interface CleanUpData {
  name: string
  value: number
  color: string
  key: number
}

const URL = 'https://gofsu-4wgfen3n5q-rj.a.run.app'

function App() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    progress: undefined,
  })
  const [data, setData] = useState<CleanUpData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + '/users')
        const data = await response.json()
        const cleanedData = cleanUpData(data)

        setData(cleanedData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const cleanUpData = (data: UserData[]) => {
    const cleanedData: CleanUpData[] = data.map(({ firstName, lastName, progress }, index) => ({
      name: `${firstName} ${lastName}`,
      value: progress! * 100,
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
      try {
        const response = await fetch(`${URL}/user/${str}`, {
          method: 'DELETE',
        })
        const status = await response.json()

        if (status.message === `User ${str} deleted`) {
          const newData = data.filter(({ name }) => name.split(' ')[1] !== str)
          setData(newData)
          toast.success('User deleted successfully')
        } else {
          toast.error('Something went wrong.')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error('Cannot delete all users')
    }
  }

  const findHighestKey = () => {
    const highestKey = data.reduce((acc, curr) => (acc.key > curr.key ? acc : curr))
    return highestKey.key
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { firstName, lastName, progress } = userData
    e.preventDefault()

    const actualSum = data.reduce((acc, curr) => acc + curr.value, 0)
    const totalSum = actualSum + Number(progress)

    if (totalSum > 100) {
      toast.error('Total progress (including existing data) cannot exceed 100%.')
      return
    }

    if (firstName === '' || lastName === '' || progress === null) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const response = await fetch(URL + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          progress: progress! / 100,
        }),
      })

      const check = await response.json()
      if (check.message === 'User created') {
        const newData = [
          ...data,
          {
            name: `${firstName} ${lastName}`,
            value: Number(progress),
            color: `${randomColor()}`,
            key: findHighestKey() + 1,
          },
        ]
        setUserData({
          firstName: '',
          lastName: '',
          progress: 0,
        })
        setData(newData)
        toast.success('User created successfully')
      } else if (check.message.includes('Error creating user')) {
        toast.error(check.message)
      } else {
        toast.error('Something went wrong.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header userData={userData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <Main data={data} handleDelete={handleDelete} />
      <Footer />
      <ToastContainer className="mt-72 sm:mt-32" position="top-center" />
    </>
  )
}

export default App
