const checkObjectEmpty = (object) => {
  let length = Object.keys(object).length;

  return length > 0 ? false : true;
};

export { checkObjectEmpty };
