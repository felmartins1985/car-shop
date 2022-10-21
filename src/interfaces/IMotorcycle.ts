import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).int({ message: 'Must be a integer' })
    .positive({ message: 'Must be a positiver number' })
    .lte(2500, { message: 'engineCapacity must be less or equal to 2500' }),
});
type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;
export { MotorcycleZodSchema, IMotorcycle };