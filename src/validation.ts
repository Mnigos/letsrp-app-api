export const requireObjectLength = (
  obj: any,
  keys: string[],
  expectedlength: number[]
): boolean => {
  let bool = true;
  try {
    keys.forEach((key, i) => {
      if (obj[key].length < expectedlength[i] || !obj[key]) bool = false;
    });
  } catch (e) {
    console.log(e);
  }
  return bool;
};

export const checkingObjectRegexp = (
  obj: any,
  keys: string[],
  expectedRegexp: RegExp[]
): boolean => {
  let bool = true;
  try {
    keys.forEach((key, i) => {
      if (!expectedRegexp[i].test(obj[key] || !obj[key])) bool = false;
    });
  } catch (e) {
    console.log(e);
  }
  return bool;
};

export const requireObjectKeysType = (
  obj: any,
  keys: string[],
  expectedType: string
): boolean => keys.every(key => typeof obj[key] === expectedType);
