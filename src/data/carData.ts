export interface RepairNode {
  name: string;
  price: [number, number];
  time: string;
  category: string;
}

export interface CarModel {
  name: string;
  nodes: RepairNode[];
}

export interface CarBrand {
  brand: string;
  models: CarModel[];
}

// 50 узлов ремонта с категориями — базовый шаблон, цены масштабируются коэффициентом марки
export const BASE_NODES: Omit<RepairNode, "price">[] = [
  // Двигатель
  { name: "Замена масла и фильтра", time: "30 мин", category: "Двигатель" },
  { name: "Диагностика двигателя", time: "1 час", category: "Двигатель" },
  { name: "Замена ремня ГРМ", time: "3–5 часов", category: "Двигатель" },
  { name: "Замена цепи ГРМ", time: "4–6 часов", category: "Двигатель" },
  { name: "Капитальный ремонт ДВС", time: "3–7 дней", category: "Двигатель" },
  { name: "Замена прокладки ГБЦ", time: "5–8 часов", category: "Двигатель" },
  { name: "Замена помпы охлаждения", time: "2–4 часа", category: "Двигатель" },
  { name: "Замена термостата", time: "1–2 часа", category: "Двигатель" },
  { name: "Промывка топливной системы", time: "2–3 часа", category: "Двигатель" },
  { name: "Замена топливного насоса", time: "2–3 часа", category: "Двигатель" },
  // КПП
  { name: "Замена масла в КПП", time: "1 час", category: "КПП" },
  { name: "Диагностика КПП", time: "1–2 часа", category: "КПП" },
  { name: "Ремонт АКПП", time: "2–5 дней", category: "КПП" },
  { name: "Замена сцепления", time: "4–6 часов", category: "КПП" },
  { name: "Замена двухмассового маховика", time: "5–7 часов", category: "КПП" },
  { name: "Ремонт вариатора", time: "2–4 дня", category: "КПП" },
  { name: "Замена кулисы КПП", time: "1–2 часа", category: "КПП" },
  { name: "Замена ШРУС", time: "2–3 часа", category: "КПП" },
  { name: "Замена приводного вала", time: "2–4 часа", category: "КПП" },
  // Тормоза
  { name: "Замена тормозных колодок", time: "1 час", category: "Тормоза" },
  { name: "Замена тормозных дисков", time: "1.5 часа", category: "Тормоза" },
  { name: "Прокачка тормозной системы", time: "1 час", category: "Тормоза" },
  { name: "Замена тормозного цилиндра", time: "2 часа", category: "Тормоза" },
  { name: "Замена тормозных трубок", time: "2–3 часа", category: "Тормоза" },
  { name: "Ремонт суппорта", time: "1–2 часа", category: "Тормоза" },
  { name: "Замена ABS датчика", time: "1 час", category: "Тормоза" },
  { name: "Замена ручного тормоза", time: "1.5 часа", category: "Тормоза" },
  // Подвеска
  { name: "Замена амортизаторов", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена рычагов подвески", time: "2 часа", category: "Подвеска" },
  { name: "Развал-схождение", time: "1 час", category: "Подвеска" },
  { name: "Замена рулевых наконечников", time: "1.5 часа", category: "Подвеска" },
  { name: "Замена шаровых опор", time: "2 часа", category: "Подвеска" },
  { name: "Замена стоек стабилизатора", time: "1 час", category: "Подвеска" },
  { name: "Замена ступичного подшипника", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена рулевой рейки", time: "3–5 часов", category: "Подвеска" },
  { name: "Ремонт рулевой колонки", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена пружин подвески", time: "2–3 часа", category: "Подвеска" },
  // Электрика
  { name: "Компьютерная диагностика", time: "30 мин", category: "Электрика" },
  { name: "Замена аккумулятора", time: "30 мин", category: "Электрика" },
  { name: "Ремонт генератора", time: "2–4 часа", category: "Электрика" },
  { name: "Ремонт стартера", time: "2–3 часа", category: "Электрика" },
  { name: "Замена свечей зажигания", time: "1 час", category: "Электрика" },
  { name: "Замена катушки зажигания", time: "1–2 часа", category: "Электрика" },
  { name: "Ремонт кондиционера", time: "2–4 часа", category: "Электрика" },
  { name: "Заправка кондиционера", time: "1 час", category: "Электрика" },
  { name: "Замена лямбда-зонда", time: "1–2 часа", category: "Электрика" },
  { name: "Прошивка ЭБУ", time: "2–3 часа", category: "Электрика" },
  { name: "Ремонт системы освещения", time: "1–2 часа", category: "Электрика" },
  { name: "Замена датчика парковки", time: "1.5 часа", category: "Электрика" },
];

// Коэффициент для расчёта цен (базовые цены × коэф)
const BASE_PRICES: [number, number][] = [
  [800, 1500],      // Замена масла и фильтра
  [1500, 3000],     // Диагностика двигателя
  [5000, 12000],    // Замена ремня ГРМ
  [8000, 18000],    // Замена цепи ГРМ
  [25000, 80000],   // Капитальный ремонт ДВС
  [15000, 35000],   // Замена прокладки ГБЦ
  [3000, 8000],     // Замена помпы
  [1500, 4000],     // Замена термостата
  [2000, 5000],     // Промывка топл. системы
  [4000, 10000],    // Замена топл. насоса
  [1200, 2500],     // Замена масла в КПП
  [2000, 4500],     // Диагностика КПП
  [15000, 60000],   // Ремонт АКПП
  [8000, 20000],    // Замена сцепления
  [18000, 45000],   // Двухмассовый маховик
  [20000, 70000],   // Ремонт вариатора
  [1500, 4000],     // Замена кулисы КПП
  [4000, 10000],    // Замена ШРУС
  [5000, 14000],    // Замена приводного вала
  [1500, 4000],     // Замена колодок
  [3500, 9000],     // Замена дисков
  [1000, 2500],     // Прокачка тормозов
  [2500, 6000],     // Замена цилиндра
  [3000, 8000],     // Замена трубок
  [2000, 5500],     // Ремонт суппорта
  [1200, 3500],     // Замена ABS датчика
  [1800, 5000],     // Ручной тормоз
  [3000, 9000],     // Замена амортизаторов
  [2500, 7000],     // Замена рычагов
  [2000, 4000],     // Развал-схождение
  [1800, 5000],     // Рулевые наконечники
  [2000, 6000],     // Шаровые опоры
  [1000, 3000],     // Стойки стабилизатора
  [3000, 9000],     // Ступичный подшипник
  [8000, 25000],    // Замена рулевой рейки
  [4000, 12000],    // Рулевая колонка
  [2500, 7000],     // Пружины подвески
  [1000, 2000],     // Компьютерная диагностика
  [500, 1000],      // Замена аккумулятора
  [3000, 8000],     // Ремонт генератора
  [2500, 7000],     // Ремонт стартера
  [800, 2500],      // Замена свечей
  [1500, 4000],     // Замена катушки
  [3000, 10000],    // Ремонт кондиционера
  [1500, 3500],     // Заправка кондиционера
  [1500, 4000],     // Лямбда-зонд
  [3000, 8000],     // Прошивка ЭБУ
  [800, 3000],      // Освещение
  [1200, 3500],     // Датчик парковки
];

function makeNodes(coeff: number): RepairNode[] {
  return BASE_NODES.map((node, i) => ({
    ...node,
    price: [
      Math.round(BASE_PRICES[i][0] * coeff / 100) * 100,
      Math.round(BASE_PRICES[i][1] * coeff / 100) * 100,
    ] as [number, number],
  }));
}

// Данные: 90 марок с моделями
// coeff: 1.0 = бюджет, 1.5 = средний, 2.5 = премиум, 3.5 = люкс
export const CAR_DATA: CarBrand[] = [
  // ══ НЕМЕЦКИЕ ПРЕМИУМ ══
  {
    brand: "BMW",
    models: [
      { name: "1 серия", nodes: makeNodes(2.0) },
      { name: "2 серия", nodes: makeNodes(2.1) },
      { name: "3 серия", nodes: makeNodes(2.3) },
      { name: "4 серия", nodes: makeNodes(2.4) },
      { name: "5 серия", nodes: makeNodes(2.6) },
      { name: "6 серия", nodes: makeNodes(2.8) },
      { name: "7 серия", nodes: makeNodes(3.2) },
      { name: "8 серия", nodes: makeNodes(3.5) },
      { name: "X1", nodes: makeNodes(2.1) },
      { name: "X3", nodes: makeNodes(2.5) },
      { name: "X5", nodes: makeNodes(2.9) },
      { name: "X7", nodes: makeNodes(3.3) },
      { name: "M3", nodes: makeNodes(3.8) },
      { name: "M5", nodes: makeNodes(4.0) },
      { name: "Z4", nodes: makeNodes(2.8) },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "A-класс", nodes: makeNodes(2.2) },
      { name: "B-класс", nodes: makeNodes(2.1) },
      { name: "C-класс", nodes: makeNodes(2.5) },
      { name: "E-класс", nodes: makeNodes(2.8) },
      { name: "S-класс", nodes: makeNodes(3.5) },
      { name: "GLA", nodes: makeNodes(2.3) },
      { name: "GLC", nodes: makeNodes(2.7) },
      { name: "GLE", nodes: makeNodes(3.0) },
      { name: "GLS", nodes: makeNodes(3.4) },
      { name: "AMG GT", nodes: makeNodes(4.2) },
      { name: "CLA", nodes: makeNodes(2.4) },
      { name: "EQC", nodes: makeNodes(3.0) },
    ],
  },
  {
    brand: "Audi",
    models: [
      { name: "A1", nodes: makeNodes(1.9) },
      { name: "A3", nodes: makeNodes(2.1) },
      { name: "A4", nodes: makeNodes(2.4) },
      { name: "A5", nodes: makeNodes(2.6) },
      { name: "A6", nodes: makeNodes(2.8) },
      { name: "A7", nodes: makeNodes(3.0) },
      { name: "A8", nodes: makeNodes(3.5) },
      { name: "Q3", nodes: makeNodes(2.2) },
      { name: "Q5", nodes: makeNodes(2.6) },
      { name: "Q7", nodes: makeNodes(3.1) },
      { name: "Q8", nodes: makeNodes(3.4) },
      { name: "TT", nodes: makeNodes(2.8) },
      { name: "R8", nodes: makeNodes(4.5) },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      { name: "Polo", nodes: makeNodes(1.3) },
      { name: "Golf", nodes: makeNodes(1.5) },
      { name: "Jetta", nodes: makeNodes(1.5) },
      { name: "Passat", nodes: makeNodes(1.7) },
      { name: "Tiguan", nodes: makeNodes(1.8) },
      { name: "Touareg", nodes: makeNodes(2.4) },
      { name: "Arteon", nodes: makeNodes(2.0) },
      { name: "Tayron", nodes: makeNodes(1.9) },
      { name: "Multivan", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Porsche",
    models: [
      { name: "911", nodes: makeNodes(4.5) },
      { name: "Cayenne", nodes: makeNodes(3.5) },
      { name: "Macan", nodes: makeNodes(2.8) },
      { name: "Panamera", nodes: makeNodes(4.0) },
      { name: "Taycan", nodes: makeNodes(4.2) },
      { name: "Boxster", nodes: makeNodes(3.8) },
    ],
  },
  {
    brand: "Opel",
    models: [
      { name: "Astra", nodes: makeNodes(1.2) },
      { name: "Insignia", nodes: makeNodes(1.4) },
      { name: "Mokka", nodes: makeNodes(1.3) },
      { name: "Corsa", nodes: makeNodes(1.1) },
      { name: "Crossland", nodes: makeNodes(1.3) },
    ],
  },
  // ══ ЯПОНСКИЕ ══
  {
    brand: "Toyota",
    models: [
      { name: "Corolla", nodes: makeNodes(1.3) },
      { name: "Camry", nodes: makeNodes(1.8) },
      { name: "RAV4", nodes: makeNodes(1.7) },
      { name: "Land Cruiser 200", nodes: makeNodes(2.8) },
      { name: "Land Cruiser Prado", nodes: makeNodes(2.4) },
      { name: "Highlander", nodes: makeNodes(2.1) },
      { name: "C-HR", nodes: makeNodes(1.5) },
      { name: "Hilux", nodes: makeNodes(1.9) },
      { name: "Yaris", nodes: makeNodes(1.1) },
      { name: "Fortuner", nodes: makeNodes(2.0) },
      { name: "4Runner", nodes: makeNodes(2.2) },
      { name: "Supra", nodes: makeNodes(3.2) },
    ],
  },
  {
    brand: "Honda",
    models: [
      { name: "Civic", nodes: makeNodes(1.3) },
      { name: "Accord", nodes: makeNodes(1.7) },
      { name: "CR-V", nodes: makeNodes(1.7) },
      { name: "Pilot", nodes: makeNodes(2.0) },
      { name: "Jazz", nodes: makeNodes(1.1) },
      { name: "HR-V", nodes: makeNodes(1.4) },
      { name: "Passport", nodes: makeNodes(1.9) },
      { name: "Ridgeline", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Nissan",
    models: [
      { name: "Almera", nodes: makeNodes(1.1) },
      { name: "Qashqai", nodes: makeNodes(1.5) },
      { name: "X-Trail", nodes: makeNodes(1.6) },
      { name: "Patrol", nodes: makeNodes(2.3) },
      { name: "Murano", nodes: makeNodes(2.0) },
      { name: "Juke", nodes: makeNodes(1.3) },
      { name: "Navara", nodes: makeNodes(1.7) },
      { name: "GT-R", nodes: makeNodes(4.0) },
      { name: "370Z", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Mazda",
    models: [
      { name: "Mazda 2", nodes: makeNodes(1.1) },
      { name: "Mazda 3", nodes: makeNodes(1.3) },
      { name: "Mazda 6", nodes: makeNodes(1.6) },
      { name: "CX-3", nodes: makeNodes(1.3) },
      { name: "CX-5", nodes: makeNodes(1.7) },
      { name: "CX-9", nodes: makeNodes(2.0) },
      { name: "MX-5", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Subaru",
    models: [
      { name: "Impreza", nodes: makeNodes(1.4) },
      { name: "Legacy", nodes: makeNodes(1.5) },
      { name: "Forester", nodes: makeNodes(1.7) },
      { name: "Outback", nodes: makeNodes(1.8) },
      { name: "XV", nodes: makeNodes(1.5) },
      { name: "WRX STI", nodes: makeNodes(3.0) },
      { name: "BRZ", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Mitsubishi",
    models: [
      { name: "Colt", nodes: makeNodes(1.0) },
      { name: "Lancer", nodes: makeNodes(1.2) },
      { name: "Outlander", nodes: makeNodes(1.6) },
      { name: "Eclipse Cross", nodes: makeNodes(1.7) },
      { name: "Pajero", nodes: makeNodes(2.2) },
      { name: "L200", nodes: makeNodes(1.8) },
      { name: "ASX", nodes: makeNodes(1.3) },
    ],
  },
  {
    brand: "Suzuki",
    models: [
      { name: "Swift", nodes: makeNodes(1.0) },
      { name: "Vitara", nodes: makeNodes(1.2) },
      { name: "Jimny", nodes: makeNodes(1.3) },
      { name: "SX4", nodes: makeNodes(1.1) },
      { name: "Grand Vitara", nodes: makeNodes(1.4) },
    ],
  },
  {
    brand: "Lexus",
    models: [
      { name: "IS", nodes: makeNodes(2.5) },
      { name: "ES", nodes: makeNodes(2.6) },
      { name: "GS", nodes: makeNodes(2.8) },
      { name: "LS", nodes: makeNodes(3.5) },
      { name: "NX", nodes: makeNodes(2.4) },
      { name: "RX", nodes: makeNodes(2.7) },
      { name: "LX", nodes: makeNodes(3.3) },
      { name: "UX", nodes: makeNodes(2.2) },
      { name: "LC 500", nodes: makeNodes(4.0) },
    ],
  },
  {
    brand: "Infiniti",
    models: [
      { name: "Q30", nodes: makeNodes(1.8) },
      { name: "Q50", nodes: makeNodes(2.2) },
      { name: "Q60", nodes: makeNodes(2.5) },
      { name: "QX50", nodes: makeNodes(2.3) },
      { name: "QX60", nodes: makeNodes(2.6) },
      { name: "QX80", nodes: makeNodes(3.0) },
    ],
  },
  {
    brand: "Acura",
    models: [
      { name: "TLX", nodes: makeNodes(2.0) },
      { name: "RDX", nodes: makeNodes(2.1) },
      { name: "MDX", nodes: makeNodes(2.4) },
      { name: "NSX", nodes: makeNodes(4.0) },
    ],
  },
  // ══ КОРЕЙСКИЕ ══
  {
    brand: "Hyundai",
    models: [
      { name: "Solaris", nodes: makeNodes(1.0) },
      { name: "Elantra", nodes: makeNodes(1.1) },
      { name: "i30", nodes: makeNodes(1.1) },
      { name: "Tucson", nodes: makeNodes(1.4) },
      { name: "Creta", nodes: makeNodes(1.2) },
      { name: "Santa Fe", nodes: makeNodes(1.7) },
      { name: "Palisade", nodes: makeNodes(2.0) },
      { name: "IONIQ 5", nodes: makeNodes(1.8) },
      { name: "Sonata", nodes: makeNodes(1.5) },
      { name: "Genesis G80", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Kia",
    models: [
      { name: "Rio", nodes: makeNodes(1.0) },
      { name: "Cerato", nodes: makeNodes(1.1) },
      { name: "Sportage", nodes: makeNodes(1.4) },
      { name: "Sorento", nodes: makeNodes(1.7) },
      { name: "Stinger", nodes: makeNodes(2.2) },
      { name: "Mohave", nodes: makeNodes(2.0) },
      { name: "EV6", nodes: makeNodes(1.9) },
      { name: "K5", nodes: makeNodes(1.5) },
      { name: "Carnival", nodes: makeNodes(1.8) },
    ],
  },
  {
    brand: "Genesis",
    models: [
      { name: "G70", nodes: makeNodes(2.3) },
      { name: "G80", nodes: makeNodes(2.7) },
      { name: "G90", nodes: makeNodes(3.2) },
      { name: "GV70", nodes: makeNodes(2.5) },
      { name: "GV80", nodes: makeNodes(2.9) },
    ],
  },
  {
    brand: "SsangYong",
    models: [
      { name: "Rexton", nodes: makeNodes(1.3) },
      { name: "Tivoli", nodes: makeNodes(1.1) },
      { name: "Korando", nodes: makeNodes(1.2) },
      { name: "Musso", nodes: makeNodes(1.4) },
    ],
  },
  // ══ АМЕРИКАНСКИЕ ══
  {
    brand: "Ford",
    models: [
      { name: "Fiesta", nodes: makeNodes(1.0) },
      { name: "Focus", nodes: makeNodes(1.1) },
      { name: "Mondeo", nodes: makeNodes(1.4) },
      { name: "Explorer", nodes: makeNodes(2.0) },
      { name: "Expedition", nodes: makeNodes(2.2) },
      { name: "Mustang", nodes: makeNodes(2.5) },
      { name: "F-150", nodes: makeNodes(2.0) },
      { name: "Ranger", nodes: makeNodes(1.6) },
      { name: "EcoSport", nodes: makeNodes(1.2) },
    ],
  },
  {
    brand: "Chevrolet",
    models: [
      { name: "Aveo", nodes: makeNodes(1.0) },
      { name: "Cruze", nodes: makeNodes(1.2) },
      { name: "Malibu", nodes: makeNodes(1.5) },
      { name: "Camaro", nodes: makeNodes(2.5) },
      { name: "Corvette", nodes: makeNodes(4.0) },
      { name: "Equinox", nodes: makeNodes(1.5) },
      { name: "Tahoe", nodes: makeNodes(2.2) },
      { name: "Traverse", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Jeep",
    models: [
      { name: "Renegade", nodes: makeNodes(1.4) },
      { name: "Compass", nodes: makeNodes(1.5) },
      { name: "Cherokee", nodes: makeNodes(1.8) },
      { name: "Grand Cherokee", nodes: makeNodes(2.2) },
      { name: "Wrangler", nodes: makeNodes(2.5) },
      { name: "Gladiator", nodes: makeNodes(2.3) },
    ],
  },
  {
    brand: "Cadillac",
    models: [
      { name: "CT4", nodes: makeNodes(2.5) },
      { name: "CT5", nodes: makeNodes(2.8) },
      { name: "XT4", nodes: makeNodes(2.4) },
      { name: "XT5", nodes: makeNodes(2.6) },
      { name: "XT6", nodes: makeNodes(2.8) },
      { name: "Escalade", nodes: makeNodes(3.5) },
    ],
  },
  {
    brand: "Dodge",
    models: [
      { name: "Charger", nodes: makeNodes(2.0) },
      { name: "Challenger", nodes: makeNodes(2.2) },
      { name: "Durango", nodes: makeNodes(2.0) },
      { name: "Journey", nodes: makeNodes(1.5) },
      { name: "Ram 1500", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Chrysler",
    models: [
      { name: "300C", nodes: makeNodes(1.8) },
      { name: "Pacifica", nodes: makeNodes(1.7) },
      { name: "Voyager", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Lincoln",
    models: [
      { name: "MKZ", nodes: makeNodes(2.5) },
      { name: "Continental", nodes: makeNodes(3.0) },
      { name: "Navigator", nodes: makeNodes(3.5) },
      { name: "Aviator", nodes: makeNodes(2.8) },
      { name: "Corsair", nodes: makeNodes(2.4) },
    ],
  },
  {
    brand: "Tesla",
    models: [
      { name: "Model 3", nodes: makeNodes(2.0) },
      { name: "Model S", nodes: makeNodes(3.0) },
      { name: "Model X", nodes: makeNodes(3.2) },
      { name: "Model Y", nodes: makeNodes(2.2) },
      { name: "Cybertruck", nodes: makeNodes(3.5) },
    ],
  },
  // ══ ФРАНЦУЗСКИЕ ══
  {
    brand: "Renault",
    models: [
      { name: "Logan", nodes: makeNodes(0.9) },
      { name: "Sandero", nodes: makeNodes(0.9) },
      { name: "Duster", nodes: makeNodes(1.1) },
      { name: "Megane", nodes: makeNodes(1.2) },
      { name: "Arkana", nodes: makeNodes(1.3) },
      { name: "Koleos", nodes: makeNodes(1.5) },
      { name: "Captur", nodes: makeNodes(1.1) },
      { name: "Kadjar", nodes: makeNodes(1.3) },
    ],
  },
  {
    brand: "Peugeot",
    models: [
      { name: "208", nodes: makeNodes(1.1) },
      { name: "301", nodes: makeNodes(1.0) },
      { name: "308", nodes: makeNodes(1.2) },
      { name: "408", nodes: makeNodes(1.3) },
      { name: "2008", nodes: makeNodes(1.2) },
      { name: "3008", nodes: makeNodes(1.5) },
      { name: "5008", nodes: makeNodes(1.7) },
    ],
  },
  {
    brand: "Citroën",
    models: [
      { name: "C3", nodes: makeNodes(1.0) },
      { name: "C4", nodes: makeNodes(1.2) },
      { name: "C5 Aircross", nodes: makeNodes(1.5) },
      { name: "Berlingo", nodes: makeNodes(1.1) },
      { name: "C-Elysée", nodes: makeNodes(0.9) },
    ],
  },
  // ══ ИТАЛЬЯНСКИЕ ══
  {
    brand: "Fiat",
    models: [
      { name: "500", nodes: makeNodes(1.0) },
      { name: "Punto", nodes: makeNodes(0.9) },
      { name: "Tipo", nodes: makeNodes(1.0) },
      { name: "Panda", nodes: makeNodes(0.9) },
      { name: "Bravo", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Alfa Romeo",
    models: [
      { name: "Giulia", nodes: makeNodes(2.5) },
      { name: "Stelvio", nodes: makeNodes(2.7) },
      { name: "Tonale", nodes: makeNodes(2.2) },
      { name: "Giulietta", nodes: makeNodes(1.8) },
      { name: "4C", nodes: makeNodes(3.5) },
    ],
  },
  {
    brand: "Ferrari",
    models: [
      { name: "Roma", nodes: makeNodes(7.0) },
      { name: "SF90", nodes: makeNodes(9.0) },
      { name: "296 GTB", nodes: makeNodes(8.0) },
      { name: "F8 Tributo", nodes: makeNodes(8.5) },
      { name: "Portofino", nodes: makeNodes(7.5) },
    ],
  },
  {
    brand: "Lamborghini",
    models: [
      { name: "Huracán", nodes: makeNodes(9.0) },
      { name: "Urus", nodes: makeNodes(8.0) },
      { name: "Revuelto", nodes: makeNodes(10.0) },
    ],
  },
  {
    brand: "Maserati",
    models: [
      { name: "Ghibli", nodes: makeNodes(4.0) },
      { name: "Quattroporte", nodes: makeNodes(5.0) },
      { name: "Levante", nodes: makeNodes(4.5) },
      { name: "GranTurismo", nodes: makeNodes(5.5) },
    ],
  },
  // ══ БРИТАНСКИЕ ══
  {
    brand: "Land Rover",
    models: [
      { name: "Defender", nodes: makeNodes(3.0) },
      { name: "Discovery", nodes: makeNodes(2.8) },
      { name: "Discovery Sport", nodes: makeNodes(2.3) },
      { name: "Range Rover", nodes: makeNodes(4.0) },
      { name: "Range Rover Sport", nodes: makeNodes(3.5) },
      { name: "Range Rover Evoque", nodes: makeNodes(2.5) },
      { name: "Freelander", nodes: makeNodes(1.9) },
    ],
  },
  {
    brand: "Jaguar",
    models: [
      { name: "XE", nodes: makeNodes(2.5) },
      { name: "XF", nodes: makeNodes(2.8) },
      { name: "XJ", nodes: makeNodes(3.5) },
      { name: "F-Pace", nodes: makeNodes(3.0) },
      { name: "E-Pace", nodes: makeNodes(2.4) },
      { name: "F-Type", nodes: makeNodes(4.0) },
    ],
  },
  {
    brand: "Bentley",
    models: [
      { name: "Continental GT", nodes: makeNodes(8.0) },
      { name: "Flying Spur", nodes: makeNodes(8.5) },
      { name: "Bentayga", nodes: makeNodes(9.0) },
      { name: "Mulsanne", nodes: makeNodes(10.0) },
    ],
  },
  {
    brand: "Rolls-Royce",
    models: [
      { name: "Ghost", nodes: makeNodes(12.0) },
      { name: "Phantom", nodes: makeNodes(15.0) },
      { name: "Wraith", nodes: makeNodes(12.0) },
      { name: "Cullinan", nodes: makeNodes(14.0) },
    ],
  },
  {
    brand: "Aston Martin",
    models: [
      { name: "Vantage", nodes: makeNodes(6.0) },
      { name: "DB11", nodes: makeNodes(7.0) },
      { name: "DBX", nodes: makeNodes(6.5) },
      { name: "DBS", nodes: makeNodes(7.5) },
    ],
  },
  {
    brand: "Mini",
    models: [
      { name: "Hatch", nodes: makeNodes(1.5) },
      { name: "Clubman", nodes: makeNodes(1.6) },
      { name: "Countryman", nodes: makeNodes(1.8) },
      { name: "Convertible", nodes: makeNodes(1.7) },
      { name: "Paceman", nodes: makeNodes(1.6) },
    ],
  },
  // ══ ШВЕДСКИЕ ══
  {
    brand: "Volvo",
    models: [
      { name: "S60", nodes: makeNodes(2.0) },
      { name: "S90", nodes: makeNodes(2.5) },
      { name: "V40", nodes: makeNodes(1.7) },
      { name: "V60", nodes: makeNodes(2.0) },
      { name: "XC40", nodes: makeNodes(2.0) },
      { name: "XC60", nodes: makeNodes(2.4) },
      { name: "XC90", nodes: makeNodes(2.8) },
    ],
  },
  // ══ ЧЕШСКИЕ ══
  {
    brand: "Škoda",
    models: [
      { name: "Fabia", nodes: makeNodes(1.0) },
      { name: "Rapid", nodes: makeNodes(1.0) },
      { name: "Octavia", nodes: makeNodes(1.2) },
      { name: "Superb", nodes: makeNodes(1.5) },
      { name: "Karoq", nodes: makeNodes(1.4) },
      { name: "Kodiaq", nodes: makeNodes(1.7) },
      { name: "Enyaq", nodes: makeNodes(1.8) },
    ],
  },
  // ══ РУМЫНСКИЕ/ПРОЧИЕ ЕВРОПЕЙСКИЕ ══
  {
    brand: "Dacia",
    models: [
      { name: "Logan", nodes: makeNodes(0.8) },
      { name: "Sandero", nodes: makeNodes(0.8) },
      { name: "Duster", nodes: makeNodes(1.0) },
      { name: "Jogger", nodes: makeNodes(0.9) },
      { name: "Spring", nodes: makeNodes(0.9) },
    ],
  },
  {
    brand: "SEAT",
    models: [
      { name: "Ibiza", nodes: makeNodes(1.0) },
      { name: "Leon", nodes: makeNodes(1.2) },
      { name: "Ateca", nodes: makeNodes(1.3) },
      { name: "Arona", nodes: makeNodes(1.1) },
      { name: "Tarraco", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Cupra",
    models: [
      { name: "Formentor", nodes: makeNodes(2.0) },
      { name: "Born", nodes: makeNodes(1.9) },
      { name: "Ateca", nodes: makeNodes(2.0) },
    ],
  },
  // ══ РОССИЙСКИЕ ══
  {
    brand: "Lada",
    models: [
      { name: "Granta", nodes: makeNodes(0.7) },
      { name: "Vesta", nodes: makeNodes(0.8) },
      { name: "XRAY", nodes: makeNodes(0.8) },
      { name: "Niva Legend", nodes: makeNodes(0.7) },
      { name: "Niva Travel", nodes: makeNodes(0.8) },
      { name: "Largus", nodes: makeNodes(0.7) },
      { name: "Kalina", nodes: makeNodes(0.6) },
    ],
  },
  {
    brand: "УАЗ",
    models: [
      { name: "Патриот", nodes: makeNodes(0.8) },
      { name: "Хантер", nodes: makeNodes(0.7) },
      { name: "Буханка", nodes: makeNodes(0.6) },
      { name: "Пикап", nodes: makeNodes(0.8) },
    ],
  },
  {
    brand: "ГАЗ",
    models: [
      { name: "Газель Next", nodes: makeNodes(0.8) },
      { name: "Газель Бизнес", nodes: makeNodes(0.7) },
      { name: "ГАЗон Next", nodes: makeNodes(0.9) },
    ],
  },
  // ══ КИТАЙСКИЕ ══
  {
    brand: "Haval",
    models: [
      { name: "F7", nodes: makeNodes(1.1) },
      { name: "Jolion", nodes: makeNodes(1.0) },
      { name: "H6", nodes: makeNodes(1.2) },
      { name: "H9", nodes: makeNodes(1.6) },
      { name: "Dargo", nodes: makeNodes(1.3) },
      { name: "M6", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Chery",
    models: [
      { name: "Tiggo 4", nodes: makeNodes(0.9) },
      { name: "Tiggo 7", nodes: makeNodes(1.1) },
      { name: "Tiggo 8", nodes: makeNodes(1.3) },
      { name: "Arrizo 6", nodes: makeNodes(0.9) },
      { name: "Omoda 5", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Geely",
    models: [
      { name: "Atlas", nodes: makeNodes(1.0) },
      { name: "Coolray", nodes: makeNodes(1.0) },
      { name: "Tugella", nodes: makeNodes(1.2) },
      { name: "Monjaro", nodes: makeNodes(1.4) },
      { name: "Cityray", nodes: makeNodes(1.1) },
    ],
  },
  {
    brand: "Changan",
    models: [
      { name: "CS35 Plus", nodes: makeNodes(0.9) },
      { name: "CS55 Plus", nodes: makeNodes(1.1) },
      { name: "CS75 Plus", nodes: makeNodes(1.2) },
      { name: "Uni-K", nodes: makeNodes(1.4) },
      { name: "Uni-T", nodes: makeNodes(1.2) },
    ],
  },
  {
    brand: "BYD",
    models: [
      { name: "Han", nodes: makeNodes(1.5) },
      { name: "Tang", nodes: makeNodes(1.7) },
      { name: "Song Plus", nodes: makeNodes(1.3) },
      { name: "Seal", nodes: makeNodes(1.6) },
      { name: "Atto 3", nodes: makeNodes(1.4) },
    ],
  },
  {
    brand: "BAIC",
    models: [
      { name: "X35", nodes: makeNodes(0.8) },
      { name: "X55", nodes: makeNodes(1.0) },
      { name: "BJ40", nodes: makeNodes(1.2) },
      { name: "BJ80", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Omoda",
    models: [
      { name: "Omoda 5", nodes: makeNodes(1.0) },
      { name: "Omoda C5", nodes: makeNodes(1.1) },
    ],
  },
  {
    brand: "Exeed",
    models: [
      { name: "TXL", nodes: makeNodes(1.3) },
      { name: "VX", nodes: makeNodes(1.5) },
      { name: "LX", nodes: makeNodes(1.4) },
    ],
  },
  {
    brand: "Tank",
    models: [
      { name: "Tank 300", nodes: makeNodes(1.8) },
      { name: "Tank 500", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Lixiang",
    models: [
      { name: "L7", nodes: makeNodes(1.8) },
      { name: "L8", nodes: makeNodes(2.0) },
      { name: "L9", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Dongfeng",
    models: [
      { name: "Voyah Free", nodes: makeNodes(1.6) },
      { name: "AX7 Pro", nodes: makeNodes(1.0) },
      { name: "Rich 6", nodes: makeNodes(0.9) },
    ],
  },
  {
    brand: "JAC",
    models: [
      { name: "JS4", nodes: makeNodes(0.9) },
      { name: "JS6", nodes: makeNodes(1.0) },
      { name: "T8 Pro", nodes: makeNodes(1.1) },
    ],
  },
  // ══ ПРОЧИЕ ══
  {
    brand: "Volvo (грузовые)",
    models: [
      { name: "FH", nodes: makeNodes(2.5) },
      { name: "FM", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Saab",
    models: [
      { name: "9-3", nodes: makeNodes(1.5) },
      { name: "9-5", nodes: makeNodes(1.7) },
    ],
  },
  {
    brand: "Buick",
    models: [
      { name: "Enclave", nodes: makeNodes(1.8) },
      { name: "Encore", nodes: makeNodes(1.3) },
      { name: "LaCrosse", nodes: makeNodes(1.7) },
    ],
  },
  {
    brand: "GMC",
    models: [
      { name: "Sierra", nodes: makeNodes(2.0) },
      { name: "Yukon", nodes: makeNodes(2.3) },
      { name: "Terrain", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Pontiac",
    models: [
      { name: "Grand Prix", nodes: makeNodes(1.3) },
      { name: "Firebird", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Hummer",
    models: [
      { name: "H2", nodes: makeNodes(2.5) },
      { name: "H3", nodes: makeNodes(2.0) },
      { name: "EV", nodes: makeNodes(3.5) },
    ],
  },
  {
    brand: "RAM",
    models: [
      { name: "1500", nodes: makeNodes(2.0) },
      { name: "2500", nodes: makeNodes(2.3) },
      { name: "TRX", nodes: makeNodes(3.5) },
    ],
  },
  {
    brand: "Acura",
    models: [
      { name: "ILX", nodes: makeNodes(1.8) },
      { name: "TLX", nodes: makeNodes(2.0) },
      { name: "MDX", nodes: makeNodes(2.4) },
    ],
  },
  {
    brand: "Datsun",
    models: [
      { name: "on-DO", nodes: makeNodes(0.7) },
      { name: "mi-DO", nodes: makeNodes(0.7) },
    ],
  },
  {
    brand: "Isuzu",
    models: [
      { name: "D-Max", nodes: makeNodes(1.5) },
      { name: "MU-X", nodes: makeNodes(1.7) },
      { name: "Trooper", nodes: makeNodes(1.6) },
    ],
  },
  {
    brand: "Great Wall",
    models: [
      { name: "Hover H5", nodes: makeNodes(1.0) },
      { name: "Wingle 7", nodes: makeNodes(1.0) },
      { name: "Poer", nodes: makeNodes(1.1) },
    ],
  },
  {
    brand: "Foton",
    models: [
      { name: "Tunland", nodes: makeNodes(0.9) },
      { name: "Sauvana", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Maxus",
    models: [
      { name: "T60", nodes: makeNodes(1.0) },
      { name: "D60", nodes: makeNodes(1.1) },
      { name: "G10", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Brilliance",
    models: [
      { name: "V5", nodes: makeNodes(0.9) },
      { name: "H530", nodes: makeNodes(0.8) },
    ],
  },
  {
    brand: "Lifan",
    models: [
      { name: "X60", nodes: makeNodes(0.7) },
      { name: "X70", nodes: makeNodes(0.8) },
      { name: "Murman", nodes: makeNodes(0.9) },
    ],
  },
  {
    brand: "Tagaz",
    models: [
      { name: "Aquila", nodes: makeNodes(0.7) },
      { name: "Vortex", nodes: makeNodes(0.7) },
    ],
  },
  {
    brand: "Москвич",
    models: [
      { name: "3", nodes: makeNodes(0.9) },
      { name: "3e", nodes: makeNodes(1.0) },
      { name: "6", nodes: makeNodes(1.0) },
    ],
  },
];

export const ALL_BRANDS = CAR_DATA.map(b => b.brand);

export const NODES_CATEGORIES = [...new Set(BASE_NODES.map(n => n.category))];

export function getModelsForBrand(brand: string): string[] {
  return CAR_DATA.find(b => b.brand === brand)?.models.map(m => m.name) || [];
}

export function getNodesForBrandModel(brand: string, model: string): RepairNode[] {
  return CAR_DATA.find(b => b.brand === brand)?.models.find(m => m.name === model)?.nodes || [];
}

export function getNodesByCategory(brand: string, model: string, category?: string): RepairNode[] {
  const nodes = getNodesForBrandModel(brand, model);
  return category ? nodes.filter(n => n.category === category) : nodes;
}
