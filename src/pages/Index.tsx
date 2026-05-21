import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SERVICES_DATA = [
  { brand: "BMW", models: ["3 серия", "5 серия", "7 серия", "X5", "X3"], prices: { "Двигатель": [15000, 85000], "КПП": [12000, 60000], "Тормоза": [3500, 18000], "Подвеска": [4000, 25000], "Электрика": [2000, 30000] } },
  { brand: "Mercedes", models: ["C-класс", "E-класс", "S-класс", "GLE", "GLC"], prices: { "Двигатель": [18000, 95000], "КПП": [14000, 70000], "Тормоза": [4000, 20000], "Подвеска": [5000, 28000], "Электрика": [2500, 35000] } },
  { brand: "Toyota", models: ["Camry", "RAV4", "Land Cruiser", "Corolla", "Highlander"], prices: { "Двигатель": [10000, 65000], "КПП": [8000, 45000], "Тормоза": [2500, 14000], "Подвеска": [3000, 18000], "Электрика": [1500, 22000] } },
  { brand: "Audi", models: ["A4", "A6", "Q5", "Q7", "A8"], prices: { "Двигатель": [16000, 90000], "КПП": [13000, 65000], "Тормоза": [3800, 19000], "Подвеска": [4500, 26000], "Электрика": [2200, 32000] } },
  { brand: "Volkswagen", models: ["Passat", "Tiguan", "Golf", "Touareg", "Polo"], prices: { "Двигатель": [9000, 55000], "КПП": [7500, 40000], "Тормоза": [2200, 13000], "Подвеска": [2800, 16000], "Электрика": [1400, 20000] } },
  { brand: "Kia", models: ["Sportage", "Sorento", "Rio", "Cerato", "Stinger"], prices: { "Двигатель": [7000, 45000], "КПП": [6000, 35000], "Тормоза": [2000, 11000], "Подвеска": [2500, 14000], "Электрика": [1200, 17000] } },
  { brand: "Hyundai", models: ["Tucson", "Santa Fe", "Solaris", "Elantra", "Creta"], prices: { "Двигатель": [7000, 44000], "КПП": [6000, 34000], "Тормоза": [2000, 11000], "Подвеска": [2400, 13500], "Электрика": [1200, 16000] } },
  { brand: "Lada", models: ["Vesta", "Granta", "Niva", "XRAY", "Largus"], prices: { "Двигатель": [4000, 25000], "КПП": [3500, 20000], "Тормоза": [1200, 7000], "Подвеска": [1500, 9000], "Электрика": [800, 10000] } },
];

const NODES = ["Двигатель", "КПП", "Тормоза", "Подвеска", "Электрика"];

const PRICE_LIST = [
  { category: "Двигатель", items: [
    { name: "Замена масла и фильтра", price: "от 800 ₽", time: "30 мин" },
    { name: "Диагностика двигателя", price: "от 1 500 ₽", time: "1 час" },
    { name: "Замена ремня ГРМ", price: "от 5 000 ₽", time: "3–5 часов" },
    { name: "Капитальный ремонт ДВС", price: "от 25 000 ₽", time: "3–7 дней" },
  ]},
  { category: "КПП", items: [
    { name: "Замена масла в КПП", price: "от 1 200 ₽", time: "1 час" },
    { name: "Диагностика КПП", price: "от 2 000 ₽", time: "1–2 часа" },
    { name: "Ремонт АКПП", price: "от 15 000 ₽", time: "2–5 дней" },
    { name: "Замена сцепления", price: "от 8 000 ₽", time: "4–6 часов" },
  ]},
  { category: "Тормоза", items: [
    { name: "Замена тормозных колодок", price: "от 1 500 ₽", time: "1 час" },
    { name: "Замена тормозных дисков", price: "от 3 500 ₽", time: "1.5 часа" },
    { name: "Прокачка тормозной системы", price: "от 1 000 ₽", time: "1 час" },
    { name: "Замена тормозного цилиндра", price: "от 2 500 ₽", time: "2 часа" },
  ]},
  { category: "Подвеска", items: [
    { name: "Замена амортизаторов", price: "от 3 000 ₽", time: "2–3 часа" },
    { name: "Замена рычагов подвески", price: "от 2 500 ₽", time: "2 часа" },
    { name: "Развал-схождение", price: "от 2 000 ₽", time: "1 час" },
    { name: "Замена рулевых наконечников", price: "от 1 800 ₽", time: "1.5 часа" },
  ]},
  { category: "Электрика", items: [
    { name: "Компьютерная диагностика", price: "от 1 000 ₽", time: "30 мин" },
    { name: "Замена аккумулятора", price: "от 500 ₽", time: "30 мин" },
    { name: "Ремонт генератора", price: "от 3 000 ₽", time: "2–4 часа" },
    { name: "Ремонт стартера", price: "от 2 500 ₽", time: "2–3 часа" },
  ]},
];

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

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О сервисе" },
  { id: "price", label: "Прайс-лист" },
  { id: "calc", label: "Калькулятор" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchNode, setSearchNode] = useState("");
  const [calcBrand, setCalcBrand] = useState("");
  const [calcModel, setCalcModel] = useState("");
  const [calcNode, setCalcNode] = useState("");
  const [calcResult, setCalcResult] = useState<[number, number] | null>(null);
  const [priceCategory, setPriceCategory] = useState("Двигатель");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const brands = SERVICES_DATA.map(s => s.brand);
  const calcModels = calcBrand ? SERVICES_DATA.find(s => s.brand === calcBrand)?.models || [] : [];

  const handleCalc = () => {
    if (calcBrand && calcNode) {
      const brandData = SERVICES_DATA.find(s => s.brand === calcBrand);
      if (brandData) setCalcResult(brandData.prices[calcNode] as [number, number]);
    }
  };

  const navigate = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

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
            <button
              onClick={() => navigate("contacts")}
              className="hidden md:block bg-zinc-900 text-white px-5 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Записаться
            </button>
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
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
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
                    Ремонт и обслуживание любых марок. 17 лет опыта, 48 мастеров, гарантия на все работы.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("contacts")}
                      className="bg-white text-zinc-900 px-8 py-4 font-semibold text-base hover:bg-zinc-100 transition-colors"
                    >
                      Записаться на ремонт
                    </button>
                    <button
                      onClick={() => navigate("calc")}
                      className="border border-zinc-600 text-white px-8 py-4 font-medium text-base hover:border-zinc-300 transition-colors"
                    >
                      Рассчитать стоимость
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats bar */}
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

            {/* Services grid */}
            <section className="py-24 max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between mb-14">
                <div>
                  <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Что мы делаем</p>
                  <h2 className="text-4xl font-bold">Услуги</h2>
                </div>
                <button
                  onClick={() => navigate("price")}
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Прайс-лист <Icon name="ArrowRight" size={15} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-zinc-100">
                {[
                  { icon: "Cog", title: "Двигатель", desc: "Диагностика, ремонт и обслуживание двигателей всех типов" },
                  { icon: "Settings2", title: "КПП", desc: "Ремонт механических, автоматических и вариаторных коробок" },
                  { icon: "CircleDot", title: "Тормоза", desc: "Замена колодок, дисков, прокачка тормозной системы" },
                  { icon: "Gauge", title: "Подвеска", desc: "Диагностика и замена ходовой, развал-схождение" },
                  { icon: "Zap", title: "Электрика", desc: "Диагностика и ремонт электрооборудования" },
                  { icon: "Droplets", title: "ТО и замена масла", desc: "Плановое обслуживание, жидкости, фильтры" },
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

            {/* CTA */}
            <section className="bg-zinc-900 py-24">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-white text-4xl font-bold mb-5">Нужна помощь с автомобилем?</h2>
                <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Запишитесь онлайн или позвоните — мастер проконсультирует бесплатно</p>
                <button
                  onClick={() => navigate("contacts")}
                  className="bg-white text-zinc-900 px-10 py-4 font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Записаться на сервис
                </button>
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
                <p className="text-zinc-500 leading-relaxed mb-5">
                  Работаем с 2007 года и накопили огромный опыт в обслуживании и ремонте автомобилей всех марок. Сервис оснащён современным диагностическим оборудованием.
                </p>
                <p className="text-zinc-500 leading-relaxed mb-5">
                  Каждый мастер имеет профильное образование и регулярно проходит обучение у официальных дилеров. Гарантируем качество на все виды работ.
                </p>
                <p className="text-zinc-500 leading-relaxed">
                  Используем оригинальные запчасти или сертифицированные аналоги. Прозрачное ценообразование — вы знаете, за что платите.
                </p>
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

        {/* ======= PRICE ======= */}
        {activeSection === "price" && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Стоимость работ</p>
              <h1 className="text-5xl font-bold mb-3">Прайс-лист</h1>
              <p className="text-zinc-500 text-sm">Выберите марку и узел для фильтрации по вашему автомобилю</p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 p-6 bg-zinc-50 border border-zinc-100">
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Марка автомобиля</label>
                <select
                  value={searchBrand}
                  onChange={e => setSearchBrand(e.target.value)}
                  className="w-full border border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                >
                  <option value="">Все марки</option>
                  {brands.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Узел ремонта</label>
                <select
                  value={searchNode}
                  onChange={e => { setSearchNode(e.target.value); if (e.target.value) setPriceCategory(e.target.value); }}
                  className="w-full border border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                >
                  <option value="">Все узлы</option>
                  {NODES.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-px bg-zinc-100 mb-6 overflow-x-auto">
              {PRICE_LIST.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => { setPriceCategory(cat.category); setSearchNode(""); }}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    priceCategory === cat.category
                      ? "bg-zinc-900 text-white"
                      : "bg-white text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="border border-zinc-100">
              <div className="grid grid-cols-3 bg-zinc-900 text-white text-xs uppercase tracking-wider">
                <div className="px-6 py-4">Наименование работы</div>
                <div className="px-6 py-4 text-center">Время</div>
                <div className="px-6 py-4 text-right">Стоимость</div>
              </div>
              {PRICE_LIST.filter(c => !searchNode ? c.category === priceCategory : c.category === searchNode).map(cat =>
                cat.items.map((item, i) => (
                  <div key={i} className="grid grid-cols-3 border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <div className="px-6 py-4 text-sm font-medium">{item.name}</div>
                    <div className="px-6 py-4 text-sm text-zinc-500 text-center flex items-center justify-center gap-1.5">
                      <Icon name="Clock" size={12} className="text-zinc-300" />
                      {item.time}
                    </div>
                    <div className="px-6 py-4 text-sm font-semibold text-right">{item.price}</div>
                  </div>
                ))
              )}
            </div>

            {searchBrand && (
              <div className="mt-4 p-4 bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                <Icon name="Info" size={15} className="text-zinc-400 flex-shrink-0" />
                <p className="text-zinc-500 text-sm">
                  Для <strong>{searchBrand}</strong> точную стоимость можно рассчитать в{" "}
                  <button onClick={() => navigate("calc")} className="underline font-medium text-zinc-900">Калькуляторе</button>
                </p>
              </div>
            )}
            <p className="text-zinc-400 text-xs mt-4">* Стоимость зависит от марки и модели. Для точного расчёта воспользуйтесь калькулятором.</p>
          </div>
        )}

        {/* ======= CALCULATOR ======= */}
        {activeSection === "calc" && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Стоимость ремонта</p>
              <h1 className="text-5xl font-bold mb-3">Калькулятор</h1>
              <p className="text-zinc-500 text-sm">Выберите параметры — получите предварительную стоимость</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-3 text-zinc-500">Марка автомобиля</label>
                  <select
                    value={calcBrand}
                    onChange={e => { setCalcBrand(e.target.value); setCalcModel(""); setCalcResult(null); }}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  >
                    <option value="">Выберите марку</option>
                    {brands.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-3 text-zinc-500">Модель</label>
                  <select
                    value={calcModel}
                    onChange={e => { setCalcModel(e.target.value); setCalcResult(null); }}
                    disabled={!calcBrand}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-40"
                  >
                    <option value="">Выберите модель</option>
                    {calcModels.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-3 text-zinc-500">Узел ремонта</label>
                  <div className="grid grid-cols-1 gap-2">
                    {NODES.map(node => (
                      <button
                        key={node}
                        onClick={() => { setCalcNode(node); setCalcResult(null); }}
                        className={`flex items-center justify-between px-4 py-3 border-2 text-sm font-medium transition-all ${
                          calcNode === node
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white"
                        }`}
                      >
                        <span>{node}</span>
                        {calcNode === node && <Icon name="Check" size={15} />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCalc}
                  disabled={!calcBrand || !calcNode}
                  className="w-full bg-zinc-900 text-white py-4 font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Рассчитать стоимость
                </button>
              </div>

              <div className="flex flex-col">
                {calcResult ? (
                  <div>
                    <div className="border-2 border-zinc-900 p-8 mb-4">
                      <p className="text-xs uppercase tracking-wider text-zinc-400 mb-5">Предварительная стоимость</p>
                      <div className="mb-3">
                        <span className="text-5xl font-bold">{calcResult[0].toLocaleString("ru")}</span>
                        <span className="text-2xl font-bold text-zinc-400"> — {calcResult[1].toLocaleString("ru")} ₽</span>
                      </div>
                      <p className="text-zinc-500 text-sm">
                        {calcBrand}{calcModel ? ` · ${calcModel}` : ""} · {calcNode}
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
                    <button
                      onClick={() => navigate("contacts")}
                      className="w-full border-2 border-zinc-900 py-4 font-semibold text-sm hover:bg-zinc-900 hover:text-white transition-all"
                    >
                      Записаться на ремонт
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 border-2 border-zinc-200 flex items-center justify-center mb-5">
                      <Icon name="Calculator" size={26} className="text-zinc-300" />
                    </div>
                    <p className="text-zinc-400 font-medium mb-1">Заполните форму</p>
                    <p className="text-zinc-300 text-sm">Выберите марку, модель и узел</p>
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
                  <p className="text-zinc-400 text-sm mb-4">Опишите проблему — мастер перезвонит в течение 15 минут</p>
                  <a href="tel:+74951234567" className="inline-flex items-center gap-2 font-semibold hover:text-zinc-300 transition-colors">
                    <Icon name="Phone" size={15} />
                    +7 (495) 123-45-67
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-6">Записаться на сервис</h2>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Ваше имя</label>
                    <input type="text" placeholder="Иван Иванов" className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Марка и модель</label>
                    <input type="text" placeholder="Например: BMW 5 серия 2020" className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Опишите проблему</label>
                    <textarea rows={4} placeholder="Стук при торможении, не заводится, плановое ТО..." className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-zinc-900 text-white py-4 font-semibold hover:bg-zinc-700 transition-colors">
                    Отправить заявку
                  </button>
                  <p className="text-zinc-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                </form>
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