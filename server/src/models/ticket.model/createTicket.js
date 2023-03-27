const { Ticket, Intervention, sequelize } = require("../../services/sequelize");

async function createTicket(ticket, intervention, userId) {
  try {
    const result = await sequelize.transaction(async (t) => {
      Object.assign(ticket, { ref: await _getLastTicketRef() });
      Object.assign(intervention, {
        date: new Date(),
        conseillerId: userId,
      });

      const newTicket = await Ticket.create(
        ticket,
        {
          transaction: t,
        },
        { raw: true }
      );
      Object.assign(intervention, { ticketId: result.id });
      await Intervention.create(
        intervention,
        { transaction: t },
        { raw: true }
      );
      console.log("result", result);
      return newTicket;
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
