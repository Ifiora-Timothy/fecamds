export const isUserAuth = () => {
  try {
    const val = getFromLocalStorage("fecamdsite");

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export const addToLocalStrorage = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  if (!key || !value) {
    throw new Error("key and values must be present");
  }

  localStorage.setItem(key, value);
};
export const getFromLocalStorage = (key: string): string => {
  if (!key) {
    throw new Error("please set the key ");
  }
  const value = localStorage.getItem(key);
  if (!value) {
    throw new Error("please log in");
  }
  return value;
};
