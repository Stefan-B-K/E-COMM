
export const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg
  } catch {
    return ''
  }
}