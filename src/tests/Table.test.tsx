import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Table from '../components/Table'

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

const mockDelete = vi.fn()

describe('Table', () => {
  it('renders a table with correct headers', () => {
    render(<Table data={mockData} handleDelete={mockDelete} />)

    const headers = ['First Name', 'Last Name', 'Progress', 'Remove']

    headers.forEach((header) => {
      const headerElement = screen.getByText(header)
      expect(headerElement).toBeInTheDocument()
    })
  })

  it('renders table rows with correct data and delete buttons', () => {
    render(<Table data={mockData} handleDelete={mockDelete} />)

    mockData.forEach(({ name, value }) => {
      const firstNameElement = screen.getByText(name.split(' ')[0])
      expect(firstNameElement).toBeInTheDocument()

      const lastNameElement = screen.getByText(name.split(' ')[1])
      expect(lastNameElement).toBeInTheDocument()

      const progressValue = `${value}%`
      const progressElement = screen.getByText(progressValue)
      expect(progressElement).toBeInTheDocument()

      const deleteButton = screen.getByLabelText(`delete-${name.split(' ')[1]}`)
      expect(deleteButton).toBeInTheDocument()
    })
  })
})
