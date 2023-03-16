import { useEffect, useState } from 'react'
import { UserData } from '../App'
import { PieChart } from 'react-minimal-pie-chart'

interface CleanUpData {
  name: string
  value: number
  color: string
  key: number
}

const Main = () => {
  const [data, setData] = useState<CleanUpData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/users')
      const data = await response.json()
      cleanUpData(data)
    }

    fetchData()
  }, [])

  const randomColor = () => {
    const hexValues = '0123456789abcdef'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += hexValues[Math.floor(Math.random() * hexValues.length)]
    }
    return color
  }

  const cleanUpData = (data: UserData[]) => {
    const cleanedData: CleanUpData[] = data.map(({ firstName, lastName, progress }, index) => ({
      name: `${firstName} ${lastName}`,
      value: progress * 100,
      color: `${randomColor()}`,
      key: index,
    }))

    console.log(cleanedData)

    setData(cleanedData)
  }

  return (
    <main className="flex flex-col justify-center items-center mt-10">
      <section>
        <h1 className="text-3xl text-center">DATA</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
      <section className="flex justify-center items-center mt-10">
        <div>
          {data.length > 0 && (
            <PieChart
              data={data}
              lineWidth={60}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelPosition={70}
              labelStyle={{ fontSize: '8px', fontFamily: 'sans-serif' }}
              animate
              animationDuration={500}
              animationEasing="ease-out"
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default Main
