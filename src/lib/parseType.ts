type BaseType = string | number | boolean;

export const toBoolean = (name: string, value: BaseType) => {
  if (value === 'true' || value === 'TRUE') {
    return true;
  }
  if (value === 'false' || value === 'FALSE') {
    return false;
  }
  throw new Error(
    `Env variable for name: ${name} is not boolean, value: ${value}`
  );
};

export const toInteger = (name: string, value: BaseType) => {
  if (typeof value === 'number') {
    // no need to set default value since we got it from the current value
    return value;
  }
  if (typeof value === 'boolean') {
    throw new Error(`Env variable for name: ${name} is not an integer`);
  }
  const val = parseInt(value, 10);
  if (isNaN(val)) {
    throw new Error(`Env variable for name: ${name} is not an integer`);
  }
  return value as unknown as number;
};

export const toString = (name: string, value: BaseType) => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }

  throw new Error(
    `Env variable for name: ${name} is not a string, value: ${value}`
  );
};

export const toJSON = (name: string, value: BaseType) => {
  if (typeof value !== 'string') {
    throw new Error(
      `Env variable for name: ${name} is not a valid JSON, value: ${value}`
    );
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    throw new Error(
      `Env variable for name: ${name} is not a valid JSON, value: ${value}`
    );
  }
};
