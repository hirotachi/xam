export default (groups, id) => {
  return groups.find(group => group.id === id);
}