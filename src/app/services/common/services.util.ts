const API = 'https://www.balldontlie.io/api/v1';

function toJsonResponse<T>(response: Response): Promise<T> {
  return Promise.all([response.ok, response.json()])
    .then(([ok, data]) => {
      if (ok) {
        return data as T;
      }
      throw Error(data.error);
    })
    .catch(e => handleError(e));
}

const toBlobResponse = (response: Response): Promise<Blob> => {
  return Promise.all([response.ok, response.blob()])
    .then(([ok, data]) => {
      if (ok) {
        return data;
      }
      throw Error('Failed to retrieve blob');
    })
    .catch(e => handleError(e));
};

const handleError = (errorMessage: string) => {
  console.warn('Failed to fetch data', errorMessage);
  throw new Error('Something went wrong');
};

export const ServicesUtil = {
  API,
  toJsonResponse,
  toBlobResponse
};
