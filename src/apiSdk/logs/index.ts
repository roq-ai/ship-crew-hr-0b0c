import queryString from 'query-string';
import { LogInterface, LogGetQueryInterface } from 'interfaces/log';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLogs = async (query?: LogGetQueryInterface): Promise<PaginatedInterface<LogInterface>> => {
  return fetcher('/api/logs', {}, query);
};

export const createLog = async (log: LogInterface) => {
  return fetcher('/api/logs', { method: 'POST', body: JSON.stringify(log) });
};

export const updateLogById = async (id: string, log: LogInterface) => {
  return fetcher(`/api/logs/${id}`, { method: 'PUT', body: JSON.stringify(log) });
};

export const getLogById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteLogById = async (id: string) => {
  return fetcher(`/api/logs/${id}`, { method: 'DELETE' });
};
