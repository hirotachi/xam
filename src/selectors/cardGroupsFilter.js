export default (groups, {sortBy, search}) => {
  return groups.filter(group => {
    const textMatch = group.title.toLowerCase().includes(search.toLowerCase());
    return textMatch
  }).sort((a, b) => {
    if(sortBy === "date"){
      return a.createdAt < b.createdAt ? 1 : -1;
    }else if(sortBy === "name"){
      return a.title[0] < b.title[0] ? -1 : 1;
    }
  });

}