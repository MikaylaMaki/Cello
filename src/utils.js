
//source: https://stackoverflow.com/a/7180095
export const arrayMove = (array, from, to) => {
    array.splice(to, 0, array.splice(from, 1)[0]);
  };
  
//Source: https://stackoverflow.com/a/16436975
export const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  