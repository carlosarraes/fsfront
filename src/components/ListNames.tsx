import { CleanUpData } from '../App'

interface ListNamesProps {
  data: CleanUpData[]
}

const ListNames = ({ data }: ListNamesProps) => {
  return (
    <ul className="flex flex-col gap-2 w-1/2">
      {data.map(({ name, color, key }) => (
        <div key={key} className="flex h-full gap-2">
          <div className="w-6 h-6 self-center rounded-md" style={{ backgroundColor: color }} />
          <li className="self-center" style={{ color: color }}>
            {name}
          </li>
        </div>
      ))}
    </ul>
  )
}

export default ListNames
