
export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    objectType: string;
    deviceCount: number;
    onlineCount?: number;
    offlineCount?: number;
    warningCount?: number;
    parentId?: number | null;
    children?: BeliotObject[];
    companyId?: number;
}

export type DeviceAttribute = {
    name: string;
    value: string;
}

export type UserPermissions = {
    canEditUsers: boolean;
    canCreateDevices: boolean;
    canCreateObjects: boolean;
    canCreateCompanies: boolean;
    accessibleCompanies: 'all' | number[];
};

export type User = {
    id: number;
    email: string;
    full_name: string;
    role: 'admin' | 'user' | 'viewer';
    companyId?: number;
    permissions: UserPermissions;
}

export type Company = {
    id: number;
    name: string;
    unp: string;
    parentId?: number | null;
    children?: Company[];
};

export type Device = {
  id: number;
  external_id: string;
  serial_number: string;
  type: 'water' | 'heat';
  model: string;
  channel_type: string;
  address: string;
  object_name: string;
  status: 'online' | 'offline' | 'warning';
  unit_volume: 'м³';
  unit_energy: 'ГДж';
  unit_temperature: '°C';
  created_at: string;
  objectId: number;
  companyId?: number;
  gatewayId?: number;
  attributes?: DeviceAttribute[];
  is_gateway?: boolean;
};

export type Reading = {
  time: string;
  device_id: number;
  battery_percent: number;
  rssi: number;
  error_flags: number;
  // Water specific
  in1?: number;
  in2?: number;
  in3?: number;
  in4?: number;
  fflow1?: number;
  fflow2?: number;
  fflow3?: number;
  fflow4?: number;
  // Heat specific
  energy?: number;
  mass1?: number;
  mass2?: number;
  mass3?: number;
  mass4?: number;
  temp_supply?: number;
  temp_return?: number;
};

