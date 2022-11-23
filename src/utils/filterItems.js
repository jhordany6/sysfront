export const filterItems = (items, query) => {
  if (!query) return items;

  return items.filter(item => Object.values(item).some(value =>
    value.toString().toLowerCase().includes(query.toLowerCase()))
  );
};