import { render, screen } from '@testing-library/react'
import Main from '../components/Main'

const mockData = [
  {
    name: 'John Smith',
    value: 50,
    color: '#000',
    key: 1,
  },
  {
    name: 'Jane Doe',
    value: 75,
    color: '#fff',
    key: 2,
  },
]

const mockDelete = {
  handleDelete: () => {
    console.log('delete')
  },
}

describe('Main', () => {
  it('renders Main component with name, piechart and side list', () => {
    render(<Main data={mockData} handleDelete={mockDelete.handleDelete} />)

    const nameElement = screen.getByText('John Smith')
    expect(nameElement).toBeInTheDocument()

    const pieChartElement = screen.getByTestId('pie-chart')
    expect(pieChartElement).toBeInTheDocument()

    const listElement = screen.getByText('Jane Doe')
    expect(listElement).toBeInTheDocument()
  })

  it('renders Main component with no data', () => {
    render(<Main data={[]} handleDelete={mockDelete.handleDelete} />)

    const nameElement = screen.queryByText('John Smith')
    expect(nameElement).not.toBeInTheDocument()

    const listElement = screen.queryByText('Jane Doe')
    expect(listElement).not.toBeInTheDocument()
  })
})
