import { IAllSystem } from '../interfaces/all-system.interface';
import { AllSystem } from '../entities/all-system.entity';

export const serializeAllSystems = (item: IAllSystem): Partial<AllSystem> => {
  return {
    ...item,
    destroyed: parseInt(item.destroyed),
    captured: parseInt(item.captured),
    abandoned: parseInt(item.abandoned),
    damaged: parseInt(item.damaged),
    total: parseInt(item.total),
  };
};
