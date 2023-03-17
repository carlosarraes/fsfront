import { AiOutlineUserDelete } from 'react-icons/ai'
import { CleanUpData } from '../App'

interface TableProps {
  data: CleanUpData[]
  handleDelete: (lastName: string) => void
}

const Table = ({ data, handleDelete }: TableProps) => {
  const sortedData = data.sort((a, b) => a.value - b.value)

  return (
    <section className="overflow-x-auto w-1/2">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Progress</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(({ name, value, key }) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{name.split(' ')[0]}</td>
              <td>{name.split(' ')[1]}</td>
              <td className="text-center">{value}%</td>
              <td>
                <AiOutlineUserDelete
                  className="mx-auto text-xl text-red-500 cursor-pointer"
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
