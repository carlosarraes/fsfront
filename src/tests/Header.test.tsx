import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../components/Header'

const mockUser = {
  firstName: '',
  lastName: '',
  progress: 0,
}

const h = {
  handleChange: () => {
    console.log('change')
  },
  handleSubmit: () => {
    console.log('submit')
  },
}

describe('Header', () => {
  it('renders Header component with 3 inputs and one button', () => {
    render(
      <Header userData={mockUser} handleChange={h.handleChange} handleSubmit={h.handleSubmit} />,
    )

    const firstNameElement = screen.getByPlaceholderText(/First name/i)
    expect(firstNameElement).toBeInTheDocument()

    userEvent.type(firstNameElement, 'John')

    const lastNameElement = screen.getByPlaceholderText(/Last name/i)
    expect(lastNameElement).toBeInTheDocument()

    const progressElement = screen.getByPlaceholderText(/Progress/i)
    expect(progressElement).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: /send/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('button starts disabled', () => {
    render(
      <Header userData={mockUser} handleChange={h.handleChange} handleSubmit={h.handleSubmit} />,
    )

    const submitButton = screen.getByRole('button', { name: /send/i })
    expect(submitButton).toBeDisabled()
  })

  it('button is enabled when all inputs are filled', () => {
    render(
      <Header
        userData={{ ...mockUser, firstName: 'John', lastName: 'Smith', progress: 50 }}
        handleChange={h.handleChange}
        handleSubmit={h.handleSubmit}
      />,
    )

    const submitButton = screen.getByRole('button', { name: /send/i })
    expect(submitButton).toBeEnabled()
  })
})
