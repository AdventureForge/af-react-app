/* eslint-disable no-useless-escape */
export const urlValidationPattern =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const isbnValidationPattern =
  /^(?:ISBN(?:-13)?:?\ )?(?=\d{13}$|(?=(?:\d+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?\d{1,5}[-\ ]?\d+[-\ ]?\d+[-\ ]?\d$/;
