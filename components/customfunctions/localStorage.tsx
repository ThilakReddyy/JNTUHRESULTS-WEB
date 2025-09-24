export const saveToLocalStorage = async (key: string, value: string) => {
  localStorage.clear();
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data != null) {
    return JSON.parse(data);
  }
  return null;
};
