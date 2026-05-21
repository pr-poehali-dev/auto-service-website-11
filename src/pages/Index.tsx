import { useState, useEffect, useMemo } from "react";
import Icon from "@/components/ui/icon";
import {
  ALL_BRANDS,
  NODES_CATEGORIES,
  getModelsForBrand,
  getNodesForBrandModel,
} from "@/data/carData";

const ABOUT_STATS = [
  { value: "17", label: "лет на рынке" },
  { value: "12 000+", label: "выполненных работ" },
  { value: "48", label: "опытных мастеров" },
  { value: "98%", label: "довольных клиентов" },
];

const CONTACTS = [
  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Промышленная, 42" },
  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
  { icon: "Mail", label: "Email", value: "info@autoservice.ru" },
  { icon: "Clock", label: "Часы работы", value: "Пн–Вс: 8:00 – 21:00" },
];

// Шиномонтаж данные
const TIRE_CATEGORIES = [
  {
    category: "Легковые автомобили",
    subtitle: "R13–R18",
    items: [
      { name: "Снятие/установка колеса (1 шт.)", r13_15: "150 ₽", r16_17: "200 ₽", r18_20: "250 ₽" },
      { name: "Демонтаж/монтаж шины (1 шт.)", r13_15: "200 ₽", r16_17: "250 ₽", r18_20: "350 ₽" },
      { name: "Балансировка (1 колесо)", r13_15: "150 ₽", r16_17: "180 ₽", r18_20: "220 ₽" },
      { name: "Шиномонтаж + балансировка (4 колеса)", r13_15: "2 000 ₽", r16_17: "2 600 ₽", r18_20: "3 400 ₽" },
      { name: "Подкачка шины", r13_15: "50 ₽", r16_17: "50 ₽", r18_20: "50 ₽" },
      { name: "Ремонт прокола (жгут)", r13_15: "300 ₽", r16_17: "300 ₽", r18_20: "300 ₽" },
      { name: "Ремонт прокола (заплатка)", r13_15: "500 ₽", r16_17: "500 ₽", r18_20: "600 ₽" },
      { name: "Замена вентиля", r13_15: "100 ₽", r16_17: "100 ₽", r18_20: "150 ₽" },
    ],
  },
  {
    category: "Внедорожники и кроссоверы",
    subtitle: "R17–R22",
    items: [
      { name: "Снятие/установка колеса (1 шт.)", r13_15: "—", r16_17: "250 ₽", r18_20: "350 ₽" },
      { name: "Демонтаж/монтаж шины (1 шт.)", r13_15: "—", r16_17: "350 ₽", r18_20: "450 ₽" },
      { name: "Балансировка (1 колесо)", r13_15: "—", r16_17: "220 ₽", r18_20: "280 ₽" },
      { name: "Шиномонтаж + балансировка (4 колеса)", r13_15: "—", r16_17: "3 300 ₽", r18_20: "4 400 ₽" },
      { name: "Ремонт прокола (жгут)", r13_15: "—", r16_17: "350 ₽", r18_20: "350 ₽" },
      { name: "Ремонт прокола (заплатка)", r13_15: "—", r16_17: "600 ₽", r18_20: "700 ₽" },
      { name: "Замена вентиля", r13_15: "—", r16_17: "150 ₽", r18_20: "200 ₽" },
    ],
  },
  {
    category: "Низкопрофильные шины",
    subtitle: "профиль 35 и ниже",
    items: [
      { name: "Демонтаж/монтаж шины (1 шт.)", r13_15: "—", r16_17: "400 ₽", r18_20: "550 ₽" },
      { name: "Балансировка (1 колесо)", r13_15: "—", r16_17: "250 ₽", r18_20: "300 ₽" },
      { name: "Шиномонтаж + балансировка (4 колеса)", r13_15: "—", r16_17: "4 200 ₽", r18_20: "5 600 ₽" },
      { name: "Ремонт прокола (заплатка)", r13_15: "—", r16_17: "700 ₽", r18_20: "900 ₽" },
    ],
  },
  {
    category: "Дополнительные услуги",
    subtitle: "",
    items: [
      { name: "Хранение шин (сезон, 4 шт.)", r13_15: "2 500 ₽", r16_17: "3 000 ₽", r18_20: "3 500 ₽" },
      { name: "Хранение шин на дисках (сезон, 4 шт.)", r13_15: "3 500 ₽", r16_17: "4 000 ₽", r18_20: "4 500 ₽" },
      { name: "Мойка дисков (4 шт.)", r13_15: "500 ₽", r16_17: "700 ₽", r18_20: "900 ₽" },
      { name: "Нанесение чернителя резины (4 шт.)", r13_15: "400 ₽", r16_17: "400 ₽", r18_20: "400 ₽" },
      { name: "Затяжка гаек динамометрическим ключом", r13_15: "200 ₽", r16_17: "200 ₽", r18_20: "200 ₽" },
      { name: "Установка колёсных проставок (к-т)", r13_15: "800 ₽", r16_17: "800 ₽", r18_20: "1 000 ₽" },
      { name: "Проверка давления в шинах (все колёса)", r13_15: "бесплатно", r16_17: "бесплатно", r18_20: "бесплатно" },
    ],
  },
];

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О сервисе" },
  { id: "tires", label: "Шиномонтаж" },
  { id: "calc", label: "Калькулятор" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tireCategory, setTireCategory] = useState(0);

  // Calculator state
  const [calcBrand, setCalcBrand] = useState("");
  const [calcModel, setCalcModel] = useState("");
  const [calcNode, setCalcNode] = useState("");
  const [calcResult, setCalcResult] = useState<[number, number] | null>(null);
  const [calcBrandSearch, setCalcBrandSearch] = useState("");
  const [calcActiveCategory, setCalcActiveCategory] = useState(NODES_CATEGORIES[0]);
  const [workSearch, setWorkSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const navigate = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const filteredCalcBrands = useMemo(() =>
    ALL_BRANDS.filter(b => b.toLowerCase().includes(calcBrandSearch.toLowerCase())),
    [calcBrandSearch]
  );

  const calcModels = useMemo(() => calcBrand ? getModelsForBrand(calcBrand) : [], [calcBrand]);

  const handleCalc = () => {
    if (calcBrand && calcModel && calcNode) {
      const nodes = getNodesForBrandModel(calcBrand, calcModel);
      const found = nodes.find(n => n.name === calcNode);
      if (found) setCalcResult(found.price);
    }
  };

  const currentCatNodes = useMemo(() => {
    if (!calcBrand || !calcModel) return [];
    const all = getNodesForBrandModel(calcBrand, calcModel);
    if (workSearch.trim()) {
      return all.filter(n => n.name.toLowerCase().includes(workSearch.toLowerCase()));
    }
    return all.filter(n => n.category === calcActiveCategory);
  }, [calcBrand, calcModel, calcActiveCategory, workSearch]);

  return (
    <div className="min-h-screen bg-white font-golos text-zinc-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
              <Icon name="Wrench" size={15} className="text-white" />
            </div>
            <span className="font-bold text-base tracking-tight uppercase">АвтоСервис</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === item.id ? "text-zinc-900 bg-zinc-100" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+74951234567"
              className="hidden md:flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              <Icon name="Phone" size={13} />
              Позвонить
            </a>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full text-left px-6 py-3 text-sm font-medium border-b border-zinc-50 ${
                  activeSection === item.id ? "bg-zinc-100 text-zinc-900" : "text-zinc-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ======= HOME ======= */}
        {activeSection === "home" && (
          <div>
            <section className="min-h-[92vh] flex items-center relative overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 opacity-[0.04]">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="absolute border border-white" style={{
                    width: `${60 + i * 50}px`, height: `${60 + i * 50}px`,
                    top: "50%", left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * 10}deg)`,
                  }} />
                ))}
              </div>
              <div className="max-w-6xl mx-auto px-6 relative z-10 py-28">
                <div className="max-w-3xl">
                  <p className="text-zinc-500 text-xs tracking-[0.35em] uppercase mb-8">
                    Профессиональный автосервис · Москва
                  </p>
                  <h1 className="text-white text-5xl md:text-[72px] font-bold leading-[1.04] mb-8">
                    Ваш автомобиль<br />
                    <span className="text-zinc-500">в надёжных</span><br />
                    руках
                  </h1>
                  <p className="text-zinc-400 text-lg max-w-xl mb-12 leading-relaxed">
                    Ремонт, обслуживание и шиномонтаж любых марок. 17 лет опыта, 48 мастеров, гарантия на все работы.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">{ALL_BRANDS.length}+ марок</span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">80+ видов работ</span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">Шиномонтаж R13–R22</span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">Гарантия 12 мес.</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => navigate("calc")} className="bg-white text-zinc-900 px-8 py-4 font-semibold text-base hover:bg-zinc-100 transition-colors">
                      Рассчитать стоимость
                    </button>
                    <button onClick={() => navigate("tires")} className="border border-zinc-600 text-white px-8 py-4 font-medium text-base hover:border-zinc-300 transition-colors">
                      Цены на шиномонтаж
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-zinc-100">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {ABOUT_STATS.map((stat, i) => (
                    <div key={i} className="py-12 px-6 border-r border-zinc-100 last:border-r-0 text-center">
                      <div className="text-4xl font-bold mb-2">{stat.value}</div>
                      <div className="text-zinc-500 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-24 max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between mb-14">
                <div>
                  <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Что мы делаем</p>
                  <h2 className="text-4xl font-bold">Услуги</h2>
                </div>
                <button onClick={() => navigate("tires")} className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                  Шиномонтаж <Icon name="ArrowRight" size={15} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-zinc-100">
                {[
                  { icon: "Cog", title: "Двигатель", desc: "Диагностика, ремонт и обслуживание двигателей всех типов" },
                  { icon: "Settings2", title: "КПП", desc: "Ремонт механических, автоматических и вариаторных коробок" },
                  { icon: "CircleDot", title: "Тормоза", desc: "Замена колодок, дисков, прокачка тормозной системы" },
                  { icon: "Gauge", title: "Подвеска", desc: "Диагностика и замена ходовой, развал-схождение" },
                  { icon: "Zap", title: "Электрика", desc: "Диагностика и ремонт электрооборудования" },
                  { icon: "CircleOff", title: "Шиномонтаж", desc: "Монтаж, демонтаж, балансировка R13–R22, ремонт проколов" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 hover:bg-zinc-50 transition-colors group cursor-default">
                    <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center mb-6 group-hover:border-zinc-900 group-hover:bg-zinc-900 transition-all duration-300">
                      <Icon name={item.icon} size={17} className="text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-900 py-24">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-white text-4xl font-bold mb-5">Нужна помощь с автомобилем?</h2>
                <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Позвоните нам — мастер проконсультирует бесплатно и ответит на любые вопросы</p>
                <a href="tel:+74951234567" className="inline-flex items-center gap-3 bg-white text-zinc-900 px-10 py-4 font-semibold hover:bg-zinc-100 transition-colors">
                  <Icon name="Phone" size={18} />
                  +7 (495) 123-45-67
                </a>
              </div>
            </section>
          </div>
        )}

        {/* ======= ABOUT ======= */}
        {activeSection === "about" && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-16">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">О нас</p>
              <h1 className="text-5xl font-bold mb-6">О сервисе</h1>
              <div className="w-16 h-px bg-zinc-900" />
            </div>
            <div className="grid md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Профессиональный подход к каждому автомобилю</h2>
                <p className="text-zinc-500 leading-relaxed mb-5">Работаем с 2007 года и накопили огромный опыт в обслуживании и ремонте автомобилей всех марок. Сервис оснащён современным диагностическим оборудованием.</p>
                <p className="text-zinc-500 leading-relaxed mb-5">Каждый мастер имеет профильное образование и регулярно проходит обучение у официальных дилеров. Гарантируем качество на все виды работ.</p>
                <p className="text-zinc-500 leading-relaxed">Используем оригинальные запчасти или сертифицированные аналоги. Прозрачное ценообразование — вы знаете, за что платите.</p>
              </div>
              <div className="space-y-px bg-zinc-100">
                {[
                  { icon: "Shield", title: "Гарантия на работы", desc: "12 месяцев на все виды ремонта" },
                  { icon: "Clock", title: "Точные сроки", desc: "Выдерживаем обещанные сроки, предупреждаем заранее" },
                  { icon: "BadgeCheck", title: "Честные цены", desc: "Смета согласовывается до начала — никаких сюрпризов" },
                  { icon: "Users", title: "Опытная команда", desc: "48 мастеров с опытом от 5 лет" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 flex gap-4">
                    <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={15} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-zinc-100 pt-16">
              <h2 className="text-2xl font-semibold mb-10">В цифрах</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100">
                {ABOUT_STATS.map((stat, i) => (
                  <div key={i} className="bg-white py-10 px-8">
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-zinc-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======= ШИНОМОНТАЖ ======= */}
        {activeSection === "tires" && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-10">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Услуги и цены</p>
              <h1 className="text-5xl font-bold mb-3">Шиномонтаж</h1>
              <p className="text-zinc-500 text-sm">Работаем с легковыми автомобилями, кроссоверами и внедорожниками. Шины R13–R22.</p>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: "Clock", text: "Без записи, пн–вс 8:00–21:00" },
                { icon: "Shield", text: "Гарантия на балансировку" },
                { icon: "Warehouse", text: "Хранение шин на складе" },
                { icon: "Zap", text: "Сезонная смена за 30 мин" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 border border-zinc-200 px-4 py-2 text-sm text-zinc-600">
                  <Icon name={b.icon} size={14} className="text-zinc-400" />
                  {b.text}
                </div>
              ))}
            </div>

            {/* Category tabs */}
            <div className="flex gap-px bg-zinc-100 mb-0 overflow-x-auto">
              {TIRE_CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setTireCategory(i)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    tireCategory === i ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {cat.category}
                  {cat.subtitle && <span className={`ml-2 text-xs ${tireCategory === i ? "text-zinc-400" : "text-zinc-400"}`}>{cat.subtitle}</span>}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="border border-zinc-100 border-t-0">
              {/* Header */}
              <div className="grid bg-zinc-900 text-white text-xs uppercase tracking-wider" style={{ gridTemplateColumns: "1fr 140px 140px 140px" }}>
                <div className="px-6 py-4">Наименование услуги</div>
                <div className="px-4 py-4 text-center">R13–R15</div>
                <div className="px-4 py-4 text-center">R16–R17</div>
                <div className="px-4 py-4 text-center">R18–R22</div>
              </div>

              {TIRE_CATEGORIES[tireCategory].items.map((item, i) => (
                <div
                  key={i}
                  className="grid border-t border-zinc-100 hover:bg-zinc-50 transition-colors"
                  style={{ gridTemplateColumns: "1fr 140px 140px 140px" }}
                >
                  <div className="px-6 py-4 text-sm font-medium">{item.name}</div>
                  <div className={`px-4 py-4 text-sm text-center font-medium ${item.r13_15 === "бесплатно" ? "text-emerald-600" : item.r13_15 === "—" ? "text-zinc-300" : "text-zinc-900"}`}>
                    {item.r13_15}
                  </div>
                  <div className={`px-4 py-4 text-sm text-center font-medium ${item.r16_17 === "бесплатно" ? "text-emerald-600" : item.r16_17 === "—" ? "text-zinc-300" : "text-zinc-900"}`}>
                    {item.r16_17}
                  </div>
                  <div className={`px-4 py-4 text-sm text-center font-medium ${item.r18_20 === "бесплатно" ? "text-emerald-600" : item.r18_20 === "—" ? "text-zinc-300" : "text-zinc-900"}`}>
                    {item.r18_20}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-zinc-400 text-xs mt-4">* Цены указаны за единицу работы, если не обозначено иное. При комплексном заказе — скидки.</p>

            {/* Bottom promo */}
            <div className="mt-12 grid md:grid-cols-3 gap-px bg-zinc-100">
              {[
                { icon: "Percent", title: "Скидка 10%", desc: "При сезонной смене резины комплектом (4 колеса)" },
                { icon: "Package", title: "Хранение шин", desc: "Удобное хранение на нашем складе — не надо везти домой" },
                { icon: "Timer", title: "Быстро", desc: "Сезонная смена 4 колёс без записи за 20–40 минут" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 flex gap-4">
                  <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======= CALCULATOR ======= */}
        {activeSection === "calc" && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Стоимость ремонта</p>
              <h1 className="text-5xl font-bold mb-3">Калькулятор</h1>
              <p className="text-zinc-500 text-sm">Выберите марку, модель и конкретный вид работы — получите цену</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: form */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                    Марка автомобиля
                    <span className="ml-2 normal-case tracking-normal font-normal text-zinc-400">{ALL_BRANDS.length} доступно</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Начните вводить марку..."
                    value={calcBrandSearch}
                    onChange={e => setCalcBrandSearch(e.target.value)}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors mb-1"
                  />
                  <select
                    value={calcBrand}
                    onChange={e => { setCalcBrand(e.target.value); setCalcModel(""); setCalcNode(""); setCalcResult(null); }}
                    size={4}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  >
                    <option value="">— Выберите марку —</option>
                    {filteredCalcBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Модель</label>
                  <select
                    value={calcModel}
                    onChange={e => { setCalcModel(e.target.value); setCalcNode(""); setCalcResult(null); }}
                    disabled={!calcBrand}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-40"
                  >
                    <option value="">Выберите модель</option>
                    {calcModels.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>

                {calcBrand && calcModel && (
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-3 text-zinc-500">
                      Вид работы
                      <span className="ml-2 normal-case tracking-normal font-normal text-zinc-400">{getNodesForBrandModel(calcBrand, calcModel).length} позиций</span>
                    </label>

                    {/* Work search */}
                    <div className="relative mb-3">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon name="Search" size={14} className="text-zinc-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Поиск по виду работы..."
                        value={workSearch}
                        onChange={e => { setWorkSearch(e.target.value); setCalcActiveCategory(NODES_CATEGORIES[0]); }}
                        className="w-full border-2 border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                      />
                      {workSearch && (
                        <button
                          onClick={() => setWorkSearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      )}
                    </div>

                    {/* Category tabs — скрываем при активном поиске */}
                    {!workSearch && (
                      <div className="flex gap-px bg-zinc-100 mb-3 overflow-x-auto">
                        {NODES_CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setCalcActiveCategory(cat)}
                            className={`px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                              calcActiveCategory === cat ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 hover:text-zinc-900"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}

                    {workSearch && (
                      <p className="text-xs text-zinc-400 mb-2 px-1">
                        Найдено: {currentCatNodes.length} {currentCatNodes.length === 0 ? "работ" : "работ"}
                      </p>
                    )}

                    <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                      {currentCatNodes.length > 0 ? currentCatNodes.map(node => (
                        <button
                          key={node.name}
                          onClick={() => { setCalcNode(node.name); setCalcResult(null); }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 border text-sm transition-all text-left ${
                            calcNode === node.name
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white"
                          }`}
                        >
                          <span className="flex-1 min-w-0 pr-2">
                            {workSearch ? (
                              // Подсветка найденного текста
                              (() => {
                                const idx = node.name.toLowerCase().indexOf(workSearch.toLowerCase());
                                if (idx === -1) return node.name;
                                return <>
                                  {node.name.slice(0, idx)}
                                  <mark className={`${calcNode === node.name ? "bg-zinc-700 text-white" : "bg-yellow-100 text-zinc-900"} rounded-sm px-0.5`}>
                                    {node.name.slice(idx, idx + workSearch.length)}
                                  </mark>
                                  {node.name.slice(idx + workSearch.length)}
                                </>;
                              })()
                            ) : node.name}
                          </span>
                          <span className={`text-xs flex-shrink-0 ${calcNode === node.name ? "text-zinc-400" : "text-zinc-400"}`}>
                            {node.price[0].toLocaleString("ru")}–{node.price[1].toLocaleString("ru")} ₽
                          </span>
                        </button>
                      )) : (
                        <div className="py-8 text-center text-zinc-400 text-sm border-2 border-dashed border-zinc-200">
                          <Icon name="SearchX" size={22} className="mx-auto mb-2 text-zinc-300" />
                          Ничего не найдено по запросу «{workSearch}»
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCalc}
                  disabled={!calcBrand || !calcModel || !calcNode}
                  className="w-full bg-zinc-900 text-white py-4 font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Рассчитать стоимость
                </button>
              </div>

              {/* Right: result */}
              <div className="flex flex-col">
                {calcResult ? (
                  <div>
                    <div className="border-2 border-zinc-900 p-8 mb-4">
                      <p className="text-xs uppercase tracking-wider text-zinc-400 mb-5">Предварительная стоимость</p>
                      <div className="mb-1">
                        <span className="text-4xl font-bold">{calcResult[0].toLocaleString("ru")}</span>
                        <span className="text-2xl font-bold text-zinc-400"> — {calcResult[1].toLocaleString("ru")} ₽</span>
                      </div>
                      <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
                        {calcBrand} {calcModel} · {calcNode}
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-5 mb-4 space-y-2.5">
                      <p className="text-sm font-medium mb-3">Что входит:</p>
                      {["Диагностика и дефектовка", "Стоимость работ мастера", "Гарантия 12 месяцев"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                          <div className="w-1.5 h-1.5 bg-zinc-900 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                      <p className="text-zinc-400 text-xs pt-1">* Запчасти рассчитываются отдельно при осмотре</p>
                    </div>
                    <a href="tel:+74951234567" className="w-full border-2 border-zinc-900 py-4 font-semibold text-sm hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center gap-2">
                      <Icon name="Phone" size={15} />
                      Позвонить и уточнить
                    </a>
                  </div>
                ) : (
                  <div className="sticky top-24">
                    <div className="border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-16 text-center mb-6">
                      <div className="w-16 h-16 border-2 border-zinc-200 flex items-center justify-center mb-5">
                        <Icon name="Calculator" size={26} className="text-zinc-300" />
                      </div>
                      <p className="text-zinc-400 font-medium mb-1">Заполните форму слева</p>
                      <p className="text-zinc-300 text-sm">Выберите марку, модель и вид работы</p>
                    </div>
                    {calcBrand && !calcModel && (
                      <div className="p-4 bg-zinc-50 border border-zinc-100 text-sm text-zinc-500">
                        <p className="font-medium text-zinc-700 mb-1">{calcBrand}</p>
                        <p>{calcModels.length} моделей доступно</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======= CONTACTS ======= */}
        {activeSection === "contacts" && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Свяжитесь с нами</p>
              <h1 className="text-5xl font-bold mb-4">Контакты</h1>
              <div className="w-16 h-px bg-zinc-900" />
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <div className="space-y-px mb-8">
                  {CONTACTS.map((c, i) => (
                    <div key={i} className="flex items-start gap-5 p-6 bg-zinc-50 hover:bg-zinc-100 transition-colors">
                      <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={15} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">{c.label}</p>
                        <p className="font-medium">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 text-white p-6">
                  <h3 className="font-semibold mb-2">Бесплатная консультация</h3>
                  <p className="text-zinc-400 text-sm mb-4">Позвоните нам — мастер ответит на вопросы и поможет разобраться с проблемой</p>
                  <a href="tel:+74951234567" className="inline-flex items-center gap-2 font-semibold hover:text-zinc-300 transition-colors">
                    <Icon name="Phone" size={15} />
                    +7 (495) 123-45-67
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Как нас найти</h2>
                <p className="text-zinc-500 text-sm mb-6">г. Москва, ул. Промышленная, 42. Рядом с метро Текстильщики, бесплатная парковка на территории.</p>
                <div className="bg-zinc-100 aspect-video flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Icon name="MapPin" size={32} className="text-zinc-400 mx-auto mb-3" />
                    <p className="text-zinc-400 text-sm">Карта</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "Car", text: "Бесплатная парковка" },
                    { icon: "Train", text: "5 мин от метро" },
                    { icon: "Coffee", text: "Зона ожидания" },
                    { icon: "Wifi", text: "Бесплатный Wi-Fi" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-zinc-50 text-sm text-zinc-600">
                      <Icon name={item.icon} size={14} className="text-zinc-400 flex-shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 py-10 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 flex items-center justify-center">
              <Icon name="Wrench" size={11} className="text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-tight">АвтоСервис</span>
          </div>
          <p className="text-zinc-400 text-sm">© 2007 – 2026. Все права защищены.</p>
          <div className="flex gap-5">
            {navItems.slice(1).map(item => (
              <button key={item.id} onClick={() => navigate(item.id)} className="text-zinc-400 text-sm hover:text-zinc-900 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}