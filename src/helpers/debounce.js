  // const handleCheckNitDebounced = useCallback(
  //   debounce((value) => {
  //     if(!value){
  //       console.log("NIT:", value); // Aquí puedes hacer una llamada a la API si lo necesitas
  //       dispatch(fetchValidaNIT(value));
  //     }
  //   }, 700),
  //   []
  // );


export const debounce = (func, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  