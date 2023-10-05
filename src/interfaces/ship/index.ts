import { CrewMemberInterface } from 'interfaces/crew-member';
import { ScheduleInterface } from 'interfaces/schedule';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ShipInterface {
  id?: string;
  name: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  crew_member?: CrewMemberInterface[];
  schedule?: ScheduleInterface[];
  company?: CompanyInterface;
  _count?: {
    crew_member?: number;
    schedule?: number;
  };
}

export interface ShipGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
}
