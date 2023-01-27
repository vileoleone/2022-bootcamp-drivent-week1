import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function getTicketByType() {
  return prisma.ticketType.findMany();
}

async function getAllTickets(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id
      }
    },
    include: {
      TicketType: true
    }
  });
}

async function createATicket(NewTicketToCreate: TicketToCreate) {
  const { ticketTypeId, enrollmentId } = NewTicketToCreate;
  
  return prisma.ticket.create({
    data: {
      TicketType: {
        connect: { id: ticketTypeId },
      },
      Enrollment: {
        connect: { id: enrollmentId },
      },
      status: TicketStatus.RESERVED
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getTicketByType,
  getAllTickets,
  createATicket
};

export type TicketToCreate = {
  ticketTypeId: number;
  enrollmentId: number;
};
export default ticketRepository;
