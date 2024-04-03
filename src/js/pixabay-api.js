import axios from 'axios';

export async function getPictures(keywordForSearch, currentPage, perPage) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/';
  const searchParams = new URLSearchParams({
    key: '43016560-45bd583880e427992fd0250d3',
    q: keywordForSearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  });
  const url = `${BASE_URL}${END_POINT}?${searchParams}`;
  const response = await axios.get(url);
  return response.data;
}

// One more example how we can create the same in another way with Axios
/*const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  headers: { api_key: '43016560-45bd583880e427992fd0250d3' },
  params: {
    q: keywordForSearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export async function getPictures2(keywordForSearch) {
  const response = await axiosInstance.get('', { params, headers });
  return response.data;
}
*/
