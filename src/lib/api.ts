import { CONFIG } from '../config';

type Provider = 'gifted' | 'nexoracle';

export async function callAPI(
  endpoint: string, 
  params: Record<string, string | number> = {}, 
  provider: Provider = 'gifted'
) {
  const baseUrl = provider === 'gifted' ? CONFIG.GIFTED_BASE_URL : CONFIG.NEXORACLE_BASE_URL;
  const apiKey = provider === 'gifted' ? CONFIG.GIFTED_API_KEY : CONFIG.NEXORACLE_API_KEY;
  
  const url = new URL(`${baseUrl}${endpoint}`);
  url.searchParams.append('apikey', apiKey);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    
    // Check for common error flags in various APIs
    if (data.status === false || data.success === false) {
      throw new Error(data.message || 'An error occurred on the API');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${provider}):`, error);
    throw error;
  }
}