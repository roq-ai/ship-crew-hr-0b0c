import queryString from 'query-string';
import { CrewMemberInterface, CrewMemberGetQueryInterface } from 'interfaces/crew-member';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCrewMembers = async (
  query?: CrewMemberGetQueryInterface,
): Promise<PaginatedInterface<CrewMemberInterface>> => {
  return fetcher('/api/crew-members', {}, query);
};

export const createCrewMember = async (crewMember: CrewMemberInterface) => {
  return fetcher('/api/crew-members', { method: 'POST', body: JSON.stringify(crewMember) });
};

export const updateCrewMemberById = async (id: string, crewMember: CrewMemberInterface) => {
  return fetcher(`/api/crew-members/${id}`, { method: 'PUT', body: JSON.stringify(crewMember) });
};

export const getCrewMemberById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/crew-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCrewMemberById = async (id: string) => {
  return fetcher(`/api/crew-members/${id}`, { method: 'DELETE' });
};
