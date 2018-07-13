export default errors =>
  errors.reduce((accum, currentVal) => {
    if (currentVal.path in accum) {
      accum[currentVal.path].push(currentVal.message);
    } else {
      accum[currentVal.path] = [currentVal.message];
    }

    return accum;
  }, {});
