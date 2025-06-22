import { registrarClienteSchema, actualizarClienteSchema } from "./dto/cliente.dto.js";
import {
  obtenerClientesModel,
  getClienteByIdModel,
  crearClienteModel,
  actualizarClienteModel,
  eliminarClienteModel,
} from "./cliente.models.js";

export const getClientes = async (req, res) => {
  try {
    const response = await obtenerClientesModel();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getClienteByIdModel(id);
    if (!response) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

export const postCliente = async (req, res) => {
  try {
    const datos = registrarClienteSchema.parse(req.body);
    const nuevoCliente = await crearClienteModel(datos);
    res.status(201).json({ 
      message: "Cliente registrado con éxito!", 
      cliente: nuevoCliente 
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: "Datos inválidos", detalles: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = actualizarClienteSchema.parse(req.body);
    
    const clienteActualizado = await actualizarClienteModel(id, datos);
    res.status(200).json({ 
      message: "Cliente actualizado con éxito!", 
      cliente: clienteActualizado 
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: "Datos inválidos", detalles: error.errors });
    }
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarClienteModel(id);
    res.status(200).json({ message: "Cliente eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
}; 