export default function sortItemsByDateDesc(itemList) {
  itemList = itemList.slice();
  return 1 < itemList.length ? itemList.sort(sort_) : itemList;
}
function sort_(a, b) {
  return parseInt(b.createdAt, 10) - parseInt(a.createdAt, 10);
}
