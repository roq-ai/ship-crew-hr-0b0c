import { UserInterface } from 'interfaces/user';
import { ShipInterface } from 'interfaces/ship';
import { GetQueryInterface } from 'interfaces';

export interface CrewMemberInterface {
  id?: string;
  user_id: string;
  ship_id: string;
  position: string;
  start_date: any;
  end_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  ship?: ShipInterface;
  _count?: {};
}

export interface CrewMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  ship_id?: string;
  position?: string;
}
