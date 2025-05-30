const formatJson = (arrayObj) => {
    const json = JSON.stringify(arrayObj, null, 2);
    return json;
  };
  
  export default formatJson;