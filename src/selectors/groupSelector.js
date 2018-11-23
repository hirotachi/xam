export default (groups, id) => {
  return groups.find(group => group._id === id);
}