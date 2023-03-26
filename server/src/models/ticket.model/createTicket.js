const { Ticket, Intervention, sequelize } = require("../../services/sequelize");

async function createTicket(ticket, intervention) {
  try {
    const result = await sequelize.transaction(async (t) => {
      Object.assign(ticket, { ref: await _getLastTicketRef() });
      const newTicket = await Ticket.create(ticket, { transaction: t });
      Object.assign(intervention, { ticketId: newTicket.id });
      const newIntervention = await Intervention.create(intervention, {
        transaction: t,
      });
      return result;
    });
  } catch (err) {
    console.log(err);
  }
}

async function _getLastTicketRef() {
  const tickets = await Ticket.findAll({ order: [["id", "DESC"]] });
  return parseInt(tickets[0].ref) + 1 || 1000;
}

module.exports = createTicket;
