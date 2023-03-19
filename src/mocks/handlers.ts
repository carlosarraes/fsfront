import { rest } from 'msw'
import { UserData } from '../App'

const url = 'https://gofs-4wgfen3n5q-rj.a.run.app'

let employees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    progress: 0.5,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    progress: 0.4,
  },
]

export const handlers = [
  rest.get(`${url}/users`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(employees))
  }),
  rest.post(`${url}/user`, (req, res, ctx) => {
    const { firstName, lastName, progress } = req.body as UserData
    const sum = employees.reduce((acc, curr) => acc + curr.progress, 0)
    if (sum + progress > 1) {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Error creating user: Progress sum is greater than 100',
        }),
      )
    }
    employees.push({ firstName, lastName, progress })
    return res(ctx.status(200), ctx.json({ message: 'User created' }))
  }),
  rest.delete(`${url}/user/:id`, (_, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: /Error deleting user: User not found/i }))
  }),
]
