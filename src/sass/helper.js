let page = 1;

export async function getImage(q) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '40549502-97aa08790f8d4fa33a7c950db';
    const params = new URLSearchParams({
      key: API_KEY,
      q: q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 150,
  
    });
   const resp =  await fetch(`${BASE_URL}?${params}&page=${page}`)
  
      if (!resp.ok) {
          throw new Error(resp.statusText);
      }
  
    return resp.json();
    }