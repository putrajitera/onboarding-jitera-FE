import axios from 'axios';

export default async (payload: any) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/user/register',
      {
        ...payload,
      }
    );
    return data.message;
  } catch (error: any) {
    throw error;
  }
}