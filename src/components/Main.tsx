import { PieChart } from 'react-minimal-pie-chart'
import { CleanUpData } from '../App'
import ListNames from './ListNames'
import Table from './Table'

interface MainProps {
  data: CleanUpData[]
  handleDelete: (lastName: string) => void
}

const Main = ({ data, handleDelete }: MainProps) => {
  return (
    <main className="flex flex-col justify-center items-center mt-10">
      <section>
        <h1 className="text-3xl text-center">DATA</h1>
        <p className='hidden sm:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
      <section className="flex justify-center items-center mt-10">
        <section className="flex flex-col md:flex-row gap-8">
          <Table data={data} handleDelete={handleDelete} />
          <div className="flex flex-col justify-center items-center sm:flex-row gap-8" data-testid="pie-chart">
            {data.length > 0 && (
              <PieChart
                data={data}
                lineWidth={50}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                labelPosition={70}
                labelStyle={{ fontSize: '8px', fontFamily: 'sans-serif' }}
                paddingAngle={2}
                animate
                animationDuration={500}
                animationEasing="ease-out"
                className="w-10/12 mx-auto sm:w-1/2"
                totalValue={data.reduce((acc, { value }) => acc + value, 0)}
              />
            )}
            <ListNames data={data} />
          </div>
        </section>
      </section>
    </main>
  )
}

export default Main
