export const requireObjectLength = (
  obj: any,
  keys: string[],
  expectedlength: number[]
): boolean => {
  let bool = true;
  try {
    keys.forEach((key, i) => {
      if (!obj[key] || obj[key].length < expectedlength[i]) bool = false;
    });
  } catch (e) {
    console.log('error', e);
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
      if (!obj[key] || !expectedRegexp[i].test(obj[key])) bool = false;
    });
  } catch (e) {
    console.log('error', e);
  }
  return bool;
};

export const requireObjectKeysType = (
  obj: any,
  keys: string[],
  expectedType: string = 'string'
): boolean => keys.every(key => typeof obj[key] === expectedType);
