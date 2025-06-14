const API_URL = 'https://flex-backend2-production.up.railway.app';

export const getClaimsForDriver = async (driverId: number) => {
  const response = await fetch(`${API_URL}/claims?driver_id=${driverId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch claims');
  }
  return response.json();
};
export const getAvailableBlocks = async () => {
  const response = await fetch(`${API_URL}/blocks`);
  if (!response.ok) {
    throw new Error('Failed to fetch blocks');
  }
  return response.json();
};

export const claimBlock = async (block_id: number, driver_id: number) => {
  const response = await fetch(`${API_URL}/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ block_id, driver_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to claim block');
  }

  return response.json();
};
