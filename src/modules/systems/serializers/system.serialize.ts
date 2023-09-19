import { ISystem } from '../interfaces/system.interface';
import { System } from '../entities/system.entity';

export const serializeSystems = (item: ISystem): Partial<System> => {
  return {
    country: item.country,
    origin: item.origin,
    system: item.system,
    status: item.status,
    url: item.url,
    date: item.date_recorded,
  };
};
