import { type Device, type Reading, type BeliotObject, type User, type Company } from './types';

// ===================================================================================
// MOCK DATA - This is for demonstration purposes.
// Replace this with your actual data fetching logic.
// ===================================================================================

const mockCompanies: Company[] = [
    { id: 1, name: 'Главная Управляющая Компания', unp: '190000001', parentId: null },
    { id: 2, name: 'Дочерняя УК "Запад"', unp: '190000002', parentId: 1 },
    { id: 3, name: 'Дочерняя УК "Восток"', unp: '190000003', parentId: 1 },
    { id: 4, name: 'Сервисная Компания "Комфорт"', unp: '190000004', parentId: 2 },
    { id: 5, name: 'Независимая Компания', unp: '190000005', parentId: null },
];

const mockObjects: BeliotObject[] = [
    { id: 1, name: 'ЖК "Солнечный"', address: 'ул. Центральная, 1', objectType: 'residential', deviceCount: 3, companyId: 1, parentId: null },
    { id: 2, name: 'Кв. 101', address: 'ул. Центральная, 1, кв. 101', objectType: 'residential', deviceCount: 2, companyId: 1, parentId: 1 },
    { id: 3, name: 'Кв. 102', address: 'ул. Центральная, 1, кв. 102', objectType: 'residential', deviceCount: 1, companyId: 1, parentId: 1 },
    { id: 4, name: 'БЦ "Орион"', address: 'пр. Победителей, 100', objectType: 'business_center', deviceCount: 2, companyId: 2, parentId: null },
    { id: 5, name: 'Офис 505', address: 'пр. Победителей, 100, оф. 505', objectType: 'business_center', deviceCount: 1, companyId: 2, parentId: 4 },
    { id: 6, name: 'Склад №3', address: 'ул. Промышленная, 5', objectType: 'warehouse', deviceCount: 1, companyId: 3, parentId: null },
    { id: 7, name: 'Теплоузел ЖК "Солнечный"', address: 'ул. Центральная, 1А', objectType: 'heating_point', deviceCount: 1, companyId: 1, parentId: 1 },
    { id: 8, name: 'ТЦ "Галерея"', address: 'пл. Свободы, 20', objectType: 'mall', deviceCount: 0, companyId: 5, parentId: null },
];

const mockUsers: User[] = [
    { id: 1, full_name: 'Иван Иванов', email: 'ivanov@company1.com', role: 'admin', companyId: 1 },
    { id: 2, full_name: 'Петр Петров', email: 'petrov@company2.com', role: 'user', companyId: 2 },
    { id: 3, full_name: 'Сидор Сидоров', email: 'sidorov@company3.com', role: 'viewer', companyId: 3 },
    { id: 4, full_name: 'Анна Кузнецова', email: 'kuznetsova@company1.com', role: 'user', companyId: 1 },
];

const mockDevices: Device[] = [
  { id: 1, external_id: '8A3B4C5D6E7F8G9H', serial_number: 'SN-W-001', type: 'water', model: 'AquaFlow-500', channel_type: 'lora', address: 'ул. Центральная, 1, кв. 101', object_name: 'Кв. 101 (Вода Г)', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-01-15T10:00:00Z', objectId: 2, companyId: 1 },
  { id: 2, external_id: '1A2B3C4D5E6F7G8H', serial_number: 'SN-W-002', type: 'water', model: 'AquaFlow-500', channel_type: 'lora', address: 'ул. Центральная, 1, кв. 101', object_name: 'Кв. 101 (Вода Х)', status: 'warning', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-01-15T10:05:00Z', objectId: 2, companyId: 1, attributes: [{name: 'Error', value: 'Low Battery'}] },
  { id: 3, external_id: 'Z9Y8X7W6V5U4T3S2', serial_number: 'SN-H-001', type: 'heat', model: 'WarmEx-200', channel_type: 'nbiot', address: 'ул. Центральная, 1, кв. 102', object_name: 'Кв. 102 (Отопление)', status: 'offline', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-02-20T11:30:00Z', objectId: 3, companyId: 1 },
  { id: 4, external_id: 'QWERTYUIOP123456', serial_number: 'SN-GW-01', type: 'heat', is_gateway: true, model: 'Beliot Gateway v2', channel_type: 'gsm', address: 'ул. Центральная, 1А', object_name: 'Теплоузел ЖК "Солнечный"', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-01-14T09:00:00Z', objectId: 7, companyId: 1 },
  { id: 5, external_id: 'ASDFGHJKL987654', serial_number: 'SN-H-002', type: 'heat', model: 'Thermo-9', channel_type: 'lora', address: 'пр. Победителей, 100, оф. 505', object_name: 'Офис 505', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-03-10T14:00:00Z', objectId: 5, gatewayId: 4, companyId: 2 },
  { id: 6, external_id: 'ZXCVBNM123456789', serial_number: 'SN-W-003', type: 'water', model: 'RSVU-1400', channel_type: 'rs485', address: 'ул. Промышленная, 5', object_name: 'Склад №3', status: 'online', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-04-01T18:00:00Z', objectId: 6, companyId: 3 },
  { id: 7, external_id: '1122334455667788', serial_number: 'SN-GW-02', type: 'heat', is_gateway: true, model: 'LoRaMaster-3000', channel_type: 'lora', address: 'пр. Победителей, 100', object_name: 'БЦ "Орион"', status: 'offline', unit_volume: 'м³', unit_energy: 'ГДж', unit_temperature: '°C', created_at: '2023-03-09T12:00:00Z', objectId: 4, companyId: 2 },
];

const generateReadings = (deviceId: number, deviceType: 'water' | 'heat', days: number): Reading[] => {
    const readings: Reading[] = [];
    const now = new Date();
    for (let i = 0; i < days * 24; i++) { // one reading per hour
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const baseReading = {
            time: time.toISOString(),
            device_id: deviceId,
            battery_percent: 90 - i * 0.1,
            rssi: -80 + Math.sin(i) * 10,
            error_flags: 0,
        };

        if (i === 2 && (deviceId === 2) ) { // Simulate a warning
           baseReading.error_flags = 1 << 0; // Low battery
        }

        if (deviceType === 'water') {
            readings.push({
                ...baseReading,
                in1: 100 + i * 0.1,
                fflow1: 0.3 + Math.random() * 0.1,
            });
        } else {
             readings.push({
                ...baseReading,
                energy: 50 + i * 0.05,
                temp_supply: 65 + Math.sin(i / 10) * 5,
                temp_return: 55 + Math.sin(i / 10 + 1) * 5,
                mass1: 200 + i * 0.2,
             });
        }
    }
    return readings.reverse();
};

const mockReadings: { [key: number]: Reading[] } = {
    1: generateReadings(1, 'water', 14),
    2: generateReadings(2, 'water', 14),
    3: generateReadings(3, 'heat', 14),
    5: generateReadings(5, 'heat', 14),
    6: generateReadings(6, 'water', 14),
};


// Function to build a tree from a flat list of items with parentId
const buildTree = <T extends { id: number; parentId: number | null; children?: T[] }>(items: T[]): T[] => {
    const tree: T[] = [];
    const childrenOf: { [key: number]: T[] } = {};

    items.forEach(item => {
        if (item.parentId === null) {
            tree.push(item);
        } else {
            if (!childrenOf[item.parentId]) {
                childrenOf[item.parentId] = [];
            }
            childrenOf[item.parentId].push(item);
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
};


// ===================================================================================
// ASYNCHRONOUS DATA FUNCTIONS - This is the integration point for the backend.
// Replace the body of these functions with your actual API calls.
// ===================================================================================

const filterByCompany = <T extends { companyId?: number }>(items: T[], companyId?: number): T[] => {
    if (!companyId) return items;
    
    // Get all children companies
    const companyIdsToFilter: number[] = [companyId];
    const queue: number[] = [companyId];
    while(queue.length > 0) {
        const currentId = queue.shift()!;
        const children = mockCompanies.filter(c => c.parentId === currentId);
        children.forEach(c => {
            companyIdsToFilter.push(c.id);
            queue.push(c.id);
        })
    }
    
    return items.filter(item => item.companyId && companyIdsToFilter.includes(item.companyId));
};


export async function getDevices(companyId?: number): Promise<Device[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return filterByCompany(mockDevices, companyId);
}

export async function getAllObjects(companyId?: number): Promise<BeliotObject[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const allObjects = mockObjects.map(obj => {
      const devicesInObject = mockDevices.filter(d => d.objectId === obj.id);
      const onlineCount = devicesInObject.filter(d => d.status === 'online').length;
      const offlineCount = devicesInObject.filter(d => d.status === 'offline').length;
      const warningCount = devicesInObject.filter(d => d.status === 'warning').length;
      return { ...obj, deviceCount: devicesInObject.length, onlineCount, offlineCount, warningCount };
  });
  return filterByCompany(allObjects, companyId);
}

export async function getUsers(companyId?: number): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return filterByCompany(mockUsers, companyId);
}

export async function getCompanies(): Promise<Company[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCompanies;
}

export async function getObjectsTree(companyId?: number): Promise<BeliotObject[]> {
  const allObjects = await getAllObjects(companyId);

  const getDeviceCounts = (object: BeliotObject, allDevs: Device[]): { online: number, offline: number, warning: number } => {
    let counts = { online: 0, offline: 0, warning: 0 };
    const directDevices = allDevs.filter(d => d.objectId === object.id);
    counts.online += directDevices.filter(d => d.status === 'online').length;
    counts.offline += directDevices.filter(d => d.status === 'offline').length;
    counts.warning += directDevices.filter(d => d.status === 'warning').length;
    
    if(object.children) {
        object.children.forEach(child => {
            const childCounts = getDeviceCounts(child, allDevs);
            counts.online += childCounts.online;
            counts.offline += childCounts.offline;
            counts.warning += childCounts.warning;
        });
    }
    return counts;
  }
  
  const tree = buildTree(allObjects);

  // Recalculate counts for the tree structure
  const allDevices = await getDevices(companyId);
  const enrichNode = (node: BeliotObject) => {
    if (node.children) {
      node.children.forEach(enrichNode);
    }
    const counts = getDeviceCounts(node, allDevices);
    node.onlineCount = counts.online;
    node.offlineCount = counts.offline;
    node.warningCount = counts.warning;
    node.deviceCount = counts.online + counts.offline + counts.warning;
  };
  tree.forEach(enrichNode);

  return tree;
}

export async function getCompaniesTree(): Promise<Company[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return buildTree(mockCompanies);
}

export async function getDeviceById(id: number): Promise<Device | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockDevices.find(d => d.id === id);
}

export async function getReadingsForDevice(deviceId: number): Promise<Reading[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockReadings[deviceId] || [];
}

export async function getGatewayForDevice(device: Device): Promise<Device | undefined> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const gatewayId = (device as any).gatewayId;
    if (!gatewayId) return undefined;
    return mockDevices.find(d => d.id === gatewayId && d.is_gateway);
};
