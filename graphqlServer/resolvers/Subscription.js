const Subscription = {
  group: {
    async subscribe(parent, { groupId }, { prisma }, info) {
      return prisma.subscription.group({
        where: {
          node: {
            id: groupId
          }
        }
      }, info);
    }
  },
  card: {
    async subscribe(parent, { group }, { prisma }, info) {
      return await prisma.subscription.card({
        where: {
          node: {
            group: {
              group
            }
          }
        }
      }, info);
    }
  }
}

module.exports = Subscription;