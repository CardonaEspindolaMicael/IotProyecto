import { z } from "zod";

export const registrarSuscripcionSchema = z.object({
  nombre_plan: z.string().min(1, "El nombre del plan es requerido"),
  limite_edificios: z.number().optional(),
  limite_usuarios: z.number().optional(),
  descripcion: z.string().optional()
});

export const actualizarSuscripcionSchema = z.object({
  nombre_plan: z.string().min(1, "El nombre del plan es requerido").optional(),
  limite_edificios: z.number().optional(),
  limite_usuarios: z.number().optional(),
  descripcion: z.string().optional()
}); 