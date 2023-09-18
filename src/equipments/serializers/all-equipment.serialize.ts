import { IAllEquipment } from '../interfaces/all-equipment.interface';
import { AllEquipment } from '../all-equipment.entity';

export const serializeAllEquipments = (
  item: IAllEquipment,
): Partial<AllEquipment> => {
  return {
    country: item.country,
    type: item.equipment_type,
    destroyed: parseInt(item.destroyed),
    abandoned: parseInt(item.abandoned),
    captured: parseInt(item.captured),
    damaged: parseInt(item.damaged),
    total: parseInt(item.type_total),
  };
};
