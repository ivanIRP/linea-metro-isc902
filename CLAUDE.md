# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a metro line management system ("Metro Líneas - Sistema de Gestión"). The app provides a dashboard for managing metro lines, inventory, personnel, and configuration in Spanish.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`

## Database Commands

- **Push schema to database**: `npm run db:push`
- **Seed database with test data**: `npm run db:seed`
- **Open Prisma Studio**: `npm run db:studio`
- **Reset database completely**: `npm run db:reset`
- **Test database connection**: `npm run db:test`
- **Test login system**: `npm run auth:test`

## Architecture

### Tech Stack
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- Prisma ORM
- MySQL Database

### Project Structure
- `/src/app/` - App Router pages and API routes
  - `/api/` - REST API endpoints for all modules
  - Module pages: dashboard, seguridad, rutas, trenes, vías, electricidad, control, cobro, comunicación
- `/src/components/layout/` - Layout components (Header, Sidebar)
- `/src/components/ui/` - Reusable UI components (Badge, Button, Card, Input, Table)
- `/src/lib/` - Utility functions and Prisma client
- `/prisma/` - Database schema and seed files
- `/public/` - Static assets

### Layout System
The app uses a consistent layout with:
- **Sidebar**: Navigation menu with icons and active state highlighting
- **Header**: Shows system title, current date/time, and action buttons
- **Main content**: Renders page content in a flex layout

### UI Components
Custom UI components follow a consistent pattern:
- Components use TypeScript interfaces for props
- Styling with Tailwind CSS classes
- Variant-based styling (primary, secondary, ghost, etc.)
- Size variants (sm, md, lg)

### Key Features
- **Dashboard**: Stats cards, recent activity, and line status overview
- **Lines Management**: Metro line CRUD with detailed information (length, stations, status, passengers)
- **Project Tracking**: Progress bars and budget information
- **Responsive Design**: Grid layouts that adapt to screen size

### Database Architecture
The system uses MySQL with Prisma ORM and includes:
- **Complete data models** for all 8 modules (Seguridad, Rutas, Trenes, Vías, Electricidad, Control, Cobro, Comunicación)
- **User authentication system** with roles and permissions
- **Relational structure** with proper foreign keys and constraints
- **Comprehensive enums** for status tracking and categorization
- **REST API endpoints** for all CRUD operations
- **Real-time data** integration with frontend
- **Seed data** for testing and development

### Authentication System
- **Simple login system** without complex encryption
- **Cookie-based sessions** for user management
- **Route protection** with middleware
- **Role-based access** (Administrador, Operador, Seguridad, etc.)
- **Test users** available for development:
  - admin/admin (Administrador)
  - operador/operador (Operador)
  - seguridad/seguridad (Seguridad)

### Code Conventions
- Spanish language for UI text and data
- Emoji icons in navigation and buttons
- Client components marked with 'use client' directive
- Absolute imports using `@/` prefix
- Consistent TypeScript typing with interfaces
- API routes follow RESTful conventions