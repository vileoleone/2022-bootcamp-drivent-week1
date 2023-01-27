import { notFoundError } from "@/errors";
import { BadRequest } from "@/errors/bad-request";
import ticketRepository from "@/repositories/tickets-repositories";
import { TicketType, Ticket } from "@prisma/client";

async function getTypeTicket(): Promise<TicketType[]> {
  const result = await ticketRepository.getTicketByType();
  if (!result) {
    return [];
  }
  return result;
}

async function getAllTicketsService(id: number) {
  const result = await ticketRepository.getAllTickets(id);

  if (!result) {
    throw notFoundError();
  }
  return result;
}

type ticketBody = {
  ticketTypeId: number,
  userId: number
};

async function createTicketService(body: ticketBody) {
  if (!body.ticketTypeId) {
    throw BadRequest();
  }
  const result = await ticketRepository.createATicket(body.ticketTypeId, body.userId);
  return result;
}

const ticketService = {
  getTypeTicket,
  getAllTicketsService,
  createTicketService
};

export default ticketService;
