export const setUrlParams = (searchUrl, paramName, valueOfParam) => {
  const queryParams = searchUrl.split("&");
  let paramUpdated = false;
  for (let i = 0; i < queryParams.length; i++) {
    const param = queryParams[i].split("=");
    if (param[0] === paramName) {
      param[1] = valueOfParam;
      queryParams[i] = param.join("=");
      paramUpdated = true;
      break;
    }
  }
  if (!paramUpdated) {
    queryParams.push(`${paramName}=${valueOfParam}`); // replace
  }
  const abc = [...new Set(queryParams)];

  const finalUrl = abc.join("&");
  return finalUrl;
};
