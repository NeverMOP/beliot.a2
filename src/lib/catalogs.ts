// In a real application, this data would likely come from a database or an API.

export type CatalogItem = {
    id: string;
    value: string;
    label: string;
    unit?: string;
}

export const deviceModels: CatalogItem[] = [
    { id: "rsyu-1400", value: "RSVU-1400", label: "RSVU-1400" },
    { id: "warmex-200", value: "WarmEx-200", label: "WarmEx-200" },
    { id: "aquaflow-500", value: "AquaFlow-500", label: "AquaFlow-500" },
    { id: "thermo-9", value: "Thermo-9", label: "Thermo-9" },
    { id: "warmex-300", value: "WarmEx-300", label: "WarmEx-300" }
];

export const gatewayModels: CatalogItem[] = [
    { id: "beliot-v1", value: "Beliot Gateway v1", label: "Beliot Gateway v1" },
    { id: "beliot-v2", value: "Beliot Gateway v2", label: "Beliot Gateway v2" },
    { id: "loramaster-3000", value: "LoRaMaster-3000", label: "LoRaMaster-3000" }
];

export const channelTypes: CatalogItem[] = [
    { id: "lora", value: "lora", label: "LoRaWAN" },
    { id: "nbiot", value: "nbiot", label: "NB-IoT" },
    { id: "rs485", value: "rs485", label: "RS-485" },
    { id: "gsm", value: "gsm", label: "GSM" }
];

export const objectTypes: CatalogItem[] = [
    { id: "residential", value: "residential", label: "Жилой дом" },
    { id: "business_center", value: "business_center", label: "Бизнес-центр" },
    { id: "mall", value: "mall", label: "Торговый центр" },
    { id: "medical", value: "medical", label: "Мед. учреждение" },
    { id: "school", value: "school", label: "Школа" },
    { id: "kindergarten", value: "kindergarten", label: "Детский сад" },
    { id: "heating_point", value: "heating_point", label: "Тепловой пункт" },
    { id: "warehouse", value: "warehouse", label: "Склад" },
]

export const readingTypes: { [key: string]: CatalogItem[] } = {
    water: [
        { id: "in1", value: "in1", label: "Объем (канал 1)", unit: "м³" },
        { id: "in2", value: "in2", label: "Объем (канал 2)", unit: "м³" },
        { id: "in3", value: "in3", label: "Объем (канал 3)", unit: "м³" },
        { id: "in4", value: "in4", label: "Объем (канал 4)", unit: "м³" },
        { id: "fflow1", value: "fflow1", label: "Расход (канал 1)", unit: "м³/ч" },
        { id: "fflow2", value: "fflow2", label: "Расход (канал 2)", unit: "м³/ч" },
        { id: "fflow3", value: "fflow3", label: "Расход (канал 3)", unit: "м³/ч" },
        { id: "fflow4", value: "fflow4", label: "Расход (канал 4)", unit: "м³/ч" },
    ],
    heat: [
        { id: "energy", value: "energy", label: "Тепловая энергия", unit: "ГДж" },
        { id: "mass1", value: "mass1", label: "Масса (подача)", unit: "т" },
        { id: "mass2", value: "mass2", label: "Масса (обратка)", unit: "т" },
        { id: "temp_supply", value: "temp_supply", label: "Температура (подача)", unit: "°C" },
        { id: "temp_return", value: "temp_return", label: "Температура (обратка)", unit: "°C" },
    ]
}
