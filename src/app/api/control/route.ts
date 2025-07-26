import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, trenId, mensaje } = body

    // Create an alert for the control action
    const alerta = await prisma.alerta.create({
      data: {
        tipo: 'Sistema',
        mensaje: mensaje || `Acción de control: ${action}`,
        prioridad: 'Media',
        resuelta: false,
        centroControlId: 'default-centro' // This should be dynamic based on user
      }
    })

    // Log the control action
    console.log(`Control action executed: ${action}`, { trenId, mensaje })

    return NextResponse.json({ 
      success: true, 
      action, 
      alertaId: alerta.id,
      message: `Acción "${action}" ejecutada exitosamente` 
    })
  } catch (error) {
    console.error('Error executing control action:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get recent control actions from alerts
    const alertas = await prisma.alerta.findMany({
      where: {
        tipo: 'Sistema'
      },
      orderBy: {
        fechaCreacion: 'desc'
      },
      take: 20
    })

    return NextResponse.json(alertas)
  } catch (error) {
    console.error('Error fetching control actions:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}