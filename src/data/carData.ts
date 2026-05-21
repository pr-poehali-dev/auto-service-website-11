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
// Двигатель разбит по объёму: до 1.6л / 1.6–2.5л / свыше 2.5л
export const BASE_NODES: Omit<RepairNode, "price">[] = [
  // ── Двигатель до 1.6л ──
  { name: "Замена масла и фильтра (до 1.6л)", time: "30 мин", category: "Двигатель до 1.6л" },
  { name: "Замена воздушного фильтра (до 1.6л)", time: "15 мин", category: "Двигатель до 1.6л" },
  { name: "Замена салонного фильтра", time: "20 мин", category: "Двигатель до 1.6л" },
  { name: "Диагностика двигателя", time: "1 час", category: "Двигатель до 1.6л" },
  { name: "Замена ремня ГРМ (до 1.6л)", time: "2–3 часа", category: "Двигатель до 1.6л" },
  { name: "Замена цепи ГРМ (до 1.6л)", time: "3–5 часов", category: "Двигатель до 1.6л" },
  { name: "Замена прокладки ГБЦ (до 1.6л)", time: "4–6 часов", category: "Двигатель до 1.6л" },
  { name: "Снятие/установка ГБЦ (до 1.6л)", time: "5–8 часов", category: "Двигатель до 1.6л" },
  { name: "Капитальный ремонт ДВС (до 1.6л)", time: "2–5 дней", category: "Двигатель до 1.6л" },
  { name: "Замена помпы охлаждения (до 1.6л)", time: "1.5–3 часа", category: "Двигатель до 1.6л" },
  { name: "Замена термостата (до 1.6л)", time: "1–1.5 часа", category: "Двигатель до 1.6л" },
  { name: "Замена радиатора охлаждения (до 1.6л)", time: "1.5–3 часа", category: "Двигатель до 1.6л" },
  { name: "Промывка топливной системы (до 1.6л)", time: "1.5–2.5 часа", category: "Двигатель до 1.6л" },
  { name: "Замена топливного насоса (до 1.6л)", time: "1.5–2.5 часа", category: "Двигатель до 1.6л" },
  { name: "Чистка форсунок (до 1.6л)", time: "1.5–2.5 часа", category: "Двигатель до 1.6л" },
  { name: "Замена прокладки кл. крышки (до 1.6л)", time: "45 мин–1.5 часа", category: "Двигатель до 1.6л" },
  { name: "Замена маслосъёмных колпачков (до 1.6л)", time: "2.5–4 часа", category: "Двигатель до 1.6л" },
  { name: "Регулировка клапанов (до 1.6л)", time: "1.5–3 часа", category: "Двигатель до 1.6л" },
  // ── Двигатель 1.6–2.5л ──
  { name: "Замена масла и фильтра (1.6–2.5л)", time: "30 мин", category: "Двигатель 1.6–2.5л" },
  { name: "Замена воздушного фильтра (1.6–2.5л)", time: "20 мин", category: "Двигатель 1.6–2.5л" },
  { name: "Диагностика двигателя (1.6–2.5л)", time: "1–1.5 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена ремня ГРМ (1.6–2.5л)", time: "3–5 часов", category: "Двигатель 1.6–2.5л" },
  { name: "Замена цепи ГРМ (1.6–2.5л)", time: "4–7 часов", category: "Двигатель 1.6–2.5л" },
  { name: "Замена прокладки ГБЦ (1.6–2.5л)", time: "5–8 часов", category: "Двигатель 1.6–2.5л" },
  { name: "Снятие/установка ГБЦ (1.6–2.5л)", time: "6–10 часов", category: "Двигатель 1.6–2.5л" },
  { name: "Шлифовка ГБЦ (1.6–2.5л)", time: "1 день", category: "Двигатель 1.6–2.5л" },
  { name: "Капитальный ремонт ДВС (1.6–2.5л)", time: "3–7 дней", category: "Двигатель 1.6–2.5л" },
  { name: "Замена помпы охлаждения (1.6–2.5л)", time: "2–4 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена термостата (1.6–2.5л)", time: "1–2 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена радиатора охлаждения (1.6–2.5л)", time: "2–4 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Промывка топливной системы (1.6–2.5л)", time: "2–3 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена топливного насоса (1.6–2.5л)", time: "2–3 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Чистка форсунок (1.6–2.5л)", time: "2–3 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена прокладки кл. крышки (1.6–2.5л)", time: "1–2 часа", category: "Двигатель 1.6–2.5л" },
  { name: "Замена маслосъёмных колпачков (1.6–2.5л)", time: "3–5 часов", category: "Двигатель 1.6–2.5л" },
  { name: "Регулировка клапанов (1.6–2.5л)", time: "2–4 часа", category: "Двигатель 1.6–2.5л" },
  // ── Двигатель свыше 2.5л ──
  { name: "Замена масла и фильтра (свыше 2.5л)", time: "45 мин", category: "Двигатель 2.5л+" },
  { name: "Замена воздушного фильтра (свыше 2.5л)", time: "30 мин", category: "Двигатель 2.5л+" },
  { name: "Диагностика двигателя (свыше 2.5л)", time: "1.5–2 часа", category: "Двигатель 2.5л+" },
  { name: "Замена ремня ГРМ (свыше 2.5л)", time: "5–8 часов", category: "Двигатель 2.5л+" },
  { name: "Замена цепи ГРМ (свыше 2.5л)", time: "6–10 часов", category: "Двигатель 2.5л+" },
  { name: "Замена прокладки ГБЦ (свыше 2.5л)", time: "7–12 часов", category: "Двигатель 2.5л+" },
  { name: "Снятие/установка ГБЦ (свыше 2.5л)", time: "1–2 дня", category: "Двигатель 2.5л+" },
  { name: "Шлифовка ГБЦ (свыше 2.5л)", time: "1–2 дня", category: "Двигатель 2.5л+" },
  { name: "Капитальный ремонт ДВС (свыше 2.5л)", time: "5–10 дней", category: "Двигатель 2.5л+" },
  { name: "Замена помпы охлаждения (свыше 2.5л)", time: "3–6 часов", category: "Двигатель 2.5л+" },
  { name: "Замена термостата (свыше 2.5л)", time: "1.5–3 часа", category: "Двигатель 2.5л+" },
  { name: "Замена радиатора охлаждения (свыше 2.5л)", time: "3–5 часов", category: "Двигатель 2.5л+" },
  { name: "Промывка топливной системы (свыше 2.5л)", time: "2.5–4 часа", category: "Двигатель 2.5л+" },
  { name: "Замена топливного насоса (свыше 2.5л)", time: "2.5–4 часа", category: "Двигатель 2.5л+" },
  { name: "Чистка форсунок (свыше 2.5л)", time: "2.5–4 часа", category: "Двигатель 2.5л+" },
  { name: "Замена прокладки кл. крышки (свыше 2.5л)", time: "1.5–3 часа", category: "Двигатель 2.5л+" },
  { name: "Замена маслосъёмных колпачков (свыше 2.5л)", time: "4–7 часов", category: "Двигатель 2.5л+" },
  { name: "Регулировка клапанов (свыше 2.5л)", time: "3–6 часов", category: "Двигатель 2.5л+" },
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
  // ── Двигатель до 1.6л (18 позиций) ──
  [700, 1000],      // Замена масла и фильтра до 1.6
  [200, 400],       // Замена воздушного фильтра до 1.6
  [300, 500],       // Замена салонного фильтра
  [1500, 2200],     // Диагностика двигателя
  [3500, 5000],     // Замена ремня ГРМ до 1.6
  [5500, 8000],     // Замена цепи ГРМ до 1.6
  [9000, 13000],    // Замена прокладки ГБЦ до 1.6
  [14000, 20000],   // Снятие/установка ГБЦ до 1.6
  [20000, 28000],   // Капитальный ремонт ДВС до 1.6
  [2000, 3000],     // Замена помпы до 1.6
  [1000, 1500],     // Замена термостата до 1.6
  [2000, 3000],     // Замена радиатора до 1.6
  [1500, 2500],     // Промывка топл. системы до 1.6
  [2500, 3800],     // Замена топл. насоса до 1.6
  [2500, 3800],     // Чистка форсунок до 1.6
  [800, 1200],      // Замена прокладки кл. крышки до 1.6
  [3500, 5000],     // Замена маслосъёмных колпачков до 1.6
  [1500, 2500],     // Регулировка клапанов до 1.6
  // ── Двигатель 1.6–2.5л (18 позиций) ──
  [900, 1300],      // Замена масла и фильтра 1.6-2.5
  [300, 500],       // Замена воздушного фильтра 1.6-2.5
  [1800, 2800],     // Диагностика двигателя 1.6-2.5
  [5000, 7000],     // Замена ремня ГРМ 1.6-2.5
  [8000, 11000],    // Замена цепи ГРМ 1.6-2.5
  [13000, 18000],   // Замена прокладки ГБЦ 1.6-2.5
  [20000, 28000],   // Снятие/установка ГБЦ 1.6-2.5
  [9000, 13000],    // Шлифовка ГБЦ 1.6-2.5
  [30000, 42000],   // Капитальный ремонт ДВС 1.6-2.5
  [3000, 4500],     // Замена помпы 1.6-2.5
  [1500, 2500],     // Замена термостата 1.6-2.5
  [3500, 5000],     // Замена радиатора 1.6-2.5
  [2000, 3000],     // Промывка топл. системы 1.6-2.5
  [4000, 6000],     // Замена топл. насоса 1.6-2.5
  [3000, 4500],     // Чистка форсунок 1.6-2.5
  [1200, 1800],     // Замена прокладки кл. крышки 1.6-2.5
  [5000, 7000],     // Замена маслосъёмных колпачков 1.6-2.5
  [2500, 3800],     // Регулировка клапанов 1.6-2.5
  // ── Двигатель свыше 2.5л (18 позиций) ──
  [1200, 1800],     // Замена масла и фильтра 2.5+
  [400, 700],       // Замена воздушного фильтра 2.5+
  [2500, 3800],     // Диагностика двигателя 2.5+
  [7000, 10000],    // Замена ремня ГРМ 2.5+
  [12000, 17000],   // Замена цепи ГРМ 2.5+
  [18000, 25000],   // Замена прокладки ГБЦ 2.5+
  [28000, 38000],   // Снятие/установка ГБЦ 2.5+
  [12000, 17000],   // Шлифовка ГБЦ 2.5+
  [45000, 65000],   // Капитальный ремонт ДВС 2.5+
  [4500, 6500],     // Замена помпы 2.5+
  [2000, 3000],     // Замена термостата 2.5+
  [5000, 7000],     // Замена радиатора 2.5+
  [3000, 4500],     // Промывка топл. системы 2.5+
  [5500, 8000],     // Замена топл. насоса 2.5+
  [4500, 6500],     // Чистка форсунок 2.5+
  [2000, 3000],     // Замена прокладки кл. крышки 2.5+
  [7000, 10000],    // Замена маслосъёмных колпачков 2.5+
  [4000, 6000],     // Регулировка клапанов 2.5+
  // КПП (14 позиций)
  [1000, 1500],     // Замена масла в МКПП
  [1200, 1800],     // Замена масла в АКПП
  [2000, 3000],     // Диагностика КПП
  [15000, 22000],   // Ремонт АКПП
  [8000, 12000],    // Замена гидроблока АКПП
  [7000, 10000],    // Замена сцепления
  [15000, 21000],   // Замена двухмассового маховика
  [18000, 26000],   // Ремонт вариатора
  [1200, 1800],     // Замена кулисы КПП
  [2500, 3800],     // Замена ШРУС внешнего
  [3500, 5000],     // Замена ШРУС внутреннего
  [4500, 6500],     // Замена приводного вала
  [1000, 1500],     // Замена пыльника ШРУС
  [5000, 7000],     // Замена подшипника вторич. вала
  // Тормоза (14 позиций)
  [1000, 1500],     // Замена передних колодок
  [1200, 1800],     // Замена задних колодок
  [2500, 3800],     // Замена передних дисков
  [3000, 4500],     // Замена задних дисков
  [800, 1200],      // Замена тормозной жидкости
  [1000, 1500],     // Прокачка тормозов
  [3000, 4500],     // Замена главного цилиндра
  [1500, 2500],     // Замена рабочего цилиндра
  [2500, 3800],     // Замена тормозных трубок
  [1500, 2500],     // Ремонт суппорта
  [3500, 5000],     // Замена суппорта
  [1000, 1500],     // Замена датчика ABS
  [800, 1200],      // Замена тормозного шланга
  [1500, 2500],     // Замена тросика ручника
  // Подвеска (19 позиций)
  [2500, 3800],     // Замена передних амортизаторов
  [2000, 3000],     // Замена задних амортизаторов
  [2000, 3000],     // Замена опорного подшипника
  [2000, 3000],     // Замена переднего рычага
  [2500, 3800],     // Замена заднего рычага
  [1800, 2500],     // Развал-схождение 2D
  [2200, 3200],     // Развал-схождение 3D
  [1500, 2500],     // Замена рулевых наконечников
  [2000, 3000],     // Замена рулевой тяги
  [1500, 2500],     // Замена шаровых опор
  [800, 1200],      // Замена стойки стабилизатора
  [1000, 1500],     // Замена втулки стабилизатора
  [2500, 3800],     // Замена ступичного подшипника
  [7000, 10000],    // Замена рулевой рейки
  [5000, 7000],     // Ремонт рулевой рейки
  [3500, 5000],     // Замена рулевой колонки
  [2000, 3000],     // Замена пружин подвески
  [2500, 3800],     // Замена сайлентблоков рычага
  [5000, 7000],     // Замена подрамника
  // Электрика (27 позиций)
  [1000, 1500],     // Компьютерная диагностика
  [800, 1200],      // Диагностика ошибок по кодам
  [400, 700],       // Замена аккумулятора
  [700, 1000],      // Диагностика и зарядка АКБ
  [2500, 3800],     // Ремонт генератора
  [2500, 3800],     // Замена генератора
  [2000, 3000],     // Ремонт стартера
  [2000, 3000],     // Замена стартера
  [700, 1000],      // Замена свечей зажигания
  [2000, 3000],     // Замена свечей накала
  [1200, 1800],     // Замена катушки зажигания
  [2500, 3800],     // Ремонт кондиционера
  [1200, 1800],     // Заправка кондиционера
  [5000, 7000],     // Замена компрессора кондиционера
  [1200, 1800],     // Замена лямбда-зонда
  [1200, 1800],     // Замена датчика кислорода
  [2500, 3800],     // Прошивка ЭБУ
  [4000, 6000],     // Замена ЭБУ двигателя
  [700, 1000],      // Ремонт системы освещения
  [500, 800],       // Замена ламп фар
  [1000, 1500],     // Замена датчика парковки
  [600, 900],       // Замена датчика темп. ОЖ
  [600, 900],       // Замена датчика давления масла
  [1200, 1800],     // Замена топливного датчика
  [2000, 3000],     // Ремонт проводки/жгута
  [3000, 4500],     // Установка сигнализации
  [800, 1200],      // Установка видеорегистратора
  [300, 500],       // Замена предохранителей
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
      { name: "1 серия (E87, 2004–2011)", nodes: makeNodes(1.9) },
      { name: "1 серия (F20, 2011–2019)", nodes: makeNodes(2.0) },
      { name: "2 серия (F22, 2013–2021)", nodes: makeNodes(2.1) },
      { name: "2 серия Active Tourer (F45, 2014–2021)", nodes: makeNodes(2.1) },
      { name: "3 серия (E46, 1998–2006)", nodes: makeNodes(2.0) },
      { name: "3 серия (E90, 2005–2012)", nodes: makeNodes(2.1) },
      { name: "3 серия (F30, 2011–2019)", nodes: makeNodes(2.2) },
      { name: "3 серия (G20, 2018–н.в.)", nodes: makeNodes(2.3) },
      { name: "4 серия (F32/G22, 2013–н.в.)", nodes: makeNodes(2.4) },
      { name: "5 серия (E60, 2003–2010)", nodes: makeNodes(2.3) },
      { name: "5 серия (F10, 2009–2017)", nodes: makeNodes(2.5) },
      { name: "5 серия (G30, 2016–н.в.)", nodes: makeNodes(2.6) },
      { name: "6 серия Gran Turismo (G32, 2017–н.в.)", nodes: makeNodes(2.8) },
      { name: "7 серия (F01, 2008–2015)", nodes: makeNodes(3.0) },
      { name: "7 серия (G11, 2015–н.в.)", nodes: makeNodes(3.2) },
      { name: "8 серия (G15, 2018–н.в.)", nodes: makeNodes(3.5) },
      { name: "X1 (F48, 2015–2022)", nodes: makeNodes(2.0) },
      { name: "X1 (U11, 2022–н.в.)", nodes: makeNodes(2.1) },
      { name: "X2 (F39, 2017–н.в.)", nodes: makeNodes(2.2) },
      { name: "X3 (F25, 2010–2017)", nodes: makeNodes(2.4) },
      { name: "X3 (G01, 2017–н.в.)", nodes: makeNodes(2.5) },
      { name: "X4 (F26/G02, 2014–н.в.)", nodes: makeNodes(2.6) },
      { name: "X5 (E70, 2006–2013)", nodes: makeNodes(2.7) },
      { name: "X5 (F15, 2013–2018)", nodes: makeNodes(2.8) },
      { name: "X5 (G05, 2018–н.в.)", nodes: makeNodes(2.9) },
      { name: "X6 (E71/F16/G06, 2008–н.в.)", nodes: makeNodes(3.0) },
      { name: "X7 (G07, 2018–н.в.)", nodes: makeNodes(3.3) },
      { name: "iX3 (G08, 2020–н.в.)", nodes: makeNodes(2.8) },
      { name: "iX (I20, 2021–н.в.)", nodes: makeNodes(3.2) },
      { name: "M2 (F87/G87, 2015–н.в.)", nodes: makeNodes(3.5) },
      { name: "M3 (E46/E90/F80/G80, 2000–н.в.)", nodes: makeNodes(3.8) },
      { name: "M4 (F82/G82, 2014–н.в.)", nodes: makeNodes(3.9) },
      { name: "M5 (F10/F90, 2011–н.в.)", nodes: makeNodes(4.0) },
      { name: "M8 (F91/F92, 2019–н.в.)", nodes: makeNodes(4.2) },
      { name: "Z4 (E89/G29, 2009–н.в.)", nodes: makeNodes(2.8) },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "A-класс (W168, 1997–2004)", nodes: makeNodes(1.8) },
      { name: "A-класс (W169, 2004–2012)", nodes: makeNodes(1.9) },
      { name: "A-класс (W176, 2012–2018)", nodes: makeNodes(2.0) },
      { name: "A-класс (W177, 2018–н.в.)", nodes: makeNodes(2.2) },
      { name: "B-класс (W245/W246/W247, 2005–н.в.)", nodes: makeNodes(2.1) },
      { name: "C-класс (W203, 2000–2007)", nodes: makeNodes(2.2) },
      { name: "C-класс (W204, 2007–2014)", nodes: makeNodes(2.4) },
      { name: "C-класс (W205, 2014–2021)", nodes: makeNodes(2.5) },
      { name: "C-класс (W206, 2021–н.в.)", nodes: makeNodes(2.6) },
      { name: "E-класс (W211, 2002–2009)", nodes: makeNodes(2.5) },
      { name: "E-класс (W212, 2009–2016)", nodes: makeNodes(2.7) },
      { name: "E-класс (W213, 2016–н.в.)", nodes: makeNodes(2.8) },
      { name: "S-класс (W221, 2005–2013)", nodes: makeNodes(3.3) },
      { name: "S-класс (W222, 2013–2020)", nodes: makeNodes(3.4) },
      { name: "S-класс (W223, 2020–н.в.)", nodes: makeNodes(3.5) },
      { name: "GLA (X156, 2013–2020)", nodes: makeNodes(2.2) },
      { name: "GLA (H247, 2020–н.в.)", nodes: makeNodes(2.3) },
      { name: "GLB (X247, 2019–н.в.)", nodes: makeNodes(2.4) },
      { name: "GLC (X253, 2015–2022)", nodes: makeNodes(2.6) },
      { name: "GLC (X254, 2022–н.в.)", nodes: makeNodes(2.7) },
      { name: "GLE (W166, 2015–2019)", nodes: makeNodes(2.8) },
      { name: "GLE (V167, 2019–н.в.)", nodes: makeNodes(3.0) },
      { name: "GLS (X167, 2019–н.в.)", nodes: makeNodes(3.4) },
      { name: "AMG GT (C190, 2014–н.в.)", nodes: makeNodes(4.2) },
      { name: "AMG C63 (W204/W205/W206, 2011–н.в.)", nodes: makeNodes(3.8) },
      { name: "AMG E63 (W212/W213, 2009–н.в.)", nodes: makeNodes(4.0) },
      { name: "CLA (C117/C118, 2013–н.в.)", nodes: makeNodes(2.4) },
      { name: "CLS (W218/W257, 2010–н.в.)", nodes: makeNodes(3.0) },
      { name: "EQA (H243, 2021–н.в.)", nodes: makeNodes(2.5) },
      { name: "EQB (X243, 2021–н.в.)", nodes: makeNodes(2.6) },
      { name: "EQC (N293, 2019–н.в.)", nodes: makeNodes(3.0) },
      { name: "EQE (V295, 2022–н.в.)", nodes: makeNodes(3.2) },
      { name: "EQS (V297, 2021–н.в.)", nodes: makeNodes(3.8) },
      { name: "Vito (W638/W639/W447, 1996–н.в.)", nodes: makeNodes(2.0) },
      { name: "Sprinter (W901/W906/W910, 1995–н.в.)", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Audi",
    models: [
      { name: "A1 (8X/GB, 2010–н.в.)", nodes: makeNodes(1.9) },
      { name: "A3 (8L, 1996–2003)", nodes: makeNodes(1.8) },
      { name: "A3 (8P, 2003–2012)", nodes: makeNodes(1.9) },
      { name: "A3 (8V, 2012–2020)", nodes: makeNodes(2.0) },
      { name: "A3 (8Y, 2020–н.в.)", nodes: makeNodes(2.1) },
      { name: "A4 (B6, 2000–2004)", nodes: makeNodes(2.0) },
      { name: "A4 (B7, 2004–2008)", nodes: makeNodes(2.1) },
      { name: "A4 (B8, 2007–2015)", nodes: makeNodes(2.3) },
      { name: "A4 (B9, 2015–н.в.)", nodes: makeNodes(2.4) },
      { name: "A5 (8T/F5, 2007–н.в.)", nodes: makeNodes(2.6) },
      { name: "A6 (C5, 1997–2004)", nodes: makeNodes(2.3) },
      { name: "A6 (C6, 2004–2011)", nodes: makeNodes(2.5) },
      { name: "A6 (C7, 2011–2018)", nodes: makeNodes(2.7) },
      { name: "A6 (C8, 2018–н.в.)", nodes: makeNodes(2.8) },
      { name: "A7 (4G/4K, 2010–н.в.)", nodes: makeNodes(3.0) },
      { name: "A8 (D3, 2002–2009)", nodes: makeNodes(3.2) },
      { name: "A8 (D4, 2009–2017)", nodes: makeNodes(3.4) },
      { name: "A8 (D5, 2017–н.в.)", nodes: makeNodes(3.5) },
      { name: "Q2 (GA, 2016–н.в.)", nodes: makeNodes(2.0) },
      { name: "Q3 (8U, 2011–2018)", nodes: makeNodes(2.1) },
      { name: "Q3 (F3, 2018–н.в.)", nodes: makeNodes(2.2) },
      { name: "Q5 (8R, 2008–2017)", nodes: makeNodes(2.4) },
      { name: "Q5 (FY, 2017–н.в.)", nodes: makeNodes(2.6) },
      { name: "Q7 (4L, 2005–2015)", nodes: makeNodes(2.8) },
      { name: "Q7 (4M, 2015–н.в.)", nodes: makeNodes(3.1) },
      { name: "Q8 (4M, 2018–н.в.)", nodes: makeNodes(3.4) },
      { name: "e-tron (GE, 2018–н.в.)", nodes: makeNodes(3.0) },
      { name: "e-tron GT (F83, 2021–н.в.)", nodes: makeNodes(3.5) },
      { name: "TT (8N/8J/FV, 1998–н.в.)", nodes: makeNodes(2.8) },
      { name: "R8 (42/4S, 2006–н.в.)", nodes: makeNodes(4.5) },
      { name: "RS3 (8P/8V/8Y, 2011–н.в.)", nodes: makeNodes(3.5) },
      { name: "RS6 (C5/C6/C7/C8, 2002–н.в.)", nodes: makeNodes(4.2) },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      { name: "Polo (4 пок., 2001–2009)", nodes: makeNodes(1.2) },
      { name: "Polo (5 пок., 2009–2017)", nodes: makeNodes(1.3) },
      { name: "Polo Sedan (2010–2020)", nodes: makeNodes(1.2) },
      { name: "Golf 5 (2003–2008)", nodes: makeNodes(1.4) },
      { name: "Golf 6 (2008–2013)", nodes: makeNodes(1.4) },
      { name: "Golf 7 (2012–2019)", nodes: makeNodes(1.5) },
      { name: "Golf 8 (2019–н.в.)", nodes: makeNodes(1.6) },
      { name: "Golf GTI (2004–н.в.)", nodes: makeNodes(2.0) },
      { name: "Golf R (2010–н.в.)", nodes: makeNodes(2.3) },
      { name: "Jetta 5 (2005–2010)", nodes: makeNodes(1.4) },
      { name: "Jetta 6 (2010–2018)", nodes: makeNodes(1.5) },
      { name: "Jetta 7 (2018–н.в.)", nodes: makeNodes(1.5) },
      { name: "Passat B6 (2005–2010)", nodes: makeNodes(1.5) },
      { name: "Passat B7 (2010–2014)", nodes: makeNodes(1.6) },
      { name: "Passat B8 (2014–н.в.)", nodes: makeNodes(1.7) },
      { name: "Passat CC (2008–2016)", nodes: makeNodes(1.8) },
      { name: "Tiguan (1 пок., 2007–2016)", nodes: makeNodes(1.7) },
      { name: "Tiguan (2 пок., 2016–н.в.)", nodes: makeNodes(1.8) },
      { name: "Tiguan Allspace (2017–н.в.)", nodes: makeNodes(1.9) },
      { name: "Touareg (1 пок., 2002–2010)", nodes: makeNodes(2.2) },
      { name: "Touareg (2 пок., 2010–2018)", nodes: makeNodes(2.3) },
      { name: "Touareg (3 пок., 2018–н.в.)", nodes: makeNodes(2.4) },
      { name: "Arteon (2017–н.в.)", nodes: makeNodes(2.0) },
      { name: "Tayron (2024–н.в.)", nodes: makeNodes(1.9) },
      { name: "Teramont (2016–н.в.)", nodes: makeNodes(2.0) },
      { name: "Multivan (T6/T7, 2015–н.в.)", nodes: makeNodes(2.2) },
      { name: "Caravelle (T5/T6, 2003–н.в.)", nodes: makeNodes(2.0) },
      { name: "Transporter T5 (2003–2015)", nodes: makeNodes(1.8) },
      { name: "Transporter T6 (2015–н.в.)", nodes: makeNodes(1.9) },
      { name: "Amarok (2010–н.в.)", nodes: makeNodes(2.0) },
      { name: "Scirocco (2008–2017)", nodes: makeNodes(1.8) },
      { name: "Sharan (1995–н.в.)", nodes: makeNodes(1.8) },
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
      { name: "Corolla (E120, 2001–2006)", nodes: makeNodes(1.2) },
      { name: "Corolla (E150, 2006–2013)", nodes: makeNodes(1.2) },
      { name: "Corolla (E160, 2013–2019)", nodes: makeNodes(1.3) },
      { name: "Corolla (E170, 2013–2019)", nodes: makeNodes(1.3) },
      { name: "Corolla (E210, 2018–н.в.)", nodes: makeNodes(1.3) },
      { name: "Camry (V40, 2006–2011)", nodes: makeNodes(1.6) },
      { name: "Camry (V50, 2011–2017)", nodes: makeNodes(1.7) },
      { name: "Camry (V70, 2017–н.в.)", nodes: makeNodes(1.8) },
      { name: "RAV4 (3 пок., 2005–2012)", nodes: makeNodes(1.5) },
      { name: "RAV4 (4 пок., 2012–2018)", nodes: makeNodes(1.6) },
      { name: "RAV4 (5 пок., 2018–н.в.)", nodes: makeNodes(1.7) },
      { name: "Land Cruiser 100 (1998–2007)", nodes: makeNodes(2.4) },
      { name: "Land Cruiser 200 (2007–2021)", nodes: makeNodes(2.8) },
      { name: "Land Cruiser 300 (2021–н.в.)", nodes: makeNodes(3.0) },
      { name: "Land Cruiser Prado 120 (2002–2009)", nodes: makeNodes(2.2) },
      { name: "Land Cruiser Prado 150 (2009–н.в.)", nodes: makeNodes(2.4) },
      { name: "Highlander (1 пок., 2000–2007)", nodes: makeNodes(1.8) },
      { name: "Highlander (2 пок., 2007–2013)", nodes: makeNodes(1.9) },
      { name: "Highlander (3 пок., 2013–н.в.)", nodes: makeNodes(2.1) },
      { name: "C-HR (2016–н.в.)", nodes: makeNodes(1.5) },
      { name: "Hilux (2004–н.в.)", nodes: makeNodes(1.9) },
      { name: "Yaris (1999–н.в.)", nodes: makeNodes(1.1) },
      { name: "Yaris Cross (2020–н.в.)", nodes: makeNodes(1.3) },
      { name: "Fortuner (2004–н.в.)", nodes: makeNodes(2.0) },
      { name: "4Runner (2002–н.в.)", nodes: makeNodes(2.2) },
      { name: "Supra (A90, 2019–н.в.)", nodes: makeNodes(3.2) },
      { name: "Auris (2006–2019)", nodes: makeNodes(1.3) },
      { name: "Verso (2009–2018)", nodes: makeNodes(1.3) },
      { name: "Avensis (1997–2018)", nodes: makeNodes(1.4) },
      { name: "Prius (3 пок., 2009–2015)", nodes: makeNodes(1.4) },
      { name: "Prius (4 пок., 2015–н.в.)", nodes: makeNodes(1.5) },
      { name: "Alphard (2002–н.в.)", nodes: makeNodes(2.4) },
      { name: "Vellfire (2008–н.в.)", nodes: makeNodes(2.4) },
      { name: "Sequoia (2000–н.в.)", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Honda",
    models: [
      { name: "Civic (7 пок., 2000–2005)", nodes: makeNodes(1.2) },
      { name: "Civic (8 пок., 2005–2011)", nodes: makeNodes(1.2) },
      { name: "Civic (9 пок., 2011–2015)", nodes: makeNodes(1.3) },
      { name: "Civic (10 пок., 2015–2021)", nodes: makeNodes(1.3) },
      { name: "Civic (11 пок., 2021–н.в.)", nodes: makeNodes(1.3) },
      { name: "Civic Type R (2007–н.в.)", nodes: makeNodes(2.2) },
      { name: "Accord (7 пок., 2002–2008)", nodes: makeNodes(1.5) },
      { name: "Accord (8 пок., 2007–2012)", nodes: makeNodes(1.6) },
      { name: "Accord (9 пок., 2012–2017)", nodes: makeNodes(1.7) },
      { name: "CR-V (3 пок., 2006–2012)", nodes: makeNodes(1.5) },
      { name: "CR-V (4 пок., 2012–2017)", nodes: makeNodes(1.6) },
      { name: "CR-V (5 пок., 2016–н.в.)", nodes: makeNodes(1.7) },
      { name: "Pilot (2002–н.в.)", nodes: makeNodes(2.0) },
      { name: "Jazz / Fit (2001–н.в.)", nodes: makeNodes(1.1) },
      { name: "HR-V (2014–н.в.)", nodes: makeNodes(1.4) },
      { name: "ZR-V (2022–н.в.)", nodes: makeNodes(1.5) },
      { name: "Passport (1993–н.в.)", nodes: makeNodes(1.9) },
      { name: "Ridgeline (2005–н.в.)", nodes: makeNodes(2.0) },
      { name: "Odyssey (1994–н.в.)", nodes: makeNodes(1.9) },
      { name: "FR-V (2004–2009)", nodes: makeNodes(1.3) },
    ],
  },
  {
    brand: "Nissan",
    models: [
      { name: "Almera Classic (2006–2013)", nodes: makeNodes(1.0) },
      { name: "Almera G15 (2012–н.в.)", nodes: makeNodes(1.1) },
      { name: "Qashqai (J10, 2006–2013)", nodes: makeNodes(1.4) },
      { name: "Qashqai (J11, 2013–2021)", nodes: makeNodes(1.5) },
      { name: "Qashqai (J12, 2021–н.в.)", nodes: makeNodes(1.6) },
      { name: "X-Trail (T31, 2007–2014)", nodes: makeNodes(1.5) },
      { name: "X-Trail (T32, 2013–н.в.)", nodes: makeNodes(1.6) },
      { name: "Patrol (Y61, 1997–2010)", nodes: makeNodes(2.1) },
      { name: "Patrol (Y62, 2010–н.в.)", nodes: makeNodes(2.3) },
      { name: "Murano (Z51, 2007–2016)", nodes: makeNodes(1.9) },
      { name: "Murano (Z52, 2014–н.в.)", nodes: makeNodes(2.0) },
      { name: "Juke (F15, 2010–2019)", nodes: makeNodes(1.3) },
      { name: "Juke (F16, 2019–н.в.)", nodes: makeNodes(1.4) },
      { name: "Navara (D40, 2004–2015)", nodes: makeNodes(1.6) },
      { name: "Navara (D23, 2014–н.в.)", nodes: makeNodes(1.7) },
      { name: "Teana (J31, 2003–2008)", nodes: makeNodes(1.4) },
      { name: "Teana (J32, 2008–2013)", nodes: makeNodes(1.5) },
      { name: "Pathfinder (R51, 2004–2012)", nodes: makeNodes(1.8) },
      { name: "Note (E11/E12, 2004–н.в.)", nodes: makeNodes(1.1) },
      { name: "Tiida (C11/C12, 2004–2014)", nodes: makeNodes(1.1) },
      { name: "GT-R (R35, 2007–н.в.)", nodes: makeNodes(4.0) },
      { name: "370Z (Z34, 2008–2021)", nodes: makeNodes(2.5) },
      { name: "350Z (Z33, 2002–2009)", nodes: makeNodes(2.3) },
      { name: "Leaf (ZE0/ZE1, 2010–н.в.)", nodes: makeNodes(1.5) },
      { name: "Ariya (FE0, 2021–н.в.)", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Mazda",
    models: [
      { name: "Mazda 2 (DJ, 2014–н.в.)", nodes: makeNodes(1.1) },
      { name: "Mazda 3 (BK, 2003–2009)", nodes: makeNodes(1.2) },
      { name: "Mazda 3 (BL, 2009–2013)", nodes: makeNodes(1.2) },
      { name: "Mazda 3 (BM, 2013–2018)", nodes: makeNodes(1.3) },
      { name: "Mazda 3 (BP, 2019–н.в.)", nodes: makeNodes(1.3) },
      { name: "Mazda 6 (GG, 2002–2007)", nodes: makeNodes(1.3) },
      { name: "Mazda 6 (GH, 2007–2012)", nodes: makeNodes(1.4) },
      { name: "Mazda 6 (GJ, 2012–2018)", nodes: makeNodes(1.5) },
      { name: "Mazda 6 (GL, 2018–н.в.)", nodes: makeNodes(1.6) },
      { name: "CX-3 (2015–н.в.)", nodes: makeNodes(1.3) },
      { name: "CX-30 (2019–н.в.)", nodes: makeNodes(1.5) },
      { name: "CX-5 (KE, 2011–2017)", nodes: makeNodes(1.6) },
      { name: "CX-5 (KF, 2017–н.в.)", nodes: makeNodes(1.7) },
      { name: "CX-7 (2006–2012)", nodes: makeNodes(1.6) },
      { name: "CX-9 (TB, 2006–2015)", nodes: makeNodes(1.8) },
      { name: "CX-9 (TC, 2016–н.в.)", nodes: makeNodes(2.0) },
      { name: "CX-60 (2022–н.в.)", nodes: makeNodes(2.0) },
      { name: "MX-5 (NC, 2005–2015)", nodes: makeNodes(2.0) },
      { name: "MX-5 (ND, 2015–н.в.)", nodes: makeNodes(2.2) },
      { name: "RX-8 (2002–2012)", nodes: makeNodes(2.5) },
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
      { name: "Solaris (1 пок., 2010–2017)", nodes: makeNodes(1.0) },
      { name: "Solaris (2 пок., 2017–н.в.)", nodes: makeNodes(1.0) },
      { name: "Elantra (HD, 2006–2010)", nodes: makeNodes(1.0) },
      { name: "Elantra (MD, 2010–2016)", nodes: makeNodes(1.0) },
      { name: "Elantra (AD, 2015–2020)", nodes: makeNodes(1.1) },
      { name: "Elantra (CN7, 2020–н.в.)", nodes: makeNodes(1.1) },
      { name: "i30 (FD, 2007–2012)", nodes: makeNodes(1.0) },
      { name: "i30 (GD, 2011–2017)", nodes: makeNodes(1.1) },
      { name: "i30 (PD, 2017–н.в.)", nodes: makeNodes(1.1) },
      { name: "i20 (2008–н.в.)", nodes: makeNodes(0.9) },
      { name: "Tucson (JM, 2004–2010)", nodes: makeNodes(1.3) },
      { name: "Tucson (TL, 2015–2021)", nodes: makeNodes(1.4) },
      { name: "Tucson (NX4, 2020–н.в.)", nodes: makeNodes(1.4) },
      { name: "Creta (GS, 2015–2021)", nodes: makeNodes(1.2) },
      { name: "Creta (SU2, 2021–н.в.)", nodes: makeNodes(1.2) },
      { name: "Santa Fe (CM, 2006–2012)", nodes: makeNodes(1.5) },
      { name: "Santa Fe (DM, 2012–2018)", nodes: makeNodes(1.6) },
      { name: "Santa Fe (TM, 2018–н.в.)", nodes: makeNodes(1.7) },
      { name: "Palisade (2018–н.в.)", nodes: makeNodes(2.0) },
      { name: "IONIQ 5 (2021–н.в.)", nodes: makeNodes(1.8) },
      { name: "IONIQ 6 (2022–н.в.)", nodes: makeNodes(1.9) },
      { name: "Sonata (NF, 2004–2010)", nodes: makeNodes(1.3) },
      { name: "Sonata (YF, 2009–2014)", nodes: makeNodes(1.4) },
      { name: "Sonata (LF, 2014–2019)", nodes: makeNodes(1.5) },
      { name: "Sonata (DN8, 2019–н.в.)", nodes: makeNodes(1.5) },
      { name: "Genesis G80 (DH, 2013–2016)", nodes: makeNodes(2.4) },
      { name: "ix35 (2009–2015)", nodes: makeNodes(1.3) },
      { name: "Accent / Verna (2005–н.в.)", nodes: makeNodes(0.9) },
      { name: "Grandeur (IG, 2016–н.в.)", nodes: makeNodes(2.0) },
      { name: "Starex / H-1 (1997–н.в.)", nodes: makeNodes(1.5) },
    ],
  },
  {
    brand: "Kia",
    models: [
      { name: "Rio (2 пок., 2005–2011)", nodes: makeNodes(0.9) },
      { name: "Rio (3 пок., 2011–2017)", nodes: makeNodes(1.0) },
      { name: "Rio (4 пок., 2017–н.в.)", nodes: makeNodes(1.0) },
      { name: "Cerato (1 пок., 2003–2008)", nodes: makeNodes(1.0) },
      { name: "Cerato (2 пок., 2008–2013)", nodes: makeNodes(1.1) },
      { name: "Cerato (3 пок., 2013–н.в.)", nodes: makeNodes(1.1) },
      { name: "Ceed (1 пок., 2006–2012)", nodes: makeNodes(1.0) },
      { name: "Ceed (2 пок., 2012–2018)", nodes: makeNodes(1.1) },
      { name: "Ceed (3 пок., 2018–н.в.)", nodes: makeNodes(1.1) },
      { name: "Sportage (2 пок., 2004–2010)", nodes: makeNodes(1.3) },
      { name: "Sportage (3 пок., 2010–2016)", nodes: makeNodes(1.4) },
      { name: "Sportage (4 пок., 2015–2021)", nodes: makeNodes(1.4) },
      { name: "Sportage (5 пок., 2021–н.в.)", nodes: makeNodes(1.4) },
      { name: "Sorento (1 пок., 2002–2009)", nodes: makeNodes(1.5) },
      { name: "Sorento (2 пок., 2009–2014)", nodes: makeNodes(1.6) },
      { name: "Sorento (3 пок., 2014–н.в.)", nodes: makeNodes(1.7) },
      { name: "Stinger (2017–н.в.)", nodes: makeNodes(2.2) },
      { name: "Mohave (2007–н.в.)", nodes: makeNodes(2.0) },
      { name: "EV6 (2021–н.в.)", nodes: makeNodes(1.9) },
      { name: "EV9 (2023–н.в.)", nodes: makeNodes(2.2) },
      { name: "K5 / Optima (2010–н.в.)", nodes: makeNodes(1.5) },
      { name: "Carnival (2021–н.в.)", nodes: makeNodes(1.8) },
      { name: "Picanto (2004–н.в.)", nodes: makeNodes(0.9) },
      { name: "Soul (2008–н.в.)", nodes: makeNodes(1.2) },
      { name: "Telluride (2019–н.в.)", nodes: makeNodes(2.0) },
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
      { name: "Fiesta (Mk5, 2001–2008)", nodes: makeNodes(1.0) },
      { name: "Fiesta (Mk6, 2008–2017)", nodes: makeNodes(1.0) },
      { name: "Fiesta (Mk7, 2017–2023)", nodes: makeNodes(1.1) },
      { name: "Focus (Mk1, 1998–2004)", nodes: makeNodes(1.0) },
      { name: "Focus (Mk2, 2004–2011)", nodes: makeNodes(1.1) },
      { name: "Focus (Mk3, 2011–2018)", nodes: makeNodes(1.2) },
      { name: "Focus (Mk4, 2018–н.в.)", nodes: makeNodes(1.2) },
      { name: "Mondeo (Mk3, 2000–2007)", nodes: makeNodes(1.3) },
      { name: "Mondeo (Mk4, 2007–2014)", nodes: makeNodes(1.4) },
      { name: "Mondeo (Mk5, 2014–2022)", nodes: makeNodes(1.5) },
      { name: "Fusion (2002–2012)", nodes: makeNodes(1.1) },
      { name: "C-Max (2003–2019)", nodes: makeNodes(1.2) },
      { name: "S-Max (2006–н.в.)", nodes: makeNodes(1.6) },
      { name: "Galaxy (2006–н.в.)", nodes: makeNodes(1.7) },
      { name: "Explorer (2010–н.в.)", nodes: makeNodes(2.0) },
      { name: "Expedition (1996–н.в.)", nodes: makeNodes(2.2) },
      { name: "Mustang (Mk5, 2004–2014)", nodes: makeNodes(2.4) },
      { name: "Mustang (Mk6, 2015–н.в.)", nodes: makeNodes(2.5) },
      { name: "Mustang Mach-E (2020–н.в.)", nodes: makeNodes(2.3) },
      { name: "F-150 (13 пок., 2014–2020)", nodes: makeNodes(2.0) },
      { name: "F-150 (14 пок., 2020–н.в.)", nodes: makeNodes(2.1) },
      { name: "Ranger (2011–н.в.)", nodes: makeNodes(1.6) },
      { name: "EcoSport (2012–н.в.)", nodes: makeNodes(1.2) },
      { name: "Kuga (Mk1, 2008–2012)", nodes: makeNodes(1.4) },
      { name: "Kuga (Mk2, 2012–2019)", nodes: makeNodes(1.5) },
      { name: "Kuga (Mk3, 2019–н.в.)", nodes: makeNodes(1.5) },
      { name: "Edge (2006–н.в.)", nodes: makeNodes(1.9) },
      { name: "Transit (2013–н.в.)", nodes: makeNodes(1.8) },
      { name: "Transit Connect (2013–н.в.)", nodes: makeNodes(1.4) },
    ],
  },
  {
    brand: "Chevrolet",
    models: [
      { name: "Aveo (T200, 2002–2008)", nodes: makeNodes(0.9) },
      { name: "Aveo (T250, 2006–2012)", nodes: makeNodes(1.0) },
      { name: "Aveo (T300, 2011–2015)", nodes: makeNodes(1.0) },
      { name: "Spark (2005–2015)", nodes: makeNodes(0.9) },
      { name: "Cruze (2009–2015)", nodes: makeNodes(1.2) },
      { name: "Cruze (2015–2019)", nodes: makeNodes(1.2) },
      { name: "Lacetti (2004–2013)", nodes: makeNodes(1.0) },
      { name: "Malibu (2011–2015)", nodes: makeNodes(1.4) },
      { name: "Malibu (2015–2022)", nodes: makeNodes(1.5) },
      { name: "Camaro (5 пок., 2009–2015)", nodes: makeNodes(2.4) },
      { name: "Camaro (6 пок., 2015–2024)", nodes: makeNodes(2.5) },
      { name: "Corvette C7 (2013–2019)", nodes: makeNodes(3.8) },
      { name: "Corvette C8 (2019–н.в.)", nodes: makeNodes(4.0) },
      { name: "Captiva (2006–2018)", nodes: makeNodes(1.4) },
      { name: "Equinox (2004–2017)", nodes: makeNodes(1.5) },
      { name: "Equinox (2017–н.в.)", nodes: makeNodes(1.5) },
      { name: "Trax (2012–н.в.)", nodes: makeNodes(1.3) },
      { name: "Tracker (2013–н.в.)", nodes: makeNodes(1.2) },
      { name: "Tahoe (4 пок., 2014–2020)", nodes: makeNodes(2.2) },
      { name: "Tahoe (5 пок., 2020–н.в.)", nodes: makeNodes(2.3) },
      { name: "Suburban (2014–н.в.)", nodes: makeNodes(2.4) },
      { name: "Traverse (2008–н.в.)", nodes: makeNodes(2.0) },
      { name: "Orlando (2010–2015)", nodes: makeNodes(1.3) },
      { name: "Niva (2002–н.в.)", nodes: makeNodes(0.8) },
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
      { name: "Charger (LX, 2005–2010)", nodes: makeNodes(1.9) },
      { name: "Charger (LD, 2011–н.в.)", nodes: makeNodes(2.0) },
      { name: "Challenger (LA, 2008–н.в.)", nodes: makeNodes(2.2) },
      { name: "Durango (WD, 2010–н.в.)", nodes: makeNodes(2.0) },
      { name: "Journey (2008–2020)", nodes: makeNodes(1.5) },
      { name: "Dart (2012–2016)", nodes: makeNodes(1.4) },
      { name: "Grand Caravan (2007–2020)", nodes: makeNodes(1.6) },
      { name: "Nitro (2006–2012)", nodes: makeNodes(1.7) },
      { name: "Viper (2013–2017)", nodes: makeNodes(4.5) },
      { name: "Neon (1994–2005)", nodes: makeNodes(1.2) },
      { name: "Avenger (2007–2014)", nodes: makeNodes(1.4) },
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
      { name: "Logan (1 пок., 2004–2014)", nodes: makeNodes(0.9) },
      { name: "Logan (2 пок., 2013–н.в.)", nodes: makeNodes(0.9) },
      { name: "Sandero (1 пок., 2008–2014)", nodes: makeNodes(0.9) },
      { name: "Sandero (2 пок., 2012–н.в.)", nodes: makeNodes(0.9) },
      { name: "Sandero Stepway (2008–н.в.)", nodes: makeNodes(1.0) },
      { name: "Duster (1 пок., 2010–2018)", nodes: makeNodes(1.1) },
      { name: "Duster (2 пок., 2017–н.в.)", nodes: makeNodes(1.1) },
      { name: "Clio (2 пок., 1998–2005)", nodes: makeNodes(1.0) },
      { name: "Clio (3 пок., 2005–2012)", nodes: makeNodes(1.1) },
      { name: "Clio (4 пок., 2012–2019)", nodes: makeNodes(1.1) },
      { name: "Clio (5 пок., 2019–н.в.)", nodes: makeNodes(1.2) },
      { name: "Megane (2 пок., 2002–2009)", nodes: makeNodes(1.2) },
      { name: "Megane (3 пок., 2008–2016)", nodes: makeNodes(1.2) },
      { name: "Megane (4 пок., 2015–н.в.)", nodes: makeNodes(1.2) },
      { name: "Laguna (2 пок., 2000–2007)", nodes: makeNodes(1.3) },
      { name: "Laguna (3 пок., 2007–2015)", nodes: makeNodes(1.3) },
      { name: "Scenic (1 пок., 1996–2003)", nodes: makeNodes(1.1) },
      { name: "Scenic (2 пок., 2003–2009)", nodes: makeNodes(1.1) },
      { name: "Scenic (3 пок., 2009–2016)", nodes: makeNodes(1.2) },
      { name: "Arkana (2019–н.в.)", nodes: makeNodes(1.3) },
      { name: "Koleos (1 пок., 2007–2017)", nodes: makeNodes(1.5) },
      { name: "Koleos (2 пок., 2017–н.в.)", nodes: makeNodes(1.5) },
      { name: "Captur (2013–н.в.)", nodes: makeNodes(1.1) },
      { name: "Kadjar (2015–н.в.)", nodes: makeNodes(1.3) },
      { name: "Fluence (2009–2017)", nodes: makeNodes(1.2) },
      { name: "Latitude (2010–2015)", nodes: makeNodes(1.5) },
      { name: "Symbol (2002–н.в.)", nodes: makeNodes(0.9) },
      { name: "Kangoo (2007–н.в.)", nodes: makeNodes(1.1) },
      { name: "Trafic (2001–н.в.)", nodes: makeNodes(1.6) },
      { name: "Master (2003–н.в.)", nodes: makeNodes(1.7) },
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
      { name: "Felicia (1994–2001)", nodes: makeNodes(0.9) },
      { name: "Fabia (1 пок., 1999–2007)", nodes: makeNodes(1.0) },
      { name: "Fabia (2 пок., 2006–2014)", nodes: makeNodes(1.0) },
      { name: "Fabia (3 пок., 2014–2021)", nodes: makeNodes(1.0) },
      { name: "Fabia (4 пок., 2021–н.в.)", nodes: makeNodes(1.1) },
      { name: "Fabia Combi (2007–н.в.)", nodes: makeNodes(1.0) },
      { name: "Rapid (2012–2020)", nodes: makeNodes(1.0) },
      { name: "Scala (2018–н.в.)", nodes: makeNodes(1.1) },
      { name: "Octavia (A4, 1996–2010)", nodes: makeNodes(1.1) },
      { name: "Octavia (A5, 2004–2013)", nodes: makeNodes(1.2) },
      { name: "Octavia (A7, 2012–2020)", nodes: makeNodes(1.2) },
      { name: "Octavia (A8, 2020–н.в.)", nodes: makeNodes(1.3) },
      { name: "Octavia RS (2006–н.в.)", nodes: makeNodes(1.6) },
      { name: "Superb (B5, 2001–2008)", nodes: makeNodes(1.4) },
      { name: "Superb (B6, 2008–2015)", nodes: makeNodes(1.5) },
      { name: "Superb (B8, 2015–н.в.)", nodes: makeNodes(1.5) },
      { name: "Yeti (2009–2017)", nodes: makeNodes(1.3) },
      { name: "Karoq (2017–н.в.)", nodes: makeNodes(1.4) },
      { name: "Kodiaq (2016–н.в.)", nodes: makeNodes(1.7) },
      { name: "Kamiq (2019–н.в.)", nodes: makeNodes(1.2) },
      { name: "Enyaq (2020–н.в.)", nodes: makeNodes(1.8) },
      { name: "Roomster (2006–2015)", nodes: makeNodes(1.0) },
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
      { name: "2101 «Копейка» (1970–1988)", nodes: makeNodes(0.5) },
      { name: "2105 (1979–2010)", nodes: makeNodes(0.5) },
      { name: "2106 (1975–2006)", nodes: makeNodes(0.5) },
      { name: "2107 (1982–2012)", nodes: makeNodes(0.5) },
      { name: "2108/2109 (1984–2013)", nodes: makeNodes(0.5) },
      { name: "2110/2111/2112 (1996–2014)", nodes: makeNodes(0.6) },
      { name: "2114/2115 (1997–2013)", nodes: makeNodes(0.6) },
      { name: "Kalina (2004–2018)", nodes: makeNodes(0.6) },
      { name: "Priora (2007–2018)", nodes: makeNodes(0.6) },
      { name: "Granta (2011–н.в.)", nodes: makeNodes(0.7) },
      { name: "Granta Cross (2018–н.в.)", nodes: makeNodes(0.7) },
      { name: "Vesta (2015–н.в.)", nodes: makeNodes(0.8) },
      { name: "Vesta Cross (2017–н.в.)", nodes: makeNodes(0.8) },
      { name: "Vesta SW (2017–н.в.)", nodes: makeNodes(0.8) },
      { name: "XRAY (2015–н.в.)", nodes: makeNodes(0.8) },
      { name: "XRAY Cross (2018–н.в.)", nodes: makeNodes(0.8) },
      { name: "Niva Legend (1977–н.в.)", nodes: makeNodes(0.7) },
      { name: "Niva Travel (2020–н.в.)", nodes: makeNodes(0.8) },
      { name: "Largus (2012–н.в.)", nodes: makeNodes(0.7) },
      { name: "Largus Cross (2015–н.в.)", nodes: makeNodes(0.7) },
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
  // ══ ДОПОЛНИТЕЛЬНЫЕ ══
  {
    brand: "Volkswagen ID.",
    models: [
      { name: "ID.3 (2019–н.в.)", nodes: makeNodes(1.6) },
      { name: "ID.4 (2020–н.в.)", nodes: makeNodes(1.8) },
      { name: "ID.6 (2021–н.в.)", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Toyota (коммерческие)",
    models: [
      { name: "HiAce (H200, 2004–н.в.)", nodes: makeNodes(1.8) },
      { name: "ProAce (2013–н.в.)", nodes: makeNodes(1.6) },
    ],
  },
  {
    brand: "Kia (новые)",
    models: [
      { name: "Niro (2016–2022)", nodes: makeNodes(1.3) },
      { name: "Niro (2022–н.в.)", nodes: makeNodes(1.4) },
      { name: "XCeed (2019–н.в.)", nodes: makeNodes(1.4) },
    ],
  },
  {
    brand: "Hyundai (новые)",
    models: [
      { name: "Bayon (2021–н.в.)", nodes: makeNodes(1.1) },
      { name: "Staria (2021–н.в.)", nodes: makeNodes(1.8) },
    ],
  },
  {
    brand: "Mazda (новые)",
    models: [
      { name: "CX-50 (2022–н.в.)", nodes: makeNodes(1.8) },
      { name: "CX-80 (2024–н.в.)", nodes: makeNodes(2.2) },
    ],
  },
  {
    brand: "Honda (новые)",
    models: [
      { name: "e:Ny1 (2023–н.в.)", nodes: makeNodes(1.8) },
      { name: "WR-V (2023–н.в.)", nodes: makeNodes(1.3) },
    ],
  },
  {
    brand: "Nissan (новые)",
    models: [
      { name: "Kicks (2016–н.в.)", nodes: makeNodes(1.3) },
      { name: "Terra (2017–н.в.)", nodes: makeNodes(1.8) },
    ],
  },
  {
    brand: "Subaru (новые)",
    models: [
      { name: "Solterra (2022–н.в.)", nodes: makeNodes(1.8) },
      { name: "Crosstrek (2023–н.в.)", nodes: makeNodes(1.6) },
    ],
  },
  {
    brand: "Audi (новые)",
    models: [
      { name: "Q4 e-tron (2021–н.в.)", nodes: makeNodes(2.2) },
      { name: "A6 e-tron (2024–н.в.)", nodes: makeNodes(2.5) },
    ],
  },
  {
    brand: "Porsche (новые)",
    models: [
      { name: "Cayenne E-Hybrid (2023–н.в.)", nodes: makeNodes(3.8) },
      { name: "Macan Electric (2024–н.в.)", nodes: makeNodes(3.2) },
    ],
  },
  {
    brand: "Ford (новые)",
    models: [
      { name: "Puma (2019–н.в.)", nodes: makeNodes(1.1) },
      { name: "Kuga (2019–н.в.)", nodes: makeNodes(1.5) },
      { name: "Bronco (2021–н.в.)", nodes: makeNodes(2.3) },
    ],
  },
  {
    brand: "Chevrolet (новые)",
    models: [
      { name: "Trailblazer (2020–н.в.)", nodes: makeNodes(1.5) },
      { name: "Blazer EV (2023–н.в.)", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Zeekr",
    models: [
      { name: "001 (2021–н.в.)", nodes: makeNodes(1.8) },
      { name: "X (2023–н.в.)", nodes: makeNodes(1.6) },
    ],
  },
  {
    brand: "Xpeng",
    models: [
      { name: "P7 (2020–н.в.)", nodes: makeNodes(1.7) },
      { name: "G9 (2022–н.в.)", nodes: makeNodes(2.0) },
    ],
  },
  {
    brand: "Nio",
    models: [
      { name: "ES6 (2019–н.в.)", nodes: makeNodes(2.0) },
      { name: "ET5 (2022–н.в.)", nodes: makeNodes(1.8) },
    ],
  },
  {
    brand: "Lada (новые)",
    models: [
      { name: "Aura (2024–н.в.)", nodes: makeNodes(0.9) },
      { name: "e-Largus (2024–н.в.)", nodes: makeNodes(0.8) },
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