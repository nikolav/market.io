
export default function sortItemsByDateDesc (itemList) {
    
    return itemList.slice(0).sort(sort_);
}
function sort_ (a, b) {
    return parseInt(b.createdAt, 10) - parseInt(a.createdAt, 10);
}
