import { Router } from "express";
import { 
  getClientes, 
  getClienteById, 
  postCliente, 
  actualizarCliente, 
  eliminarCliente 
} from "./cliente.controllers.js";
import { checkAuth } from "../../middlewares/auth.js";

const routerCliente = Router();

// CRUD routes for Cliente
routerCliente.get('/', [checkAuth], getClientes);
routerCliente.post('/', postCliente);
routerCliente.get('/:id', [checkAuth], getClienteById);
routerCliente.put('/:id', [checkAuth], actualizarCliente);
routerCliente.delete('/:id', [checkAuth], eliminarCliente);

export default routerCliente; 