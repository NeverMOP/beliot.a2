export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    deviceCount: number;
    parentId?: number | null;
    children?: BeliotObject[];
}

export type Device = {
  id: number;
  external_id: string;
  type: 'water' | 'heat';
  model: string;
  channel_type: 'lora' | 'nbiot' | 'rs485';
  address: string;
  object_name: string;
  status: 'online' | 'offline' | 'warning';
  unit_volume: 'м³';
  unit_energy: 'ГДж';
  unit_temperature: '°C';
  created_at: string;
  objectId: number;
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
