import axios from 'axios';

export default async (payload: any) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/user/reset-password',
      {
        ...payload,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}