export const colors = {
  white: "#ffffff",
  whitish: "#F5F6F7",
  black: "#000000",
  text: "#03191c",
  textLight: "#4D5D6E",
  icons: "#314464",
  border: "#dce1e8",
  shadow: "#03191c16",
  green: "#4bd07f",
  greenLight: "#e3fff5",
  red: "#e60050",
  redLight: "#ffe8f0",
  blue: "#00d0e6",
  blueLight: "#E8FDFF",
  orange: "#F4872A",
  yellowLight: "#FFF8E2",
  purple: "#6041ED",
  purpleLight: "#EFEBFF",
};

export const shipmentsIncomingFields = [
  { label: "Номер", value: "shipment_id", size: 100 },
  { label: "Подател", value: "sender" },
  { label: "Получател", value: "recipient" },
  { label: "Тип доставка", value: "delivery_type" },
  { label: "Адрес", value: "delivery_address" },
  { label: "Тегло", value: "weight" },
  { label: "Статус", value: "status" },
  { label: "Цена", value: "price", size: 200 },
  { label: "Назначен куриер", value: "assigned_courier" },
  { label: "", value: "settings", size: 100 },
];

export const clientsIncomingFields = [
  { label: "Имена", value: "names" },
  { label: "Телефонен номер", value: "phone_number" },
  { label: "Имейл", value: "email" },
  { label: "Адрес", value: "address" },
  { label: "Пратки", value: "shipments" },
  { label: "", value: "settings", size: 50 },
];

export const employeesIncomingFields = [
  { label: "Имена", value: "name" },
  { label: "Имейл", value: "email" },
  { label: "Позиция", value: "position" },
  { label: "Офис", value: "office" },
  { label: "", value: "settings", size: 50 },
];

export const officesIncomingFields = [
  { label: "Локация", value: "location" },
  { label: "Телефонен номер", value: "phone" },
  { label: "", value: "settings", size: 20 },
];
