const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    const { username, email } = data;
    const usernameExists = await prisma.exists.User({ username });
    const emailExists = await prisma.exists.User({ email });

    if (usernameExists) { throw new Error("Username is already in use") }
    if (emailExists) { throw new Error("Email is already in use") }
    return await prisma.mutation.createUser({ data }, info);
  },
  async updateUser(parent, { id, data }, { prisma }, info) {
    const userExists = await prisma.exists.User({ id });
    if (!userExists) { throw new Error("User doesn't exist") };

    return await prisma.mutation.updateUser({ where: { id }, data }, info);
  },
  async deleteUser(parent, { id }, { prisma }, info) {
    const userExists = await prisma.exists.User({ id });
    if (!userExists) { throw new Error("User doesn't exist") }

    return await prisma.mutation.deleteUser({ where: { id } }, info);
  },
  async createGroup(parent, { data }, { prisma }, info) {
    const { owner, name, color } = data;
    const userExists = await prisma.exists.User({ id: owner });
    if (!userExists) { throw new Error("User doesn't Exists") }

    return await prisma.mutation.createGroup({
      data: {
        name,
        color,
        owner: {
          connect: {
            id: owner
          }
        }
      }
    }, info)
  },
  async updateGroup(parent, { id, data }, { prisma }, info) {
    const groupExists = await prisma.exists.Group({ id });
    if (!groupExists) { throw new Error("Group doesn't exist") }

    return await prisma.mutation.updateGroup({ where: { id }, data }, info);
  },
  async deleteGroup(parent, { id }, { prisma }, info) {
    const groupExists = await prisma.exists.Group({ id });
    if (!groupExists) { throw new Error("Group doesn't exist") }

    return await prisma.mutation.deleteGroup({ where: { id } }, info);
  },
  async createCard(parent, { data }, { prisma }, info) {
    const { group, question, answer } = data;
    const groupExists = await prisma.exists.Group({ id: group });
    if (!groupExists) { throw new Error("Group doesn't exist") }

    return await prisma.mutation.createCard({
      data: {
        question,
        answer,
        group: {
          connect: { id: group }
        }
      }
    }, info);
  },
  async updateCard(parent, { id, data }, { prisma }, info) {
    const cardExists = await prisma.exists.Card({ id });
    if (!cardExists) { throw new Error("Card doesn't exist") }

    return await prisma.mutation.updateCard({ where: { id }, data }, info);
  },
  async deleteCard(parent, { id }, { prisma }, info) {
    const cardExists = await prisma.exists.Card({ id });
    if (!cardExists) { throw new Error("Card doesn't exist") }

    return await prisma.mutation.deleteCard({ where: { id } }, info);
  }
};
module.exports = Mutation;