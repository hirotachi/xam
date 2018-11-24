export default (groups, id) => {
  if (groups.length > 0) {
    return groups.find(group => group._id === id);
  } else {
    return false
  }
}