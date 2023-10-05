import queryString from 'query-string';
import { ScheduleInterface, ScheduleGetQueryInterface } from 'interfaces/schedule';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSchedules = async (
  query?: ScheduleGetQueryInterface,
): Promise<PaginatedInterface<ScheduleInterface>> => {
  return fetcher('/api/schedules', {}, query);
};

export const createSchedule = async (schedule: ScheduleInterface) => {
  return fetcher('/api/schedules', { method: 'POST', body: JSON.stringify(schedule) });
};

export const updateScheduleById = async (id: string, schedule: ScheduleInterface) => {
  return fetcher(`/api/schedules/${id}`, { method: 'PUT', body: JSON.stringify(schedule) });
};

export const getScheduleById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteScheduleById = async (id: string) => {
  return fetcher(`/api/schedules/${id}`, { method: 'DELETE' });
};
