export function getPictures(keywordForSearch) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/';
  const searchParams = new URLSearchParams({
    key: '43016560-45bd583880e427992fd0250d3',
    q: keywordForSearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
