import { useEffect, useState } from 'react'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { CleanUpData } from '../App'

interface TableProps {
  data: CleanUpData[]
  handleDelete: (lastName: string) => void
}

const Table = ({ data, handleDelete }: TableProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const sortedData = data.sort((a, b) => a.value - b.value)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 480)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="overflow-x-auto w-full md:w-1/2">
      <table className="table table-compact w-10/12 mx-auto md:w-full">
        <thead>
          <tr>
            { !isSmallScreen && <th>#</th> }
            { !isSmallScreen && <th>First Name</th> }
            <th>Last Name</th>
            <th>Progress</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(({ name, value, key }) => (
            <tr key={key}>
              { !isSmallScreen && <td>{key + 1}</td> }
              { !isSmallScreen && <td>{name.split(' ')[0]}</td> }
              <td>{name.split(' ')[1]}</td>
              <td className="text-center">{value}%</td>
              <td>
                <AiOutlineUserDelete
                  className="mx-auto text-xl text-red-500 cursor-pointer"
                  aria-label={`delete-${name.split(' ')[1]}`}
                  onClick={() => handleDelete(name.split(' ')[1])}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Table
