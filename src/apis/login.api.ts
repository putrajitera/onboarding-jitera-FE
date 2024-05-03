import axios from 'axios';

export default async (payload: any) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/user/login',
      {
        ...payload,
      }, {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}