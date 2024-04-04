import axios from 'axios';

const API_KEY = 'pqUyI5Dr2L-D2fhLsKELC0f9krR9Rr3ulFoaCDIAWv4';
const API_URL = 'https://api.unsplash.com/';

async function fetchPhotos() {
    try {
        const response = await axios.get(`${API_URL}photos/random`, {
            params: {
                count: 100, // количество изображений
                w: 400,    // желаемая ширина
                h: 400     // желаемая высота
            },
            headers: {
                Authorization: `Client-ID ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching random photos:', error);
        return [];
    }
}

export default fetchPhotos;
