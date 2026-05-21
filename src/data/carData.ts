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

// ~80 узлов ремонта с категориями — базовый шаблон, цены масштабируются коэффициентом марки
// Цены соответствуют уровню московских автосервисов
export const BASE_NODES: Omit<RepairNode, "price">[] = [
  // ── Двигатель ──
  { name: "Замена масла и фильтра", time: "30 мин", category: "Двигатель" },
  { name: "Замена воздушного фильтра", time: "15 мин", category: "Двигатель" },
  { name: "Замена салонного фильтра", time: "20 мин", category: "Двигатель" },
  { name: "Диагностика двигателя", time: "1 час", category: "Двигатель" },
  { name: "Замена ремня ГРМ", time: "3–5 часов", category: "Двигатель" },
  { name: "Замена цепи ГРМ", time: "4–6 часов", category: "Двигатель" },
  { name: "Замена прокладки ГБЦ", time: "5–8 часов", category: "Двигатель" },
  { name: "Снятие/установка ГБЦ", time: "6–10 часов", category: "Двигатель" },
  { name: "Шлифовка ГБЦ", time: "1 день", category: "Двигатель" },
  { name: "Капитальный ремонт ДВС", time: "3–7 дней", category: "Двигатель" },
  { name: "Замена помпы охлаждения", time: "2–4 часа", category: "Двигатель" },
  { name: "Замена термостата", time: "1–2 часа", category: "Двигатель" },
  { name: "Замена радиатора охлаждения", time: "2–4 часа", category: "Двигатель" },
  { name: "Замена расширительного бачка", time: "30 мин", category: "Двигатель" },
  { name: "Замена антифриза", time: "1 час", category: "Двигатель" },
  { name: "Промывка топливной системы", time: "2–3 часа", category: "Двигатель" },
  { name: "Замена топливного насоса", time: "2–3 часа", category: "Двигатель" },
  { name: "Замена топливного фильтра", time: "30 мин", category: "Двигатель" },
  { name: "Чистка форсунок", time: "2–3 часа", category: "Двигатель" },
  { name: "Замена форсунок", time: "2–4 часа", category: "Двигатель" },
  { name: "Замена прокладки клапанной крышки", time: "1–2 часа", category: "Двигатель" },
  { name: "Замена сальников коленвала", time: "2–4 часа", category: "Двигатель" },
  { name: "Замена маслосъёмных колпачков", time: "3–5 часов", category: "Двигатель" },
  { name: "Замена поршневых колец", time: "1–2 дня", category: "Двигатель" },
  { name: "Регулировка клапанов", time: "2–4 часа", category: "Двигатель" },
  // ── КПП ──
  { name: "Замена масла в МКПП", time: "1 час", category: "КПП" },
  { name: "Замена масла в АКПП", time: "1–2 часа", category: "КПП" },
  { name: "Диагностика КПП", time: "1–2 часа", category: "КПП" },
  { name: "Ремонт АКПП", time: "2–5 дней", category: "КПП" },
  { name: "Замена гидроблока АКПП", time: "4–6 часов", category: "КПП" },
  { name: "Замена сцепления", time: "4–6 часов", category: "КПП" },
  { name: "Замена двухмассового маховика", time: "5–7 часов", category: "КПП" },
  { name: "Ремонт вариатора (CVT)", time: "2–4 дня", category: "КПП" },
  { name: "Замена кулисы КПП", time: "1–2 часа", category: "КПП" },
  { name: "Замена ШРУС (внешний)", time: "1.5–2 часа", category: "КПП" },
  { name: "Замена ШРУС (внутренний)", time: "2–3 часа", category: "КПП" },
  { name: "Замена приводного вала", time: "2–4 часа", category: "КПП" },
  { name: "Замена пыльника ШРУС", time: "1–2 часа", category: "КПП" },
  { name: "Замена подшипника вторичного вала", time: "3–5 часов", category: "КПП" },
  // ── Тормоза ──
  { name: "Замена передних колодок", time: "45 мин", category: "Тормоза" },
  { name: "Замена задних колодок", time: "1 час", category: "Тормоза" },
  { name: "Замена передних дисков", time: "1 час", category: "Тормоза" },
  { name: "Замена задних дисков", time: "1.5 часа", category: "Тормоза" },
  { name: "Замена тормозной жидкости", time: "1 час", category: "Тормоза" },
  { name: "Прокачка тормозной системы", time: "1 час", category: "Тормоза" },
  { name: "Замена главного тормозного цилиндра", time: "2–3 часа", category: "Тормоза" },
  { name: "Замена рабочего тормозного цилиндра", time: "1.5–2 часа", category: "Тормоза" },
  { name: "Замена тормозных трубок", time: "2–3 часа", category: "Тормоза" },
  { name: "Ремонт суппорта (чистка, смазка)", time: "1–2 часа", category: "Тормоза" },
  { name: "Замена суппорта", time: "2–3 часа", category: "Тормоза" },
  { name: "Замена датчика ABS", time: "1 час", category: "Тормоза" },
  { name: "Замена тормозного шланга", time: "1 час", category: "Тормоза" },
  { name: "Замена тросика ручного тормоза", time: "1.5 часа", category: "Тормоза" },
  // ── Подвеска ──
  { name: "Замена передних амортизаторов", time: "2 часа", category: "Подвеска" },
  { name: "Замена задних амортизаторов", time: "1.5–2 часа", category: "Подвеска" },
  { name: "Замена опорного подшипника", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена переднего рычага", time: "2 часа", category: "Подвеска" },
  { name: "Замена заднего рычага", time: "2–3 часа", category: "Подвеска" },
  { name: "Развал-схождение (2D)", time: "1 час", category: "Подвеска" },
  { name: "Развал-схождение (3D)", time: "1.5 часа", category: "Подвеска" },
  { name: "Замена рулевых наконечников", time: "1.5 часа", category: "Подвеска" },
  { name: "Замена рулевой тяги", time: "2 часа", category: "Подвеска" },
  { name: "Замена шаровых опор", time: "1.5–2 часа", category: "Подвеска" },
  { name: "Замена стойки стабилизатора", time: "1 час", category: "Подвеска" },
  { name: "Замена втулки стабилизатора", time: "1–1.5 часа", category: "Подвеска" },
  { name: "Замена ступичного подшипника", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена рулевой рейки", time: "3–5 часов", category: "Подвеска" },
  { name: "Ремонт рулевой рейки", time: "3–4 часа", category: "Подвеска" },
  { name: "Замена рулевой колонки", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена пружин подвески", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена сайлентблоков рычага", time: "2–3 часа", category: "Подвеска" },
  { name: "Замена подрамника", time: "3–5 часов", category: "Подвеска" },
  // ── Электрика ──
  { name: "Компьютерная диагностика", time: "30 мин", category: "Электрика" },
  { name: "Диагностика ошибок по кодам", time: "30 мин", category: "Электрика" },
  { name: "Замена аккумулятора", time: "30 мин", category: "Электрика" },
  { name: "Диагностика и зарядка АКБ", time: "1 час", category: "Электрика" },
  { name: "Ремонт генератора", time: "2–4 часа", category: "Электрика" },
  { name: "Замена генератора", time: "2–3 часа", category: "Электрика" },
  { name: "Ремонт стартера", time: "2–3 часа", category: "Электрика" },
  { name: "Замена стартера", time: "1.5–2 часа", category: "Электрика" },
  { name: "Замена свечей зажигания", time: "1 час", category: "Электрика" },
  { name: "Замена свечей накала (дизель)", time: "1.5–2 часа", category: "Электрика" },
  { name: "Замена катушки зажигания", time: "1–2 часа", category: "Электрика" },
  { name: "Ремонт кондиционера", time: "2–4 часа", category: "Электрика" },
  { name: "Заправка кондиционера фреоном", time: "1 час", category: "Электрика" },
  { name: "Замена компрессора кондиционера", time: "3–5 часов", category: "Электрика" },
  { name: "Замена лямбда-зонда", time: "1–2 часа", category: "Электрика" },
  { name: "Замена датчика кислорода", time: "1–2 часа", category: "Электрика" },
  { name: "Прошивка / перепрошивка ЭБУ", time: "2–3 часа", category: "Электрика" },
  { name: "Замена ЭБУ двигателя", time: "2–4 часа", category: "Электрика" },
  { name: "Ремонт системы освещения", time: "1–2 часа", category: "Электрика" },
  { name: "Замена ламп фар", time: "30–60 мин", category: "Электрика" },
  { name: "Замена датчика парковки", time: "1.5 часа", category: "Электрика" },
  { name: "Замена датчика температуры ОЖ", time: "30–60 мин", category: "Электрика" },
  { name: "Замена датчика давления масла", time: "30–60 мин", category: "Электрика" },
  { name: "Замена топливного датчика", time: "1–2 часа", category: "Электрика" },
  { name: "Ремонт проводки / жгута", time: "2–6 часов", category: "Электрика" },
  { name: "Установка сигнализации", time: "3–5 часов", category: "Электрика" },
  { name: "Установка видеорегистратора", time: "1–2 часа", category: "Электрика" },
  { name: "Замена предохранителей", time: "30 мин", category: "Электрика" },
];

// Базовые цены (работа, без запчастей) — уровень московского сервиса
const BASE_PRICES: [number, number][] = [
  // Двигатель (25 позиций)
  [700, 1200],      // Замена масла и фильтра
  [200, 400],       // Замена воздушного фильтра
  [300, 600],       // Замена салонного фильтра
  [1500, 3000],     // Диагностика двигателя
  [4500, 12000],    // Замена ремня ГРМ
  [7000, 18000],    // Замена цепи ГРМ
  [12000, 32000],   // Замена прокладки ГБЦ
  [18000, 45000],   // Снятие/установка ГБЦ
  [8000, 20000],    // Шлифовка ГБЦ
  [25000, 80000],   // Капитальный ремонт ДВС
  [2500, 7000],     // Замена помпы
  [1200, 3500],     // Замена термостата
  [3000, 9000],     // Замена радиатора
  [500, 1500],      // Замена расширительного бачка
  [800, 2000],      // Замена антифриза
  [1800, 4500],     // Промывка топл. системы
  [3500, 9000],     // Замена топл. насоса
  [600, 1500],      // Замена топл. фильтра
  [3000, 7000],     // Чистка форсунок
  [4000, 12000],    // Замена форсунок
  [1000, 3000],     // Замена прокладки кл. крышки
  [3500, 9000],     // Замена сальников коленвала
  [4000, 12000],    // Замена маслосъёмных колпачков
  [15000, 40000],   // Замена поршневых колец
  [2000, 6000],     // Регулировка клапанов
  // КПП (14 позиций)
  [1000, 2500],     // Замена масла в МКПП
  [1200, 3500],     // Замена масла в АКПП
  [2000, 4500],     // Диагностика КПП
  [15000, 60000],   // Ремонт АКПП
  [8000, 25000],    // Замена гидроблока АКПП
  [7000, 18000],    // Замена сцепления
  [15000, 40000],   // Замена двухмассового маховика
  [18000, 65000],   // Ремонт вариатора
  [1200, 3500],     // Замена кулисы КПП
  [2500, 6000],     // Замена ШРУС внешнего
  [3500, 8000],     // Замена ШРУС внутреннего
  [4500, 12000],    // Замена приводного вала
  [1000, 2500],     // Замена пыльника ШРУС
  [5000, 14000],    // Замена подшипника вторич. вала
  // Тормоза (14 позиций)
  [1000, 2500],     // Замена передних колодок
  [1200, 3000],     // Замена задних колодок
  [2500, 6000],     // Замена передних дисков
  [3000, 8000],     // Замена задних дисков
  [800, 2000],      // Замена тормозной жидкости
  [1000, 2500],     // Прокачка тормозов
  [3000, 8000],     // Замена главного цилиндра
  [1500, 4000],     // Замена рабочего цилиндра
  [2500, 7000],     // Замена тормозных трубок
  [1500, 4500],     // Ремонт суппорта
  [3500, 9000],     // Замена суппорта
  [1000, 3000],     // Замена датчика ABS
  [800, 2000],      // Замена тормозного шланга
  [1500, 4000],     // Замена тросика ручника
  // Подвеска (19 позиций)
  [2500, 7000],     // Замена передних амортизаторов
  [2000, 6000],     // Замена задних амортизаторов
  [2000, 6000],     // Замена опорного подшипника
  [2000, 5500],     // Замена переднего рычага
  [2500, 7000],     // Замена заднего рычага
  [1800, 3500],     // Развал-схождение 2D
  [2200, 4500],     // Развал-схождение 3D
  [1500, 4000],     // Замена рулевых наконечников
  [2000, 5000],     // Замена рулевой тяги
  [1500, 5000],     // Замена шаровых опор
  [800, 2500],      // Замена стойки стабилизатора
  [1000, 3000],     // Замена втулки стабилизатора
  [2500, 8000],     // Замена ступичного подшипника
  [7000, 22000],    // Замена рулевой рейки
  [5000, 15000],    // Ремонт рулевой рейки
  [3500, 10000],    // Замена рулевой колонки
  [2000, 6000],     // Замена пружин подвески
  [2500, 7000],     // Замена сайлентблоков рычага
  [5000, 15000],    // Замена подрамника
  // Электрика (27 позиций)
  [1000, 2000],     // Компьютерная диагностика
  [800, 1500],      // Диагностика ошибок по кодам
  [400, 900],       // Замена аккумулятора
  [700, 1500],      // Диагностика и зарядка АКБ
  [2500, 7000],     // Ремонт генератора
  [2500, 6000],     // Замена генератора
  [2000, 6000],     // Ремонт стартера
  [2000, 5000],     // Замена стартера
  [700, 2000],      // Замена свечей зажигания
  [2000, 5000],     // Замена свечей накала
  [1200, 3500],     // Замена катушки зажигания
  [2500, 8000],     // Ремонт кондиционера
  [1200, 3000],     // Заправка кондиционера
  [5000, 15000],    // Замена компрессора кондиционера
  [1200, 3500],     // Замена лямбда-зонда
  [1200, 3500],     // Замена датчика кислорода
  [2500, 7000],     // Прошивка ЭБУ
  [4000, 12000],    // Замена ЭБУ двигателя
  [700, 2500],      // Ремонт системы освещения
  [500, 2000],      // Замена ламп фар
  [1000, 3000],     // Замена датчика парковки
  [600, 1500],      // Замена датчика темп. ОЖ
  [600, 1500],      // Замена датчика давления масла
  [1200, 3500],     // Замена топливного датчика
  [2000, 8000],     // Ремонт проводки/жгута
  [3000, 8000],     // Установка сигнализации
  [800, 2500],      // Установка видеорегистратора
  [300, 800],       // Замена предохранителей
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
      { name: "1 серия (E87)", nodes: makeNodes(1.9) },
      { name: "1 серия (F20)", nodes: makeNodes(2.0) },
      { name: "2 серия", nodes: makeNodes(2.1) },
      { name: "2 серия Active Tourer", nodes: makeNodes(2.1) },
      { name: "3 серия (E46)", nodes: makeNodes(2.0) },
      { name: "3 серия (E90)", nodes: makeNodes(2.1) },
      { name: "3 серия (F30)", nodes: makeNodes(2.2) },
      { name: "3 серия (G20)", nodes: makeNodes(2.3) },
      { name: "4 серия", nodes: makeNodes(2.4) },
      { name: "5 серия (E60)", nodes: makeNodes(2.3) },
      { name: "5 серия (F10)", nodes: makeNodes(2.5) },
      { name: "5 серия (G30)", nodes: makeNodes(2.6) },
      { name: "6 серия Gran Turismo", nodes: makeNodes(2.8) },
      { name: "7 серия (F01)", nodes: makeNodes(3.0) },
      { name: "7 серия (G11)", nodes: makeNodes(3.2) },
      { name: "8 серия", nodes: makeNodes(3.5) },
      { name: "X1 (F48)", nodes: makeNodes(2.0) },
      { name: "X1 (U11)", nodes: makeNodes(2.1) },
      { name: "X2", nodes: makeNodes(2.2) },
      { name: "X3 (F25)", nodes: makeNodes(2.4) },
      { name: "X3 (G01)", nodes: makeNodes(2.5) },
      { name: "X4", nodes: makeNodes(2.6) },
      { name: "X5 (E70)", nodes: makeNodes(2.7) },
      { name: "X5 (F15)", nodes: makeNodes(2.8) },
      { name: "X5 (G05)", nodes: makeNodes(2.9) },
      { name: "X6", nodes: makeNodes(3.0) },
      { name: "X7", nodes: makeNodes(3.3) },
      { name: "iX3", nodes: makeNodes(2.8) },
      { name: "iX", nodes: makeNodes(3.2) },
      { name: "M2", nodes: makeNodes(3.5) },
      { name: "M3", nodes: makeNodes(3.8) },
      { name: "M4", nodes: makeNodes(3.9) },
      { name: "M5", nodes: makeNodes(4.0) },
      { name: "M8", nodes: makeNodes(4.2) },
      { name: "Z4", nodes: makeNodes(2.8) },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "A-класс (W168)", nodes: makeNodes(1.8) },
      { name: "A-класс (W169)", nodes: makeNodes(1.9) },
      { name: "A-класс (W176)", nodes: makeNodes(2.0) },
      { name: "A-класс (W177)", nodes: makeNodes(2.2) },
      { name: "B-класс", nodes: makeNodes(2.1) },
      { name: "C-класс (W203)", nodes: makeNodes(2.2) },
      { name: "C-класс (W204)", nodes: makeNodes(2.4) },
      { name: "C-класс (W205)", nodes: makeNodes(2.5) },
      { name: "C-класс (W206)", nodes: makeNodes(2.6) },
      { name: "E-класс (W211)", nodes: makeNodes(2.5) },
      { name: "E-класс (W212)", nodes: makeNodes(2.7) },
      { name: "E-класс (W213)", nodes: makeNodes(2.8) },
      { name: "S-класс (W221)", nodes: makeNodes(3.3) },
      { name: "S-класс (W222)", nodes: makeNodes(3.4) },
      { name: "S-класс (W223)", nodes: makeNodes(3.5) },
      { name: "GLA (X156)", nodes: makeNodes(2.2) },
      { name: "GLA (H247)", nodes: makeNodes(2.3) },
      { name: "GLB", nodes: makeNodes(2.4) },
      { name: "GLC (X253)", nodes: makeNodes(2.6) },
      { name: "GLC (X254)", nodes: makeNodes(2.7) },
      { name: "GLE (W166)", nodes: makeNodes(2.8) },
      { name: "GLE (V167)", nodes: makeNodes(3.0) },
      { name: "GLS (X167)", nodes: makeNodes(3.4) },
      { name: "AMG GT", nodes: makeNodes(4.2) },
      { name: "AMG C63", nodes: makeNodes(3.8) },
      { name: "AMG E63", nodes: makeNodes(4.0) },
      { name: "CLA", nodes: makeNodes(2.4) },
      { name: "CLS", nodes: makeNodes(3.0) },
      { name: "EQA", nodes: makeNodes(2.5) },
      { name: "EQB", nodes: makeNodes(2.6) },
      { name: "EQC", nodes: makeNodes(3.0) },
      { name: "EQE", nodes: makeNodes(3.2) },
      { name: "EQS", nodes: makeNodes(3.8) },
      { name: "Vito", nodes: makeNodes(2.0) },
      { name: "Sprinter", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Audi",
    models: [
      { name: "A1", nodes: makeNodes(1.9) },
      { name: "A3 (8L)", nodes: makeNodes(1.8) },
      { name: "A3 (8P)", nodes: makeNodes(1.9) },
      { name: "A3 (8V)", nodes: makeNodes(2.0) },
      { name: "A3 (8Y)", nodes: makeNodes(2.1) },
      { name: "A4 (B6)", nodes: makeNodes(2.0) },
      { name: "A4 (B7)", nodes: makeNodes(2.1) },
      { name: "A4 (B8)", nodes: makeNodes(2.3) },
      { name: "A4 (B9)", nodes: makeNodes(2.4) },
      { name: "A5", nodes: makeNodes(2.6) },
      { name: "A6 (C5)", nodes: makeNodes(2.3) },
      { name: "A6 (C6)", nodes: makeNodes(2.5) },
      { name: "A6 (C7)", nodes: makeNodes(2.7) },
      { name: "A6 (C8)", nodes: makeNodes(2.8) },
      { name: "A7", nodes: makeNodes(3.0) },
      { name: "A8 (D3)", nodes: makeNodes(3.2) },
      { name: "A8 (D4)", nodes: makeNodes(3.4) },
      { name: "A8 (D5)", nodes: makeNodes(3.5) },
      { name: "Q2", nodes: makeNodes(2.0) },
      { name: "Q3 (8U)", nodes: makeNodes(2.1) },
      { name: "Q3 (F3)", nodes: makeNodes(2.2) },
      { name: "Q5 (8R)", nodes: makeNodes(2.4) },
      { name: "Q5 (FY)", nodes: makeNodes(2.6) },
      { name: "Q7 (4L)", nodes: makeNodes(2.8) },
      { name: "Q7 (4M)", nodes: makeNodes(3.1) },
      { name: "Q8", nodes: makeNodes(3.4) },
      { name: "e-tron", nodes: makeNodes(3.0) },
      { name: "e-tron GT", nodes: makeNodes(3.5) },
      { name: "TT", nodes: makeNodes(2.8) },
      { name: "R8", nodes: makeNodes(4.5) },
      { name: "RS3", nodes: makeNodes(3.5) },
      { name: "RS6", nodes: makeNodes(4.2) },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      { name: "Polo (4 пок.)", nodes: makeNodes(1.2) },
      { name: "Polo (5 пок.)", nodes: makeNodes(1.3) },
      { name: "Polo Sedan", nodes: makeNodes(1.2) },
      { name: "Golf 5", nodes: makeNodes(1.4) },
      { name: "Golf 6", nodes: makeNodes(1.4) },
      { name: "Golf 7", nodes: makeNodes(1.5) },
      { name: "Golf 8", nodes: makeNodes(1.6) },
      { name: "Golf GTI", nodes: makeNodes(2.0) },
      { name: "Golf R", nodes: makeNodes(2.3) },
      { name: "Jetta 5", nodes: makeNodes(1.4) },
      { name: "Jetta 6", nodes: makeNodes(1.5) },
      { name: "Jetta 7", nodes: makeNodes(1.5) },
      { name: "Passat B6", nodes: makeNodes(1.5) },
      { name: "Passat B7", nodes: makeNodes(1.6) },
      { name: "Passat B8", nodes: makeNodes(1.7) },
      { name: "Passat CC", nodes: makeNodes(1.8) },
      { name: "Tiguan (1 пок.)", nodes: makeNodes(1.7) },
      { name: "Tiguan (2 пок.)", nodes: makeNodes(1.8) },
      { name: "Tiguan Allspace", nodes: makeNodes(1.9) },
      { name: "Touareg (1 пок.)", nodes: makeNodes(2.2) },
      { name: "Touareg (2 пок.)", nodes: makeNodes(2.3) },
      { name: "Touareg (3 пок.)", nodes: makeNodes(2.4) },
      { name: "Arteon", nodes: makeNodes(2.0) },
      { name: "Tayron", nodes: makeNodes(1.9) },
      { name: "Teramont", nodes: makeNodes(2.0) },
      { name: "Multivan", nodes: makeNodes(2.2) },
      { name: "Caravelle", nodes: makeNodes(2.0) },
      { name: "Transporter T5", nodes: makeNodes(1.8) },
      { name: "Transporter T6", nodes: makeNodes(1.9) },
      { name: "Amarok", nodes: makeNodes(2.0) },
      { name: "Scirocco", nodes: makeNodes(1.8) },
      { name: "Sharan", nodes: makeNodes(1.8) },
    ],
  },
  {
    brand: "Porsche",
    models: [
      { name: "911 (996)", nodes: makeNodes(4.0) },
      { name: "911 (997)", nodes: makeNodes(4.2) },
      { name: "911 (991)", nodes: makeNodes(4.4) },
      { name: "911 (992)", nodes: makeNodes(4.5) },
      { name: "911 Turbo", nodes: makeNodes(5.0) },
      { name: "Cayenne (9PA)", nodes: makeNodes(3.2) },
      { name: "Cayenne (92A)", nodes: makeNodes(3.4) },
      { name: "Cayenne (9YA)", nodes: makeNodes(3.5) },
      { name: "Macan (95B)", nodes: makeNodes(2.8) },
      { name: "Macan (J1)", nodes: makeNodes(3.0) },
      { name: "Panamera (970)", nodes: makeNodes(3.8) },
      { name: "Panamera (971)", nodes: makeNodes(4.0) },
      { name: "Taycan", nodes: makeNodes(4.2) },
      { name: "Taycan Cross Turismo", nodes: makeNodes(4.3) },
      { name: "Boxster (986)", nodes: makeNodes(3.5) },
      { name: "Boxster (987)", nodes: makeNodes(3.7) },
      { name: "Cayman", nodes: makeNodes(3.8) },
    ],
  },
  {
    brand: "Opel",
    models: [
      { name: "Astra G", nodes: makeNodes(1.0) },
      { name: "Astra H", nodes: makeNodes(1.1) },
      { name: "Astra J", nodes: makeNodes(1.2) },
      { name: "Astra K", nodes: makeNodes(1.2) },
      { name: "Insignia A", nodes: makeNodes(1.3) },
      { name: "Insignia B", nodes: makeNodes(1.4) },
      { name: "Mokka", nodes: makeNodes(1.3) },
      { name: "Mokka-e", nodes: makeNodes(1.4) },
      { name: "Corsa D", nodes: makeNodes(1.0) },
      { name: "Corsa E", nodes: makeNodes(1.1) },
      { name: "Crossland", nodes: makeNodes(1.3) },
      { name: "Grandland X", nodes: makeNodes(1.4) },
      { name: "Zafira B", nodes: makeNodes(1.2) },
      { name: "Zafira C", nodes: makeNodes(1.3) },
      { name: "Vectra C", nodes: makeNodes(1.1) },
      { name: "Antara", nodes: makeNodes(1.2) },
    ],
  },
  // ══ ЯПОНСКИЕ ══
  {
    brand: "Toyota",
    models: [
      { name: "Corolla (E120)", nodes: makeNodes(1.2) },
      { name: "Corolla (E150)", nodes: makeNodes(1.2) },
      { name: "Corolla (E160)", nodes: makeNodes(1.3) },
      { name: "Corolla (E170)", nodes: makeNodes(1.3) },
      { name: "Corolla (E210)", nodes: makeNodes(1.3) },
      { name: "Camry (V40)", nodes: makeNodes(1.6) },
      { name: "Camry (V50)", nodes: makeNodes(1.7) },
      { name: "Camry (V70)", nodes: makeNodes(1.8) },
      { name: "RAV4 (3 пок.)", nodes: makeNodes(1.5) },
      { name: "RAV4 (4 пок.)", nodes: makeNodes(1.6) },
      { name: "RAV4 (5 пок.)", nodes: makeNodes(1.7) },
      { name: "Land Cruiser 100", nodes: makeNodes(2.4) },
      { name: "Land Cruiser 200", nodes: makeNodes(2.8) },
      { name: "Land Cruiser 300", nodes: makeNodes(3.0) },
      { name: "Land Cruiser Prado 120", nodes: makeNodes(2.2) },
      { name: "Land Cruiser Prado 150", nodes: makeNodes(2.4) },
      { name: "Highlander (1 пок.)", nodes: makeNodes(1.8) },
      { name: "Highlander (2 пок.)", nodes: makeNodes(1.9) },
      { name: "Highlander (3 пок.)", nodes: makeNodes(2.1) },
      { name: "C-HR", nodes: makeNodes(1.5) },
      { name: "Hilux", nodes: makeNodes(1.9) },
      { name: "Yaris", nodes: makeNodes(1.1) },
      { name: "Yaris Cross", nodes: makeNodes(1.3) },
      { name: "Fortuner", nodes: makeNodes(2.0) },
      { name: "4Runner", nodes: makeNodes(2.2) },
      { name: "Supra (A90)", nodes: makeNodes(3.2) },
      { name: "Auris", nodes: makeNodes(1.3) },
      { name: "Verso", nodes: makeNodes(1.3) },
      { name: "Avensis", nodes: makeNodes(1.4) },
      { name: "Prius (3 пок.)", nodes: makeNodes(1.4) },
      { name: "Prius (4 пок.)", nodes: makeNodes(1.5) },
      { name: "Alphard", nodes: makeNodes(2.4) },
      { name: "Vellfire", nodes: makeNodes(2.4) },
      { name: "Sequoia", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Honda",
    models: [
      { name: "Civic (7 пок.)", nodes: makeNodes(1.2) },
      { name: "Civic (8 пок.)", nodes: makeNodes(1.2) },
      { name: "Civic (9 пок.)", nodes: makeNodes(1.3) },
      { name: "Civic (10 пок.)", nodes: makeNodes(1.3) },
      { name: "Civic (11 пок.)", nodes: makeNodes(1.3) },
      { name: "Civic Type R", nodes: makeNodes(2.2) },
      { name: "Accord (7 пок.)", nodes: makeNodes(1.5) },
      { name: "Accord (8 пок.)", nodes: makeNodes(1.6) },
      { name: "Accord (9 пок.)", nodes: makeNodes(1.7) },
      { name: "CR-V (3 пок.)", nodes: makeNodes(1.5) },
      { name: "CR-V (4 пок.)", nodes: makeNodes(1.6) },
      { name: "CR-V (5 пок.)", nodes: makeNodes(1.7) },
      { name: "Pilot", nodes: makeNodes(2.0) },
      { name: "Jazz / Fit", nodes: makeNodes(1.1) },
      { name: "HR-V", nodes: makeNodes(1.4) },
      { name: "ZR-V", nodes: makeNodes(1.5) },
      { name: "Passport", nodes: makeNodes(1.9) },
      { name: "Ridgeline", nodes: makeNodes(2.0) },
      { name: "Odyssey", nodes: makeNodes(1.9) },
      { name: "FR-V", nodes: makeNodes(1.3) },
    ],
  },
  {
    brand: "Nissan",
    models: [
      { name: "Almera Classic", nodes: makeNodes(1.0) },
      { name: "Almera G15", nodes: makeNodes(1.1) },
      { name: "Qashqai (J10)", nodes: makeNodes(1.4) },
      { name: "Qashqai (J11)", nodes: makeNodes(1.5) },
      { name: "Qashqai (J12)", nodes: makeNodes(1.6) },
      { name: "X-Trail (T31)", nodes: makeNodes(1.5) },
      { name: "X-Trail (T32)", nodes: makeNodes(1.6) },
      { name: "Patrol (Y61)", nodes: makeNodes(2.1) },
      { name: "Patrol (Y62)", nodes: makeNodes(2.3) },
      { name: "Murano (Z51)", nodes: makeNodes(1.9) },
      { name: "Murano (Z52)", nodes: makeNodes(2.0) },
      { name: "Juke (F15)", nodes: makeNodes(1.3) },
      { name: "Juke (F16)", nodes: makeNodes(1.4) },
      { name: "Navara (D40)", nodes: makeNodes(1.6) },
      { name: "Navara (D23)", nodes: makeNodes(1.7) },
      { name: "Teana (J31)", nodes: makeNodes(1.4) },
      { name: "Teana (J32)", nodes: makeNodes(1.5) },
      { name: "Pathfinder (R51)", nodes: makeNodes(1.8) },
      { name: "Note", nodes: makeNodes(1.1) },
      { name: "Tiida", nodes: makeNodes(1.1) },
      { name: "GT-R (R35)", nodes: makeNodes(4.0) },
      { name: "370Z", nodes: makeNodes(2.5) },
      { name: "350Z", nodes: makeNodes(2.3) },
      { name: "Leaf", nodes: makeNodes(1.5) },
      { name: "Ariya", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Mazda",
    models: [
      { name: "Mazda 2 (DJ)", nodes: makeNodes(1.1) },
      { name: "Mazda 3 (BK)", nodes: makeNodes(1.2) },
      { name: "Mazda 3 (BL)", nodes: makeNodes(1.2) },
      { name: "Mazda 3 (BM)", nodes: makeNodes(1.3) },
      { name: "Mazda 3 (BP)", nodes: makeNodes(1.3) },
      { name: "Mazda 6 (GG)", nodes: makeNodes(1.3) },
      { name: "Mazda 6 (GH)", nodes: makeNodes(1.4) },
      { name: "Mazda 6 (GJ)", nodes: makeNodes(1.5) },
      { name: "Mazda 6 (GL)", nodes: makeNodes(1.6) },
      { name: "CX-3", nodes: makeNodes(1.3) },
      { name: "CX-30", nodes: makeNodes(1.5) },
      { name: "CX-5 (KE)", nodes: makeNodes(1.6) },
      { name: "CX-5 (KF)", nodes: makeNodes(1.7) },
      { name: "CX-7", nodes: makeNodes(1.6) },
      { name: "CX-9 (TB)", nodes: makeNodes(1.8) },
      { name: "CX-9 (TC)", nodes: makeNodes(2.0) },
      { name: "CX-60", nodes: makeNodes(2.0) },
      { name: "MX-5 (NC)", nodes: makeNodes(2.0) },
      { name: "MX-5 (ND)", nodes: makeNodes(2.2) },
      { name: "RX-8", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Subaru",
    models: [
      { name: "Impreza (G11)", nodes: makeNodes(1.3) },
      { name: "Impreza (G12)", nodes: makeNodes(1.4) },
      { name: "Legacy (BL/BP)", nodes: makeNodes(1.4) },
      { name: "Legacy (BM/BR)", nodes: makeNodes(1.5) },
      { name: "Forester (SH)", nodes: makeNodes(1.6) },
      { name: "Forester (SJ)", nodes: makeNodes(1.7) },
      { name: "Forester (SK)", nodes: makeNodes(1.7) },
      { name: "Outback (BR)", nodes: makeNodes(1.7) },
      { name: "Outback (BS)", nodes: makeNodes(1.8) },
      { name: "Outback (BT)", nodes: makeNodes(1.8) },
      { name: "XV (GP)", nodes: makeNodes(1.5) },
      { name: "XV (GT)", nodes: makeNodes(1.5) },
      { name: "WRX STI", nodes: makeNodes(3.0) },
      { name: "WRX", nodes: makeNodes(2.5) },
      { name: "BRZ", nodes: makeNodes(2.0) },
      { name: "Tribeca", nodes: makeNodes(1.9) },
      { name: "Levorg", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Mitsubishi",
    models: [
      { name: "Colt", nodes: makeNodes(1.0) },
      { name: "Lancer (9 пок.)", nodes: makeNodes(1.1) },
      { name: "Lancer (10 пок.)", nodes: makeNodes(1.2) },
      { name: "Lancer Evolution X", nodes: makeNodes(2.8) },
      { name: "Outlander (CW)", nodes: makeNodes(1.5) },
      { name: "Outlander (GF)", nodes: makeNodes(1.6) },
      { name: "Outlander (GN)", nodes: makeNodes(1.6) },
      { name: "Outlander XL", nodes: makeNodes(1.7) },
      { name: "Eclipse Cross", nodes: makeNodes(1.7) },
      { name: "Pajero (3 пок.)", nodes: makeNodes(2.0) },
      { name: "Pajero (4 пок.)", nodes: makeNodes(2.2) },
      { name: "Pajero Sport (2 пок.)", nodes: makeNodes(1.9) },
      { name: "Pajero Sport (3 пок.)", nodes: makeNodes(2.0) },
      { name: "L200 (4 пок.)", nodes: makeNodes(1.7) },
      { name: "L200 (5 пок.)", nodes: makeNodes(1.8) },
      { name: "ASX", nodes: makeNodes(1.3) },
      { name: "Galant", nodes: makeNodes(1.3) },
      { name: "Grandis", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Suzuki",
    models: [
      { name: "Swift (1 пок.)", nodes: makeNodes(0.9) },
      { name: "Swift (2 пок.)", nodes: makeNodes(1.0) },
      { name: "Swift Sport", nodes: makeNodes(1.3) },
      { name: "Vitara (2 пок.)", nodes: makeNodes(1.2) },
      { name: "Vitara (3 пок.)", nodes: makeNodes(1.2) },
      { name: "Jimny (3 пок.)", nodes: makeNodes(1.2) },
      { name: "Jimny (4 пок.)", nodes: makeNodes(1.3) },
      { name: "SX4 (1 пок.)", nodes: makeNodes(1.1) },
      { name: "SX4 S-Cross", nodes: makeNodes(1.2) },
      { name: "Grand Vitara (2 пок.)", nodes: makeNodes(1.3) },
      { name: "Grand Vitara (3 пок.)", nodes: makeNodes(1.4) },
      { name: "Baleno", nodes: makeNodes(1.0) },
      { name: "Ignis", nodes: makeNodes(1.0) },
    ],
  },
  {
    brand: "Lexus",
    models: [
      { name: "IS 200/250 (XE20)", nodes: makeNodes(2.4) },
      { name: "IS 250/350 (XE30)", nodes: makeNodes(2.5) },
      { name: "ES 250/350 (XV40)", nodes: makeNodes(2.4) },
      { name: "ES 250/300h (XV70)", nodes: makeNodes(2.6) },
      { name: "GS 300/350", nodes: makeNodes(2.8) },
      { name: "LS 430 (UCF30)", nodes: makeNodes(3.3) },
      { name: "LS 460/500 (USF40)", nodes: makeNodes(3.5) },
      { name: "NX 200/300 (AZ10)", nodes: makeNodes(2.4) },
      { name: "NX 250/350 (AZ20)", nodes: makeNodes(2.5) },
      { name: "RX 300/350 (AL10)", nodes: makeNodes(2.6) },
      { name: "RX 200t/350 (AL20)", nodes: makeNodes(2.7) },
      { name: "RX 350/500h (AL30)", nodes: makeNodes(2.8) },
      { name: "LX 470 (UZJ100)", nodes: makeNodes(3.0) },
      { name: "LX 570 (URJ200)", nodes: makeNodes(3.3) },
      { name: "LX 600 (VJA310)", nodes: makeNodes(3.5) },
      { name: "GX 460", nodes: makeNodes(2.8) },
      { name: "UX 200/250h", nodes: makeNodes(2.2) },
      { name: "LC 500/500h", nodes: makeNodes(4.0) },
      { name: "CT 200h", nodes: makeNodes(2.2) },
      { name: "HS 250h", nodes: makeNodes(2.3) },
    ],
  },
  {
    brand: "Infiniti",
    models: [
      { name: "Q30", nodes: makeNodes(1.8) },
      { name: "Q50 (V37)", nodes: makeNodes(2.2) },
      { name: "Q60", nodes: makeNodes(2.5) },
      { name: "Q70 / M", nodes: makeNodes(2.5) },
      { name: "QX30", nodes: makeNodes(1.9) },
      { name: "QX50 (J50)", nodes: makeNodes(2.2) },
      { name: "QX50 (J55)", nodes: makeNodes(2.3) },
      { name: "QX55", nodes: makeNodes(2.4) },
      { name: "QX60 (L50)", nodes: makeNodes(2.5) },
      { name: "QX60 (L51)", nodes: makeNodes(2.6) },
      { name: "QX70 / FX", nodes: makeNodes(2.7) },
      { name: "QX80 / QX56", nodes: makeNodes(3.0) },
      { name: "EX37 / QX50", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Acura",
    models: [
      { name: "TLX (1 пок.)", nodes: makeNodes(1.9) },
      { name: "TLX (2 пок.)", nodes: makeNodes(2.0) },
      { name: "ILX", nodes: makeNodes(1.7) },
      { name: "RDX (2 пок.)", nodes: makeNodes(2.0) },
      { name: "RDX (3 пок.)", nodes: makeNodes(2.1) },
      { name: "MDX (2 пок.)", nodes: makeNodes(2.3) },
      { name: "MDX (3 пок.)", nodes: makeNodes(2.4) },
      { name: "NSX (2 пок.)", nodes: makeNodes(4.0) },
    ],
  },
  // ══ КОРЕЙСКИЕ ══
  {
    brand: "Hyundai",
    models: [
      { name: "Solaris (1 пок.)", nodes: makeNodes(1.0) },
      { name: "Solaris (2 пок.)", nodes: makeNodes(1.0) },
      { name: "Elantra (HD)", nodes: makeNodes(1.0) },
      { name: "Elantra (MD)", nodes: makeNodes(1.0) },
      { name: "Elantra (AD)", nodes: makeNodes(1.1) },
      { name: "Elantra (CN7)", nodes: makeNodes(1.1) },
      { name: "i30 (FD)", nodes: makeNodes(1.0) },
      { name: "i30 (GD)", nodes: makeNodes(1.1) },
      { name: "i30 (PD)", nodes: makeNodes(1.1) },
      { name: "i20", nodes: makeNodes(0.9) },
      { name: "Tucson (JM)", nodes: makeNodes(1.3) },
      { name: "Tucson (TL)", nodes: makeNodes(1.4) },
      { name: "Tucson (NX4)", nodes: makeNodes(1.4) },
      { name: "Creta (GS)", nodes: makeNodes(1.2) },
      { name: "Creta (SU2)", nodes: makeNodes(1.2) },
      { name: "Santa Fe (CM)", nodes: makeNodes(1.5) },
      { name: "Santa Fe (DM)", nodes: makeNodes(1.6) },
      { name: "Santa Fe (TM)", nodes: makeNodes(1.7) },
      { name: "Palisade", nodes: makeNodes(2.0) },
      { name: "IONIQ 5", nodes: makeNodes(1.8) },
      { name: "IONIQ 6", nodes: makeNodes(1.9) },
      { name: "Sonata (NF)", nodes: makeNodes(1.3) },
      { name: "Sonata (YF)", nodes: makeNodes(1.4) },
      { name: "Sonata (LF)", nodes: makeNodes(1.5) },
      { name: "Sonata (DN8)", nodes: makeNodes(1.5) },
      { name: "Genesis G80 (DH)", nodes: makeNodes(2.4) },
      { name: "ix35", nodes: makeNodes(1.3) },
      { name: "Accent / Verna", nodes: makeNodes(0.9) },
      { name: "Grandeur (IG)", nodes: makeNodes(2.0) },
      { name: "Starex / H-1", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Kia",
    models: [
      { name: "Rio (2 пок.)", nodes: makeNodes(0.9) },
      { name: "Rio (3 пок.)", nodes: makeNodes(1.0) },
      { name: "Rio (4 пок.)", nodes: makeNodes(1.0) },
      { name: "Cerato (1 пок.)", nodes: makeNodes(1.0) },
      { name: "Cerato (2 пок.)", nodes: makeNodes(1.1) },
      { name: "Cerato (3 пок.)", nodes: makeNodes(1.1) },
      { name: "Ceed (1 пок.)", nodes: makeNodes(1.0) },
      { name: "Ceed (2 пок.)", nodes: makeNodes(1.1) },
      { name: "Ceed (3 пок.)", nodes: makeNodes(1.1) },
      { name: "Sportage (2 пок.)", nodes: makeNodes(1.3) },
      { name: "Sportage (3 пок.)", nodes: makeNodes(1.4) },
      { name: "Sportage (4 пок.)", nodes: makeNodes(1.4) },
      { name: "Sportage (5 пок.)", nodes: makeNodes(1.4) },
      { name: "Sorento (1 пок.)", nodes: makeNodes(1.5) },
      { name: "Sorento (2 пок.)", nodes: makeNodes(1.6) },
      { name: "Sorento (3 пок.)", nodes: makeNodes(1.7) },
      { name: "Stinger", nodes: makeNodes(2.2) },
      { name: "Mohave", nodes: makeNodes(2.0) },
      { name: "EV6", nodes: makeNodes(1.9) },
      { name: "EV9", nodes: makeNodes(2.2) },
      { name: "K5 / Optima", nodes: makeNodes(1.5) },
      { name: "Carnival", nodes: makeNodes(1.8) },
      { name: "Picanto", nodes: makeNodes(0.9) },
      { name: "Soul", nodes: makeNodes(1.2) },
      { name: "Telluride", nodes: makeNodes(2.0) },
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