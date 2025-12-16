import { type Device, type Reading, type BeliotObject, type User } from './types';

export let initialObjects: BeliotObject[] = [
  { id: 1, name: 'Жилой дом "Центральный"', address: 'ул. Ленина, д. 1, кв. 10', deviceCount: 0, objectType: 'residential' },
  { id: 2, name: 'Тепловой пункт №3', address: 'пр. Мира, д. 25', deviceCount: 0, objectType: 'heating_point', parentId: 1 },
  { id: 3, name: 'Бизнес-центр "Орион"', address: 'ул. Садовая, д. 5', deviceCount: 0, objectType: 'business_center' },
  { id: 4, name: 'Школа №5', address: 'ул. Космонавтов, д. 12', deviceCount: 0, objectType: 'school' },
  { id: 5, name: 'Детский сад "Солнышко"', address: 'ул. Парковая, д. 33', deviceCount: 0, objectType: 'kindergarten', parentId: 4 },
  { id: 6, name: 'Складской комплекс "Запад"', address: 'Индустриальное ш., 1', deviceCount: 0, objectType: 'warehouse' },
  { id: 8, name: 'Большой дом', address: 'ул. Строителей, д. 100', deviceCount: 0, objectType: 'residential' },
];

export let devices: Device[] = [
  {
    id: 1,
    external_id: '8A3B4C5D6E7F8G9H',
    serial_number: 'SN-001-A',
    type: 'water',
    model: 'RSVU-1400',
    channel_type: 'lora',
    address: 'ул. Ленина, д. 1, кв. 10',
    object_name: 'Жилой дом "Центральный"',
    status: 'online',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-01-15T09:30:00Z',
    objectId: 1,
    attributes: [
        { name: 'Лицевой счет', value: '100-200-301' },
        { name: 'Дата поверки', value: '2025-10-01' }
    ],
    is_gateway: false,
  },
  {
    id: 2,
    external_id: '9H8G7F6E5D4C3B2A',
    serial_number: 'SN-002-B',
    type: 'heat',
    model: 'Beliot Gateway v1',
    channel_type: 'gsm',
    address: 'пр. Мира, д. 25',
    object_name: 'Тепловой пункт №3',
    status: 'offline',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-02-20T11:00:00Z',
    objectId: 2,
    is_gateway: true,
  },
  {
    id: 3,
    external_id: '1A2B3C4D5E6F7G8H',
    serial_number: 'SN-003-C',
    type: 'water',
    model: 'AquaFlow-500',
    channel_type: 'rs485',
    address: 'ул. Садовая, д. 5',
    object_name: 'Бизнес-центр "Орион"',
    status: 'offline',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-03-10T14:00:00Z',
    objectId: 3,
    attributes: [
        { name: 'Тариф', value: 'Коммерческий' }
    ],
    is_gateway: false,
  },
  {
    id: 4,
    external_id: 'ABC123DEF456GHI7',
    serial_number: 'SN-004-D',
    type: 'heat',
    model: 'Thermo-9',
    channel_type: 'lora',
    address: 'ул. Космонавтов, д. 12',
    object_name: 'Школа №5',
    status: 'warning',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-04-01T18:45:00Z',
    objectId: 4,
    is_gateway: false,
  },
  {
    id: 5,
    external_id: 'ZYX987WVU654TSR3',
    serial_number: 'SN-005-E',
    type: 'water',
    model: 'RSVU-1400',
    channel_type: 'nbiot',
    address: 'ул. Парковая, д. 33',
    object_name: 'Детский сад "Солнышко"',
    status: 'warning',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-05-22T08:00:00Z',
    objectId: 5,
    is_gateway: false,
  },
  {
    id: 6,
    external_id: 'LORAWAN-DEVICE-001',
    serial_number: 'SN-006-F',
    type: 'heat',
    model: 'LoRaMaster-3000',
    channel_type: 'lora',
    address: 'Индустриальное ш., 1',
    object_name: 'Складской комплекс "Запад"',
    status: 'online',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-06-30T12:00:00Z',
    objectId: 6,
    is_gateway: true,
  },
  {
    id: 7,
    external_id: 'ZYX987WVU654TSR4',
    serial_number: 'SN-007-G',
    type: 'water',
    model: 'RSVU-1400',
    channel_type: 'nbiot',
    address: 'ул. Ленина, д. 1, кв. 11',
    object_name: 'Жилой дом "Центральный"',
    status: 'warning',
    unit_volume: 'м³',
    unit_energy: 'ГДж',
    unit_temperature: '°C',
    created_at: '2023-05-22T08:00:00Z',
    objectId: 1,
    is_gateway: false,
  },
];

export const users: User[] = [
    { id: 1, email: 'admin@beliot.local', full_name: 'Администратор', role: 'admin' },
    { id: 2, email: 'user1@example.com', full_name: 'Иван Петров', role: 'user' },
    { id: 3, email: 'viewer@example.com', full_name: 'Анна Сидорова', role: 'viewer' },
];

// --- Generation for the large apartment building ---
const bigHouseId = 8;
const bigHouse = initialObjects.find(o => o.id === bigHouseId)!;
let objectIdCounter = 100;
let deviceIdCounter = 1000;

for (let i = 1; i <= 80; i++) {
    const apartmentId = objectIdCounter++;
    const apartmentObject: BeliotObject = {
        id: apartmentId,
        name: `Квартира ${i}`,
        address: `${bigHouse.address}, кв. ${i}`,
        deviceCount: 3,
        objectType: 'residential',
        parentId: bigHouseId
    };
    initialObjects.push(apartmentObject);

    const statuses: Device['status'][] = ['online', 'offline', 'warning'];
    // This is a pseudo-random, but deterministic way to get a status based on the device ID.
    // It prevents hydration errors caused by Math.random() being different on server and client.
    const deterministicStatus = (id: number) => statuses[id % statuses.length];

    const device1Id = deviceIdCounter++;
    devices.push({
        id: device1Id,
        external_id: `BD-APT${i}-W1`,
        serial_number: `SN-W1-${1000 + i}`,
        type: 'water',
        model: 'AquaFlow-500',
        channel_type: 'lora',
        address: apartmentObject.address,
        object_name: apartmentObject.name,
        status: deterministicStatus(device1Id),
        unit_volume: 'м³',
        unit_energy: 'ГДж',
        unit_temperature: '°C',
        created_at: '2024-07-10T10:00:00Z',
        objectId: apartmentId,
        is_gateway: false
    });

    const device2Id = deviceIdCounter++;
    devices.push({
        id: device2Id,
        external_id: `BD-APT${i}-W2`,
        serial_number: `SN-W2-${2000 + i}`,
        type: 'water',
        model: 'AquaFlow-500',
        channel_type: 'lora',
        address: apartmentObject.address,
        object_name: apartmentObject.name,
        status: deterministicStatus(device2Id),
        unit_volume: 'м³',
        unit_energy: 'ГДж',
        unit_temperature: '°C',
        created_at: '2024-07-10T10:00:00Z',
        objectId: apartmentId,
        is_gateway: false
    });

    const device3Id = deviceIdCounter++;
    devices.push({
        id: device3Id,
        external_id: `BD-APT${i}-H1`,
        serial_number: `SN-H1-${3000 + i}`,
        type: 'heat',
        model: 'WarmEx-200',
        channel_type: 'lora',
        address: apartmentObject.address,
        object_name: apartmentObject.name,
        status: deterministicStatus(device3Id),
        unit_volume: 'м³',
        unit_energy: 'ГДж',
        unit_temperature: '°C',
        created_at: '2024-07-10T10:00:00Z',
        objectId: apartmentId,
        is_gateway: false
    });
}


// Function to calculate device counts for each object
const calculateObjectDeviceCounts = (): BeliotObject[] => {
    const objectsWithCounts = new Map<number, BeliotObject>();

    initialObjects.forEach(obj => {
        objectsWithCounts.set(obj.id, {
            ...obj,
            deviceCount: 0,
            onlineCount: 0,
            offlineCount: 0,
            warningCount: 0,
        });
    });

    devices.forEach(device => {
        const obj = objectsWithCounts.get(device.objectId);
        if (obj) {
            obj.deviceCount++;
            switch (device.status) {
                case 'online':
                    obj.onlineCount!++;
                    break;
                case 'offline':
                    obj.offlineCount!++;
                    break;
                case 'warning':
                    obj.warningCount!++;
                    break;
            }
        }
    });

    return Array.from(objectsWithCounts.values());
};

export const objects = calculateObjectDeviceCounts();


export function getObjectsTree(): BeliotObject[] {
  const objectsById = new Map(objects.map(obj => [obj.id, { ...obj, children: [] as BeliotObject[] }]));
  const roots: BeliotObject[] = [];

  objects.forEach(obj => {
    const current = objectsById.get(obj.id)!;
    if (obj.parentId && objectsById.has(obj.parentId)) {
      const parent = objectsById.get(obj.parentId)!;
      parent.children.push(current);

      // Aggregate counts up to the parent
      parent.deviceCount += current.deviceCount;
      parent.onlineCount! += current.onlineCount!;
      parent.offlineCount! += current.offlineCount!;
      parent.warningCount! += current.warningCount!;

    } else {
      roots.push(current);
    }
  });

  return roots.filter(obj => !obj.parentId || !objectsById.has(obj.parentId));
}

const generateReadings = (
  deviceId: number,
  deviceType: 'water' | 'heat',
  numReadings: number
): Reading[] => {
  const readings: Reading[] = [];
  const now = new Date();

  const pseudoRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i < numReadings; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString(); // one reading per hour
    const seed = deviceId + i;

    let error_flags = 0;
    // Simulate some errors based on device ID for determinism
    if (deviceId % 10 === 4) { // Device 4 and other devices ending in 4
        error_flags |= 1; // Low battery
    }
    if (deviceId % 10 === 5) { // Device 5
        error_flags |= 2; // Tampering
    }
     if (deviceId % 10 === 7) { // Device 7
        error_flags |= 2; // Tampering
    }

    const reading: Reading = {
      time,
      device_id: deviceId,
      battery_percent: (deviceId % 10 === 4) ? 9 - (i*0.5) : 80 - i * 0.5, // Simulate low battery for device 4
      rssi: -70 - Math.floor(pseudoRandom(seed + 1) * 10),
      error_flags,
    };

    if (deviceType === 'water') {
      reading.in1 = 1000 + i * 10 + pseudoRandom(seed + 2) * 5;
      reading.in2 = 800 + i * 8 + pseudoRandom(seed + 3) * 4;
      reading.fflow1 = 1.2 + Math.sin(i / 10) * 0.5;
      reading.fflow2 = 1.0 + Math.cos(i / 10) * 0.4;
    } else {
      reading.energy = 500 + i * 5 + pseudoRandom(seed + 4) * 3;
      reading.mass1 = 2000 + i * 20 + pseudoRandom(seed + 5) * 10;
      reading.temp_supply = 65 + Math.sin(i / 20) * 5;
      reading.temp_return = 55 + Math.cos(i / 20) * 5;
    }

    readings.push(reading);
  }

  return readings.reverse(); // oldest first
};

export const readings: Reading[] = devices.flatMap((device) =>
  generateReadings(device.id, device.type, 72) // 72 hours of data
);

export const getDeviceById = (id: number): Device | undefined =>
  devices.find((d) => d.id === id);

export const getReadingsForDevice = (deviceId: number): Reading[] =>
  readings.filter((r) => r.device_id === deviceId);
