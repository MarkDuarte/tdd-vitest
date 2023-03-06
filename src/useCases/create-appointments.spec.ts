import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointments'
import { InMemoryAppointmentsRepository } from '../repositories/inMemory/inMemoryAppointments'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { CreateAppointment } from './createAppointments'

describe('Create Appointment', () => {
  it('Should be able to create an appointment', () => {
    const startsAt = getFutureDate('2023-03-05')
    const endsAt = getFutureDate('2023-03-06')

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(
      appointmentRepository
    )

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('Should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2023-03-05')
    const endsAt = getFutureDate('2023-03-06')

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(
      appointmentRepository
    )
    
    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-06-11'),
      endsAt: getFutureDate('2023-06-14')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-06-12'),
      endsAt: getFutureDate('2023-06-13')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-06-06'),
      endsAt: getFutureDate('2023-06-17')
    })).rejects.toBeInstanceOf(Error)
  })
})