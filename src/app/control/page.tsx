'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MdSettings, MdAnnouncement, MdNotifications, MdAnalytics, MdRoute } from 'react-icons/md'

interface Tren {
  id: string
  modelo: string
  estado: string
  ubicacion: string
  capacidad: number
  velocidadMaxima: number
  linea: { nombre: string }
  metricas: Array<{ velocidadPromedio: number; pasajerosTransportados: number }>
}

interface AlertaControl {
  id: string
  tipo: string
  mensaje: string
  prioridad: string
  fechaCreacion: string
  resuelta: boolean
}

export default function ControlPage() {
  // Static data for demo purposes
  const trenes: Tren[] = [
    { id: 'TR-001', modelo: 'Modelo A', estado: 'EnServicio', ubicacion: 'Estación Central', capacidad: 300, velocidadMaxima: 80, linea: { nombre: 'Línea 1' }, metricas: [{ velocidadPromedio: 45, pasajerosTransportados: 120 }] },
    { id: 'TR-002', modelo: 'Modelo B', estado: 'Mantenimiento', ubicacion: 'Taller Norte', capacidad: 280, velocidadMaxima: 75, linea: { nombre: 'Línea 2' }, metricas: [{ velocidadPromedio: 0, pasajerosTransportados: 0 }] },
    { id: 'TR-003', modelo: 'Modelo C', estado: 'EnServicio', ubicacion: 'Estación Sur', capacidad: 320, velocidadMaxima: 85, linea: { nombre: 'Línea 3' }, metricas: [{ velocidadPromedio: 52, pasajerosTransportados: 180 }] }
  ]

  const alertas: AlertaControl[] = [
    { id: 'A001', tipo: 'Sistema', mensaje: 'Mantenimiento programado en Línea 2', prioridad: 'Media', fechaCreacion: new Date().toISOString(), resuelta: false },
    { id: 'A002', tipo: 'Operacional', mensaje: 'Retraso menor en Estación Central', prioridad: 'Baja', fechaCreacion: new Date().toISOString(), resuelta: false }
  ]

  const [alertMessage, setAlertMessage] = useState('')

  const handleControlAction = (action: string, trenId?: string) => {
    console.log('Control action:', { action, trenId, mensaje: alertMessage })
    setAlertMessage('')
    alert(`Acción "${action}" ejecutada exitosamente`)
  }

  const resolverIncidente = (alertaId: string) => {
    console.log('Resolving incident:', alertaId)
    alert('Incidente resuelto exitosamente')
  }

  // Calculate real-time metrics from actual data
  const trenesActivos = trenes.filter(t => t.estado === 'EnServicio')
  const velocidadPromedio = trenes.length > 0 ? 
    Math.round(trenes.reduce((acc, tren) => {
      const metrica = tren.metricas?.[0]
      return acc + (metrica?.velocidadPromedio || 0)
    }, 0) / trenes.length) : 0
    
  const pasajerosTotales = trenes.reduce((acc, tren) => {
    const metrica = tren.metricas?.[0]
    return acc + (metrica?.pasajerosTransportados || 0)
  }, 0)

  const incidentesActivos = alertas.filter(a => !a.resuelta)

  const metricas = [
    { nombre: 'Trenes Activos', valor: `${trenesActivos.length}/${trenes.length}`, estado: 'Bueno' },
    { nombre: 'Pasajeros/hora', valor: `${pasajerosTotales}`, estado: 'Normal' },
    { nombre: 'Velocidad Promedio', valor: `${velocidadPromedio} km/h`, estado: 'Óptimo' },
    { nombre: 'Incidentes Activos', valor: `${incidentesActivos.length}`, estado: incidentesActivos.length > 5 ? 'Crítico' : 'Bueno' }
  ]

  const getEstadoTrenColor = (estado: string) => {
    switch (estado) {
      case 'EnServicio': return 'success'
      case 'Estacionado': return 'info'
      case 'Mantenimiento': return 'warning'
      default: return 'default'
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': return 'error'
      case 'Media': return 'warning'
      case 'Baja': return 'info'
      default: return 'default'
    }
  }

  const getMetricaColor = (estado: string) => {
    switch (estado) {
      case 'Óptimo': return 'text-green-600'
      case 'Bueno': return 'text-blue-600'
      case 'Normal': return 'text-yellow-600'
      case 'Crítico': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getOcupacionColor = (ocupacion: string) => {
    const [actual, total] = ocupacion.split('/').map(n => parseInt(n))
    const porcentaje = (actual / total) * 100
    if (porcentaje <= 60) return 'bg-green-500'
    if (porcentaje <= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control y Monitoreo</h1>
          <p className="text-gray-600 mt-2">
            Centro de control operacional del sistema de metro
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{trenesActivos.length}</p>
              <p className="text-sm text-gray-600">Trenes Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{trenes.length}</p>
              <p className="text-sm text-gray-600">Total Trenes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{pasajerosTotales}</p>
              <p className="text-sm text-gray-600">Pasajeros/hora</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{incidentesActivos.length}</p>
              <p className="text-sm text-gray-600">Incidentes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Estado de Trenes en Tiempo Real</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Tren</TableHeaderCell>
                    <TableHeaderCell>Línea</TableHeaderCell>
                    <TableHeaderCell>Ubicación</TableHeaderCell>
                    <TableHeaderCell>Velocidad</TableHeaderCell>
                    <TableHeaderCell>Ocupación</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Control</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trenes.map((tren) => {
                    const metrica = tren.metricas?.[0]
                    const ocupacion = metrica ? `${metrica.pasajerosTransportados}/${tren.capacidad}` : `0/${tren.capacidad}`
                    const velocidad = metrica ? `${metrica.velocidadPromedio} km/h` : '0 km/h'
                    
                    return (
                      <TableRow key={tren.id}>
                        <TableCell className="font-medium">{tren.modelo}</TableCell>
                        <TableCell>{tren.linea?.nombre || 'N/A'}</TableCell>
                        <TableCell>{tren.ubicacion}</TableCell>
                        <TableCell>{velocidad}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getOcupacionColor(ocupacion)}`}
                                style={{ width: `${(metrica?.pasajerosTransportados || 0) / tren.capacidad * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{ocupacion}</span>
                          </div>
<<<<<<< HEAD
                        </TableCell>
                        <TableCell>
                          <Badge variant={getEstadoTrenColor(tren.estado)} size="sm">
                            {tren.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-orange-600 flex items-center space-x-1"
                            onClick={() => handleControlAction('control_tren', tren.id)}
                          >
                            <MdSettings className="w-4 h-4" />
                            <span>Control</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
=======
                          <span className="text-sm">{tren.pasajeros}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEstadoTrenColor(tren.estado) as unknown } size="sm">
                          {tren.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          Control
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
>>>>>>> 23de2d2a7e3875becd5108be6fdf04edd7070781
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Métricas Operacionales</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metricas.map((metrica, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">{metrica.nombre}</p>
                      <Badge variant="success" size="sm">{metrica.estado}</Badge>
                    </div>
                    <p className={`text-xl font-bold ${getMetricaColor(metrica.estado)}`}>
                      {metrica.valor}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Panel de Anuncios</h3>
          </CardHeader>
<<<<<<< HEAD
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje de Anuncio General
                </label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Escriba el mensaje para anuncio general..."
                />
              </div>
              <Button 
                onClick={() => handleControlAction('anuncio')}
                disabled={!alertMessage.trim()}
                className="w-full flex items-center justify-center space-x-2"
                variant="primary"
              >
                <MdAnnouncement className="w-4 h-4" />
                <span>Enviar Anuncio General</span>
              </Button>
            </div>
=======
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Estación</TableHeaderCell>
                  <TableHeaderCell>Línea</TableHeaderCell>
                  <TableHeaderCell>Pasajeros</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Próximo Tren</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estaciones.map((estacion, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{estacion.nombre}</TableCell>
                    <TableCell>{estacion.linea}</TableCell>
                    <TableCell>{estacion.pasajeros}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoEstacionColor(estacion.estado) as unknown } size="sm">
                        {estacion.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{estacion.proximoTren}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
>>>>>>> 23de2d2a7e3875becd5108be6fdf04edd7070781
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Alertas del Sistema</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {incidentesActivos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay alertas activas</p>
                </div>
              ) : incidentesActivos.map((alerta) => (
                <div key={alerta.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{alerta.tipo}</p>
                      <p className="text-sm text-gray-500 mt-1">{alerta.mensaje}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(alerta.fechaCreacion).toLocaleDateString()}
                      </p>
                    </div>
<<<<<<< HEAD
                    <Badge variant={getPrioridadColor(alerta.prioridad)} size="sm">
                      {alerta.prioridad}
=======
                    <Badge variant={getPrioridadColor(incidente.prioridad) as unknown } size="sm">
                      {incidente.prioridad}
>>>>>>> 23de2d2a7e3875becd5108be6fdf04edd7070781
                    </Badge>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-orange-600"
                      onClick={() => resolverIncidente(alerta.id)}
                    >
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>26
    </div>
  )
}