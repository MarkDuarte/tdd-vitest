import { Appointment } from "../entities/appointments"
import { AppointmentsRepository } from "../repositories/appointmentsRepository"

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor(
    private appointmentRepository: AppointmentsRepository
  ) {}

  async execute({ 
    customer, 
    startsAt, 
    endsAt 
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointmrnt = await this.appointmentRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )

    if (overlappingAppointmrnt) {
      throw new Error('Another appointment overlaps this appointment dates')
    }

    const appointment = new Appointment(
      customer,
      startsAt,
      endsAt
    )

    await this.appointmentRepository.create(appointment)

    return appointment
  }
}