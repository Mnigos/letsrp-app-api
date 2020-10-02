export const requireObjectLength = (
  obj: any,
  keys: string[],
  expectedlength: number[],
) => {
  let bool = true;
  keys.forEach((key, i ) => {
    if (obj[key].length < expectedlength[i] || !obj[key]) bool = false;
  });
  return bool;
}

export const checkingObjectRegexp = (
  obj: any,
  keys: string[],
  expectedRegexp: RegExp[]
) => {
  let bool = true;
  keys.forEach((key, i) => {
    if (!expectedRegexp[i].test(obj[key] || !obj[key])) bool = false;
  });
  return bool;
}

export const requireObjectKeysType = (
  obj: any,
  keys: string[],
  expectedType: string = 'string'
) => keys.every(key => typeof obj[key] === expectedType);
