import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const CLIENT_ID = 'AO_bocnXiub9X5LTcIGZ44x0_b_cAAE2ccocCdfW534';


interface Image {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  
}

interface FetchImagesResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export const fetchImages = async (query: string, page: number): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>(API_URL, {
    params: {
      client_id: CLIENT_ID,
      query,
      page,
      per_page: 9,
    },
  });

  return response.data;
};