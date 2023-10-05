import queryString from 'query-string';
import { ShipInterface, ShipGetQueryInterface } from 'interfaces/ship';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getShips = async (query?: ShipGetQueryInterface): Promise<PaginatedInterface<ShipInterface>> => {
  return fetcher('/api/ships', {}, query);
};

export const createShip = async (ship: ShipInterface) => {
  return fetcher('/api/ships', { method: 'POST', body: JSON.stringify(ship) });
};

export const updateShipById = async (id: string, ship: ShipInterface) => {
  return fetcher(`/api/ships/${id}`, { method: 'PUT', body: JSON.stringify(ship) });
};

export const getShipById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/ships/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteShipById = async (id: string) => {
  return fetcher(`/api/ships/${id}`, { method: 'DELETE' });
};
