export interface SideNavItem{
  tittle: string;
  link: string;
  icon: string;
}

export interface Clientes{
  id: number,
  nombres: string,
  apellidos: string,
  celular: number,
  servicio: string
  direccion: string
}

export interface CreateCliente{
  nombres: string,
  apellidos: string,
  correo: string,
  celular: number,
  inss: string,
  cedula: string,
  direccion: string,
  idPlan: number
}

export interface EditCliente{
  nombres: string,
  apellidos: string,
  correo: string,
  celular: number,
  direccion: string,
  idServicio: number
}

export interface User{
  nombreUsuario: string,
  contrasenia: string
}

export interface Planes{
  id: number,
  categoria: string,
  descripcion: string,
  nombre: string,
  precio: number,
  avialable: boolean
}

export interface Servicio{
  id: number,
  categoria: string,
  nombre: string,
  descripcion: string,
  precio: number
}

export interface updateServiceUser{
  id: number,
  nombre: string
}

export interface carouselImages{
  id: number,
  title?: {
    first: string,
    second:string
  },
  subtitle?: string,
  link?: string,
  image: string,
  order?: number,
  marginLeft: number
}

export interface categoriaServicios{
  id: number,
  nombre: string
}

export interface CrearPlan{
  nombre: string,
  descripcion: string,
  precio: number,
  idServicio: number
}

export interface EditarPlan{
  nombre: string,
  descripcion: string,
  precio: number,
}

export interface VerPagosClientes{
  id: number,
  cliente: string,
  monto: number,
  mes: string,
  idServicio: number,
  servicio: string
}

export interface Usuarios{
  id: number,
  cliente: string
}

export interface AgregarPago{
  total: number,
  mes: string,
  idClienteServicio: number
}

export interface MesesPagos{
  mes: string,
  fechaPago: Date
}

export interface HistorialPagosClientes{
  cliente: string,
  plan: string,
  pagos: MesesPagos[]
}
