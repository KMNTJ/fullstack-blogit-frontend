export const sortByProperty = (array, property) => {
  return array.sort((a, b) => {
    const likesA = a[property]
    const likesB = b[property]
    if (likesA < likesB) return 1
    if (likesA > likesB) return -1
    return 0
  })
}
