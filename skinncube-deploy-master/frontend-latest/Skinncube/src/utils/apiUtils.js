// Clean and Simple API Utility Functions
// Uses standard NODE_ENV for environment detection

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Get domain with fallback
const getDomain = () => {
  // In development, always use localhost:8000 regardless of REACT_APP_DOMAIN
  if (isDevelopment) {
    return 'localhost:8000';
  }
  // In production, use REACT_APP_DOMAIN or fallback to skinncube.com
  return process.env.REACT_APP_DOMAIN || 'skinncube.com';
};

/**
 * Constructs the proper API URL for the given endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/api/v1/category/get-all-category')
 * @returns {string} - The complete URL for the API call
 */
export const getApiUrl = (endpoint = '') => {
  const domain = getDomain();
  const protocol = isDevelopment ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  console.log('API URL constructed:', {
    endpoint,
    domain,
    protocol,
    isDevelopment,
    baseUrl,
    fullUrl: `${baseUrl}${endpoint}`,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_DOMAIN: process.env.REACT_APP_DOMAIN
    }
  });

  return `${baseUrl}${endpoint}`;
};

/**
 * Gets the base API URL without any endpoint
 * @returns {string} - The base URL for API calls
 */
export const getBaseApiUrl = () => {
  const domain = getDomain();
  const protocol = isDevelopment ? 'http' : 'https';
  return `${protocol}://${domain}`;
};

/**
 * Constructs the proper URL for static assets (images, etc.)
 * @param {string} assetPath - The path to the asset (e.g., 'public/temp/image.jpg')
 * @returns {string} - The complete URL for the asset
 */
export const getAssetUrl = (assetPath) => {
  if (!assetPath) return '';

  const domain = getDomain();
  const protocol = isDevelopment ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  return `${baseUrl}/${assetPath}`;
};

/**
 * Get current environment info
 * @returns {object} - Environment information
 */
export const getEnvironmentInfo = () => {
  const domain = getDomain();
  const protocol = isDevelopment ? 'http' : 'https';

  return {
    isDevelopment,
    isProduction,
    nodeEnv: process.env.NODE_ENV,
    reactAppDomain: process.env.REACT_APP_DOMAIN,
    domain,
    protocol,
    apiBaseUrl: `${protocol}://${domain}`
  };
};

export default { getApiUrl, getAssetUrl, getEnvironmentInfo };
