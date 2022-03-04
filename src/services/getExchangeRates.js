const getExchangeRates = async () => {
  const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiResponseJson = await apiResponse.json();
  return apiResponseJson;
};

export default getExchangeRates;
