import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App', () => {
  it('renders App component', () => {
    render(<App />)

    const dataElement = screen.getByText(/Data/i)
    const pElement = screen.getByText(/lorem/i)

    expect(dataElement).toBeInTheDocument()
    expect(pElement).toBeInTheDocument()
  })

  it('Renders app with mock data', async () => {
    render(<App />)

    const findJohn = await screen.findAllByText(/john/i)

    expect(findJohn).toHaveLength(2)
  })

  it('Errors if user sum > 100', async () => {
    render(<App />)

    const firstInput = screen.getByPlaceholderText(/First name/i)
    const lastInput = screen.getByPlaceholderText(/Last name/i)
    const progressInput = screen.getByPlaceholderText(/Progress/i)
    const btn = screen.getByRole('button', { name: /send/i })

    await userEvent.type(firstInput, 'Carlos')
    await userEvent.type(lastInput, 'Gonzalez')
    await userEvent.type(progressInput, '20')

    expect(btn).toBeEnabled()
    await userEvent.click(btn)

    const error = await screen.findByText(/Progress sum/i)

    expect(error).toBeInTheDocument()
  })

  it('Does not error if user sum < 100', async () => {
    render(<App />)

    const firstInput = screen.getByPlaceholderText(/First name/i)
    const lastInput = screen.getByPlaceholderText(/Last name/i)
    const progressInput = screen.getByPlaceholderText(/Progress/i)
    const btn = screen.getByRole('button', { name: /send/i })

    await userEvent.type(firstInput, 'Carlos')
    await userEvent.type(lastInput, 'Gonzalez')
    await userEvent.type(progressInput, '10')

    expect(btn).toBeEnabled()
    await userEvent.click(btn)

    const success = await screen.findByText(/User created/i)

    expect(success).toBeInTheDocument()
  })

  it('Error on delete user', async () => {
    render(<App />)

    const firstInput = screen.getByPlaceholderText(/First name/i)
    const lastInput = screen.getByPlaceholderText(/Last name/i)
    const progressInput = screen.getByPlaceholderText(/Progress/i)
    const btn = screen.getByRole('button', { name: /send/i })

    await userEvent.type(firstInput, 'Carlos')
    await userEvent.type(lastInput, 'Gonzalez')
    await userEvent.type(progressInput, '10')

    expect(btn).toBeEnabled()
    await userEvent.click(btn)

    const deleteBtn = screen.getByLabelText(/delete-gonzalez/i)

    await userEvent.click(deleteBtn)
  })
})
