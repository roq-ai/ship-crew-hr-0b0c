import { ShipInterface } from 'interfaces/ship';
import { GetQueryInterface } from 'interfaces';

export interface ScheduleInterface {
  id?: string;
  ship_id: string;
  departure_date: any;
  arrival_date: any;
  departure_location: string;
  arrival_location: string;
  created_at?: any;
  updated_at?: any;

  ship?: ShipInterface;
  _count?: {};
}

export interface ScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  ship_id?: string;
  departure_location?: string;
  arrival_location?: string;
}
