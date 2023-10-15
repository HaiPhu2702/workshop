export const isEmpty = (val) => {
    if (val === undefined) return true
    if (val === null) return true
    if (val === "") return true
    return false
}
