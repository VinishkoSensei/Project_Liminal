export const handleChange = (item, setItem) => (event) => {
  const { name, value } = event.target;
  setItem({ ...item, [name]: value });
};

export const handleChangeWithFunction = (item, setItem, func) => (event) => {
  const { name, value } = event.target;
  setItem({ ...item, [name]: value });
  func(name, value);
};

export const handleChangeSingle = (setItem) => (event) => {
  setItem(event.target.value);
};
