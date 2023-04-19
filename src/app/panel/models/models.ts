export interface SideNavItem{
  tittle: string;
  link: string;
}

export interface Clientes{
  id: number,
  nombres: string,
  apellidos: string,
  correo: string,
  celular: number,
  inss: string,
  cedula: string,
  fechaNacimiento: Date,
  direccion: string
}

export interface CreateCliente{
  nombres: string,
  apellidos: string,
  correo: string,
  celular: number,
  inss: string,
  cedula: string,
  fechaNacimiento: Date,
  direccion: string
}

export interface EditCliente{
  nombres: string,
  apellidos: string,
  correo: string,
  celular: number,
  direccion: string
}

export interface User{
  nombreUsuario: string,
  contrasenia: string
}

export interface Planes{
  categoria: string,
  descripcion: string,
  nombre: string,
  precio: number
}

export interface Servicio{
  categoria: string,
  nombre: string,
  descripcion: string,
  precio: number
}