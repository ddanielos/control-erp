import axios from 'axios';

export const getInstanceState = async () => {
  const response = await axios.get('https://a7oe0km689.execute-api.us-east-2.amazonaws.com/default/StatusERP');
  return response.data.state;
};

export const startInstance = async () => {
  const response = await axios.post('https://xu7alw3v53.execute-api.us-east-2.amazonaws.com/default/StartERP');
  return response.data;
};

export const stopInstance = async () => {
  const response = await axios.post('https://hcok7hlva3.execute-api.us-east-2.amazonaws.com/default/StopERP');
  return response.data;
};