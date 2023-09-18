import { IEquipment } from '../interfaces/equipment.interface';
import { Equipment } from '../equipment.entity';

export const serializeEquipments = (item: IEquipment): Partial<Equipment> => {
  return {
    country: item.country,
    type: item.equipment_type,
    destroyed: parseInt(item.destroyed),
    abandoned: parseInt(item.abandoned),
    captured: parseInt(item.captured),
    damaged: parseInt(item.damaged),
    total: parseInt(item.type_total),
    date: item.date_recorded,
  };
};
