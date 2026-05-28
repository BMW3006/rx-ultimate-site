import { CONFIG } from '../config';

export async function apiFetch(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${CONFIG.BASE_URL}${endpoint}`);
  url.searchParams.append('apikey', CONFIG.API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}