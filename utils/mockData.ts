import { User, Transaction, Contact, Charge } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Randall Bonilla',
  email: 'randall@example.com',
  phoneNumber: '8888-8888',
  accountNumber: '100-01-000-123456',
  balance: 125000.50,
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'send',
    amount: 15000,
    date: new Date('2025-11-04T14:30:00'),
    status: 'completed',
    recipient: {
      name: 'María González',
      phoneNumber: '8888-7777',
    },
    description: 'Pago almuerzo',
    reference: 'SINPE-20251104-001',
  },
  {
    id: '2',
    type: 'receive',
    amount: 50000,
    date: new Date('2025-11-03T10:15:00'),
    status: 'completed',
    sender: {
      name: 'Carlos Ramírez',
      phoneNumber: '8888-6666',
    },
    description: 'Pago servicios',
    reference: 'SINPE-20251103-045',
  },
  {
    id: '3',
    type: 'recharge',
    amount: 5000,
    date: new Date('2025-11-02T16:45:00'),
    status: 'completed',
    description: 'Recarga Kolbi',
    reference: 'REC-20251102-789',
  },
  {
    id: '4',
    type: 'send',
    amount: 25000,
    date: new Date('2025-11-01T09:20:00'),
    status: 'completed',
    recipient: {
      name: 'Ana López',
      phoneNumber: '8888-5555',
    },
    description: 'Regalo cumpleaños',
    reference: 'SINPE-20251101-123',
  },
  {
    id: '5',
    type: 'charge',
    amount: 12500,
    date: new Date('2025-10-31T18:00:00'),
    status: 'completed',
    description: 'Cobro por venta',
    reference: 'CHG-20251031-456',
  },
    {
    id: '6',
    type: 'send',
    amount: 25000,
    date: new Date('2025-11-01T09:20:00'),
    status: 'completed',
    recipient: {
      name: 'Ana López',
      phoneNumber: '8888-5555',
    },
    description: 'Regalo cumpleaños',
    reference: 'SINPE-20251101-123',
  },
  {
    id: '7',
    type: 'charge',
    amount: 12500,
    date: new Date('2025-10-31T18:00:00'),
    status: 'completed',
    description: 'Cobro por venta',
    reference: 'CHG-20251031-456',
  },
    {
    id: '8',
    type: 'send',
    amount: 25000,
    date: new Date('2025-11-01T09:20:00'),
    status: 'completed',
    recipient: {
      name: 'Ana López',
      phoneNumber: '8888-5555',
    },
    description: 'Regalo cumpleaños',
    reference: 'SINPE-20251101-123',
  },
  {
    id: '9',
    type: 'charge',
    amount: 12500,
    date: new Date('2025-10-31T18:00:00'),
    status: 'completed',
    description: 'Cobro por venta',
    reference: 'CHG-20251031-456',
  },
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'María González',
    phoneNumber: '8888-7777',
    isFavorite: true,
    lastTransaction: new Date('2025-11-04T14:30:00'),
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    phoneNumber: '8888-6666',
    isFavorite: true,
    lastTransaction: new Date('2025-11-03T10:15:00'),
  },
  {
    id: '3',
    name: 'Ana López',
    phoneNumber: '8888-5555',
    isFavorite: false,
    lastTransaction: new Date('2025-11-01T09:20:00'),
  },
  {
    id: '4',
    name: 'José Fernández',
    phoneNumber: '8888-4444',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Laura Martínez',
    phoneNumber: '8888-3333',
    isFavorite: true,
  },
];

export const mockCharges: Charge[] = [
  {
    id: '1',
    amount: 25000,
    description: 'Pago servicio diseño',
    qrCode: 'QR-CODE-DATA-1',
    createdAt: new Date('2025-11-04T15:00:00'),
    expiresAt: new Date('2025-11-11T15:00:00'),
    status: 'active',
  },
  {
    id: '2',
    amount: 15000,
    description: 'Venta producto',
    qrCode: 'QR-CODE-DATA-2',
    createdAt: new Date('2025-10-28T12:00:00'),
    expiresAt: new Date('2025-11-04T12:00:00'),
    status: 'expired',
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return phone;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-CR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('es-CR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

