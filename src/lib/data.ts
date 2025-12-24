import { type Device, type Reading, type BeliotObject, type User, type Company } from './types';
import { subHours, subDays } from 'date-fns';

// ===================================================================================
// MOCK DATA - This is for demonstration purposes.
// Replace this with your actual API calls.
// ===================================================================================

const mockCompanies: Company[] = [
  { id: 1, name: 'Управляющая компания "Центр"', unp: '190000001', parentId: null },
  { id: 2, name: 'Управляющая компания "Запад"', unp: '190000002', parentId: null },
  { id: 3, name: 'Товарищество собственников "Солнечный"', unp: '190000003', parentId: 1 },
  { id: 4, name: 'ЖЭС №10', unp: '190000004', parentId: 3 },
  { id: 5, name: 'Сервисная организация "МастерДом"', unp: '190000005', parentId: null },
];

const mockUsers: User[] = [
  { id: 1, full_name: 'Иван Петров', email: 'ivan.p@example.com', role: 'admin', companyId: 1 },
  { id: 2, full_name: 'Анна Сидорова', email: 'anna.s@example.com', role: 'user', companyId: 3 },
  { id: 3, full_name: 'Сергей Иванов', email: 'sergey.i@example.com', role: 'viewer', companyId: 4 },
  { id: 4, full_name: 'Ольга Николаева', email: 'olga.n@example.com', role: 'user', companyId: 2 },
  { id: 5, full_name: 'Дмитрий Васильев', email: 'dmitry.v@example.com', role: 'admin', companyId: 5 },
];


const mockObjects: BeliotObject[] = [
  // Company 1
  { id: 1, name: 'Бизнес-центр "Омега"', address: 'ул. Главная, 1', objectType: 'business_center', parentId: null, companyId: 1, deviceCount: 0 },
  { id: 2, name: 'Теплоузел БЦ "Омега"', address: 'ул. Главная, 1', objectType: 'heating_point', parentId: 1, companyId: 1, deviceCount: 0 },
  // Company 3 -> 1
  { id: 3, name: 'Жилой дом "Солнечный"', address: 'пр. Победителей, 100', objectType: 'residential', parentId: null, companyId: 3, deviceCount: 0 },
  { id: 4, name: 'Квартира 15', address: 'пр. Победителей, 100, кв. 15', objectType: 'residential', parentId: 3, companyId: 3, deviceCount: 0 },
  { id: 5, name: 'Квартира 16', address: 'пр. Победителей, 100, кв. 16', objectType: 'residential', parentId: 3, companyId: 3, deviceCount: 0 },
   // Company 2
  { id: 6, name: 'Торговый центр "Замок"', address: 'ул. Западная, 50', objectType: 'mall', parentId: null, companyId: 2, deviceCount: 0 },
  // No company
  { id: 7, name: 'Складское помещение', address: 'ул. Промышленная, 12', objectType: 'warehouse', parentId: null, deviceCount: 0 },
];

const mockDevices: Device[] = [
  // Device for Object 2 (Heat) - Online
  { id: 1, external_id: 'A81758FFFE076E9E', serial_number: 'SN-HEAT-001', type: 'heat', model: 'WarmEx-200', channel_type: 'lora', address: 'ул. Главная, 1', object_name: 'Теплоузел БЦ "Омега"', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 30).toISOString(), objectId: 2, companyId: 1 },
  // Device for Object 4 (Water) - Online
  { id: 2, external_id: 'B827EBFFFE7B2F6C', serial_number: 'SN-WATER-001', type: 'water', model: 'AquaFlow-500', channel_type: 'nbiot', address: 'пр. Победителей, 100, кв. 15', object_name: 'Квартира 15', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 45).toISOString(), objectId: 4, companyId: 3 },
  // Device for Object 5 (Water) - Offline
  { id: 3, external_id: 'C822ABFFFE2C2A4B', serial_number: 'SN-WATER-002', type: 'water', model: 'RSVU-1400', channel_type: 'lora', address: 'пр. Победителей, 100, кв. 16', object_name: 'Квартира 16', status: 'offline', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 60).toISOString(), objectId: 5, companyId: 3 },
  // Device for Object 6 (Heat) - Warning (low battery)
  { id: 4, external_id: 'D819FBFFFE5D1B3A', serial_number: 'SN-HEAT-002', type: 'heat', model: 'Thermo-9', channel_type: 'rs485', address: 'ул. Западная, 50', object_name: 'ТЦ "Замок"', status: 'warning', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 90).toISOString(), objectId: 6, companyId: 2 },
  // Device for Object 7 (Water) - Warning (tampering)
  { id: 5, external_id: 'E81758FFFE076EAB', serial_number: 'SN-WATER-003', type: 'water', model: 'AquaFlow-500', channel_type: 'nbiot', address: 'ул. Промышленная, 12', object_name: 'Складское помещение', status: 'warning', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 10).toISOString(), objectId: 7 },
  // Gateway for Object 1
  { id: 101, external_id: 'GW-A81758FFFE010203', serial_number: 'BELIOT-GW-01', type: 'heat', model: 'Beliot Gateway v2', channel_type: 'lora', address: 'ул. Главная, 1', object_name: 'Бизнес-центр "Омега"', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: subDays(new Date(), 120).toISOString(), objectId: 1, companyId: 1, is_gateway: true },
];

const mockReadings: { [key: number]: Reading[] } = {
  // Device 1 (Heat, Online)
  1: Array.from({ length: 100 }, (_, i) => ({
    time: subHours(new Date(), i).toISOString(),
    device_id: 1,
    battery_percent: 95 - i * 0.1,
    rssi: -80 + (i % 10),
    error_flags: 0,
    energy: 150.5 + i * 2.5,
    temp_supply: 65 + Math.sin(i / 10) * 5,
    temp_return: 50 - Math.cos(i / 10) * 3,
  })),
  // Device 2 (Water, Online)
  2: Array.from({ length: 100 }, (_, i) => ({
    time: subHours(new Date(), i * 2).toISOString(),
    device_id: 2,
    battery_percent: 80 - i * 0.2,
    rssi: -95 + (i % 15),
    error_flags: 0,
    in1: 42.1 + i * 0.1,
    fflow1: 0.5 + Math.random() * 0.1,
  })),
  // Device 3 (Water, Offline) - last reading 5 days ago
  3: Array.from({ length: 20 }, (_, i) => ({
    time: subDays(subHours(new Date(), i), 5).toISOString(),
    device_id: 3,
    battery_percent: 70 - i * 0.5,
    rssi: -110 + (i % 5),
    error_flags: 0,
    in1: 123.4 + i * 0.05,
    fflow1: 0.3 + Math.random() * 0.05,
  })),
  // Device 4 (Heat, Warning - low battery)
  4: Array.from({ length: 50 }, (_, i) => ({
    time: subHours(new Date(), i * 3).toISOString(),
    device_id: 4,
    battery_percent: 12 - i * 0.1, // Starts low
    rssi: -100,
    error_flags: i > 10 ? 1 : 0, // LOW_BATTERY flag after some time
    energy: 540.8 + i * 1.2,
    temp_supply: 70 + Math.sin(i / 5),
    temp_return: 55 - Math.cos(i / 5),
  })),
  // Device 5 (Water, Warning - tampering)
  5: Array.from({ length: 30 }, (_, i) => ({
    time: subHours(new Date(), i).toISOString(),
    device_id: 5,
    battery_percent: 99,
    rssi: -90,
    error_flags: i > 5 ? 2 : 0, // TAMPERING flag after 5 hours
    in1: 12.5 + i * 0.2,
    fflow1: 0.8,
  })),
};

const getCompanyAndChildrenIds = (companyId: number, companies: Company[]): number[] => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return [];

    let ids = [company.id];
    const children = companies.filter(c => c.parentId === company.id);
    children.forEach(child => {
        ids = [...ids, ...getCompanyAndChildrenIds(child.id, companies)];
    });
    return ids;
}


// ===================================================================================
// ASYNCHRONOUS DATA FUNCTIONS - This is the integration point for the backend.
// Replace the body of these functions with your actual API calls.
// ===================================================================================

export async function getDevices(companyId?: number): Promise<Device[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  if (companyId) {
      const companyIds = getCompanyAndChildrenIds(companyId, mockCompanies);
      return mockDevices.filter(d => d.companyId && companyIds.includes(d.companyId));
  }
  return mockDevices;
}

export async function getAllObjects(companyId?: number): Promise<BeliotObject[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const objectsWithStats = mockObjects.map(obj => {
    const devices = mockDevices.filter(d => d.objectId === obj.id);
    return {
      ...obj,
      deviceCount: devices.length,
      onlineCount: devices.filter(d => d.status === 'online').length,
      offlineCount: devices.filter(d => d.status === 'offline').length,
      warningCount: devices.filter(d => d.status === 'warning').length,
    }
  });

  if (companyId) {
      const companyIds = getCompanyAndChildrenIds(companyId, mockCompanies);
      return objectsWithStats.filter(o => o.companyId && companyIds.includes(o.companyId));
  }
  return objectsWithStats;
}

export async function getUsers(companyId?: number): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  if (companyId) {
    const companyIds = getCompanyAndChildrenIds(companyId, mockCompanies);
    return mockUsers.filter(u => u.companyId && companyIds.includes(u.companyId));
  }
  return mockUsers;
}

export async function getCompanies(): Promise<Company[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCompanies;
}

const buildTree = <T extends { id: number; parentId?: number | null; children?: T[] }>(items: T[]): T[] => {
    const tree: T[] = [];
    const childrenOf: { [key: number]: T[] } = {};

    items.forEach(item => {
        if (item.parentId) {
            childrenOf[item.parentId] = childrenOf[item.parentId] || [];
            childrenOf[item.parentId].push(item);
        } else {
            tree.push(item);
        }
    });

    const assignChildren = (node: T) => {
        if (childrenOf[node.id]) {
            node.children = childrenOf[node.id];
            node.children.forEach(assignChildren);
        }
    };

    tree.forEach(assignChildren);
    return tree;
}

export async function getObjectsTree(companyId?: number): Promise<BeliotObject[]> {
  const allObjects = await getAllObjects(companyId);

  const calculateChildStats = (object: BeliotObject): BeliotObject => {
      if (!object.children || object.children.length === 0) {
          return object;
      }
      const childrenWithStats = object.children.map(calculateChildStats);
      const deviceCount = object.deviceCount + childrenWithStats.reduce((sum, child) => sum + child.deviceCount, 0);
      const onlineCount = (object.onlineCount || 0) + childrenWithStats.reduce((sum, child) => sum + (child.onlineCount || 0), 0);
      const offlineCount = (object.offlineCount || 0) + childrenWithStats.reduce((sum, child) => sum + (child.offlineCount || 0), 0);
      const warningCount = (object.warningCount || 0) + childrenWithStats.reduce((sum, child) => sum + (child.warningCount || 0), 0);
      
      return {
          ...object,
          children: childrenWithStats,
          deviceCount,
          onlineCount,
          offlineCount,
          warningCount,
      }
  }

  const tree = buildTree(allObjects);
  return tree.map(calculateChildStats);
}

export async function getCompaniesTree(): Promise<Company[]> {
  const companies = await getCompanies();
  return buildTree(companies);
}

export async function getDeviceById(id: number): Promise<Device | undefined> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return mockDevices.find(device => device.id === id);
}

export async function getReadingsForDevice(deviceId: number): Promise<Reading[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockReadings[deviceId] || [];
}

export async function getGatewayForDevice(device: Device): Promise<Device | undefined> {
    await new Promise(resolve => setTimeout(resolve, 50));
    // This is a mock implementation. In a real scenario, you might have a `gatewayId` field on the device.
    // Here we find a gateway that is on the same object or a parent object.
    const objects = await getAllObjects();
    let currentObjectId: number | undefined | null = device.objectId;
    
    while (currentObjectId) {
        const gateway = mockDevices.find(d => d.is_gateway && d.objectId === currentObjectId);
        if (gateway) {
            return gateway;
        }
        const currentObject = objects.find(o => o.id === currentObjectId);
        currentObjectId = currentObject?.parentId;
    }
    return undefined;
};
