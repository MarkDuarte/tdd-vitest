import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { Appointment } from './appointments'

test('Create an appointment', () => {
  const startsAt = getFutureDate('2023-03-06')
  const endsAt = getFutureDate('2023-03-07')

  startsAt.setDate(startsAt.getDate() + 1)
  endsAt.setDate(endsAt.getDate() + 2)

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('cannot create a appointment with end date before start date', () => {
  const startsAt = getFutureDate('2023-03-06')
  const endsAt = getFutureDate('2023-03-05')

  startsAt.setDate(startsAt.getDate() + 2)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('cannot create a appointment with start date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})