
const Query = {
  async users(parent, { query }, { prisma }, info) {
    if (!!query) {
      return await prisma.query.users({
        where: {
          OR: [
            { username_contains: query },
            { email_contains: query }
          ]
        }
      }, info)
    }
    return await prisma.query.users(null, info);
  },
  async groups(parent, { query }, { prisma }, info) {
    if (!!query) {
      return await prisma.query.groups({
        where: {
          OR: [{ name_contains: query }]
        }
      }, info)
    }
    return await prisma.query.groups(null, info);
  },
  async cards(parent, { query }, { prisma }, info) {
    if (!!query) {
      return await prisma.query.cards({
        where: {
          OR: [
            { question_contains: query },
            { answer_contains: query }
          ]
        }
      }, info)
    }
    return await prisma.query.cards(null, info);
  }
};

module.exports = Query;