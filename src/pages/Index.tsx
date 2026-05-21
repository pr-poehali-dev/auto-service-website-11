import { useState, useEffect, useMemo } from "react";
import Icon from "@/components/ui/icon";
import {
  ALL_BRANDS,
  NODES_CATEGORIES,
  CAR_DATA,
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

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О сервисе" },
  { id: "price", label: "Прайс-лист" },
  { id: "calc", label: "Калькулятор" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Price section state
  const [priceBrand, setPriceBrand] = useState("");
  const [priceModel, setPriceModel] = useState("");
  const [priceCategory, setPriceCategory] = useState("Двигатель");
  const [brandSearch, setBrandSearch] = useState("");

  // Calculator state
  const [calcBrand, setCalcBrand] = useState("");
  const [calcModel, setCalcModel] = useState("");
  const [calcNode, setCalcNode] = useState("");
  const [calcResult, setCalcResult] = useState<[number, number] | null>(null);
  const [calcBrandSearch, setCalcBrandSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const navigate = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  // Price section computed
  const priceModels = useMemo(() => priceBrand ? getModelsForBrand(priceBrand) : [], [priceBrand]);
  const priceNodes = useMemo(() => {
    if (priceBrand && priceModel) {
      const nodes = getNodesForBrandModel(priceBrand, priceModel);
      return nodes.filter(n => n.category === priceCategory);
    }
    return [];
  }, [priceBrand, priceModel, priceCategory]);

  // Default price list (без выбранного автомобиля)
  const defaultPriceNodes = useMemo(() => {
    const defaultBrand = CAR_DATA[3]; // VW как средний ориентир
    const defaultModel = defaultBrand.models[1];
    return defaultModel.nodes.filter(n => n.category === priceCategory);
  }, [priceCategory]);

  const filteredBrands = useMemo(() =>
    ALL_BRANDS.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())),
    [brandSearch]
  );
  const filteredCalcBrands = useMemo(() =>
    ALL_BRANDS.filter(b => b.toLowerCase().includes(calcBrandSearch.toLowerCase())),
    [calcBrandSearch]
  );

  // Calculator computed
  const calcModels = useMemo(() => calcBrand ? getModelsForBrand(calcBrand) : [], [calcBrand]);

  const handleCalc = () => {
    if (calcBrand && calcModel && calcNode) {
      const nodes = getNodesForBrandModel(calcBrand, calcModel);
      const found = nodes.find(n => n.name === calcNode);
      if (found) setCalcResult(found.price);
    }
  };

  const displayNodes = priceBrand && priceModel ? priceNodes : defaultPriceNodes;
  const isCustomPrice = priceBrand && priceModel;

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
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">{ALL_BRANDS.length}+ марок</span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">50 видов работ</span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">Гарантия 12 мес.</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => navigate("contacts")} className="bg-white text-zinc-900 px-8 py-4 font-semibold text-base hover:bg-zinc-100 transition-colors">
                      Записаться на ремонт
                    </button>
                    <button onClick={() => navigate("calc")} className="border border-zinc-600 text-white px-8 py-4 font-medium text-base hover:border-zinc-300 transition-colors">
                      Рассчитать стоимость
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
                <button onClick={() => navigate("price")} className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
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

            <section className="bg-zinc-900 py-24">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-white text-4xl font-bold mb-5">Нужна помощь с автомобилем?</h2>
                <p className="text-zinc-400 mb-10 max-w-lg mx-auto">Запишитесь онлайн или позвоните — мастер проконсультирует бесплатно</p>
                <button onClick={() => navigate("contacts")} className="bg-white text-zinc-900 px-10 py-4 font-semibold hover:bg-zinc-100 transition-colors">
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

        {/* ======= PRICE ======= */}
        {activeSection === "price" && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-10">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">Стоимость работ</p>
              <h1 className="text-5xl font-bold mb-3">Прайс-лист</h1>
              <p className="text-zinc-500 text-sm">Выберите марку и модель, чтобы увидеть цены для вашего автомобиля</p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 p-6 bg-zinc-50 border border-zinc-100">
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                  Марка автомобиля
                  <span className="ml-2 text-zinc-300 normal-case tracking-normal font-normal">{ALL_BRANDS.length} марок</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск марки..."
                    value={brandSearch}
                    onChange={e => setBrandSearch(e.target.value)}
                    className="w-full border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors mb-1"
                  />
                </div>
                <select
                  value={priceBrand}
                  onChange={e => { setPriceBrand(e.target.value); setPriceModel(""); }}
                  size={5}
                  className="w-full border border-zinc-200 bg-white px-3 py-1 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                >
                  <option value="">— Все марки —</option>
                  {filteredBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                  Модель
                  {priceModels.length > 0 && <span className="ml-2 text-zinc-300 normal-case tracking-normal font-normal">{priceModels.length} моделей</span>}
                </label>
                <select
                  value={priceModel}
                  onChange={e => setPriceModel(e.target.value)}
                  disabled={!priceBrand}
                  size={5}
                  className="w-full border border-zinc-200 bg-white px-3 py-1 text-sm focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-40 mt-7"
                >
                  <option value="">— Выберите модель —</option>
                  {priceModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                  {isCustomPrice ? (
                    <span className="text-zinc-700">{priceBrand} {priceModel}</span>
                  ) : "Цены для Volkswagen Jetta"}
                </label>
                <div className="mt-7 space-y-1">
                  {isCustomPrice ? (
                    <div className="p-3 bg-zinc-900 text-white text-sm">
                      <p className="font-medium">Цены подобраны для вашего авто</p>
                      <p className="text-zinc-400 text-xs mt-1">50 видов работ · 5 категорий</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-500">
                      Выберите марку и модель для точных цен по вашему автомобилю
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-px bg-zinc-100 mb-6 overflow-x-auto">
              {NODES_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setPriceCategory(cat)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    priceCategory === cat ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price table */}
            <div className="border border-zinc-100">
              <div className="grid grid-cols-3 bg-zinc-900 text-white text-xs uppercase tracking-wider">
                <div className="px-6 py-4">Наименование работы</div>
                <div className="px-6 py-4 text-center">Время</div>
                <div className="px-6 py-4 text-right">Стоимость</div>
              </div>
              {displayNodes.length > 0 ? displayNodes.map((node, i) => (
                <div key={i} className="grid grid-cols-3 border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <div className="px-6 py-4 text-sm font-medium">{node.name}</div>
                  <div className="px-6 py-4 text-sm text-zinc-500 text-center flex items-center justify-center gap-1.5">
                    <Icon name="Clock" size={12} className="text-zinc-300" />
                    {node.time}
                  </div>
                  <div className="px-6 py-4 text-sm font-semibold text-right">
                    {node.price[0].toLocaleString("ru")} – {node.price[1].toLocaleString("ru")} ₽
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center text-zinc-400 text-sm">
                  Выберите марку и модель для отображения цен
                </div>
              )}
            </div>

            <p className="text-zinc-400 text-xs mt-4">* Итоговая стоимость зависит от состояния автомобиля и комплектующих. Точный расчёт — после диагностики.</p>
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
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                      Вид работы
                      <span className="ml-2 normal-case tracking-normal font-normal text-zinc-400">50 позиций</span>
                    </label>
                    {NODES_CATEGORIES.map(cat => {
                      const catNodes = getNodesForBrandModel(calcBrand, calcModel).filter(n => n.category === cat);
                      return (
                        <div key={cat} className="mb-3">
                          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1.5 px-1">{cat}</p>
                          <div className="space-y-1">
                            {catNodes.map(node => (
                              <button
                                key={node.name}
                                onClick={() => { setCalcNode(node.name); setCalcResult(null); }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 border text-sm transition-all text-left ${
                                  calcNode === node.name
                                    ? "border-zinc-900 bg-zinc-900 text-white"
                                    : "border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white"
                                }`}
                              >
                                <span>{node.name}</span>
                                <span className={`text-xs ml-2 flex-shrink-0 ${calcNode === node.name ? "text-zinc-400" : "text-zinc-400"}`}>
                                  {node.price[0].toLocaleString("ru")}–{node.price[1].toLocaleString("ru")} ₽
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
                    <button onClick={() => navigate("contacts")} className="w-full border-2 border-zinc-900 py-4 font-semibold text-sm hover:bg-zinc-900 hover:text-white transition-all">
                      Записаться на ремонт
                    </button>
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Марка</label>
                      <select className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors">
                        <option value="">Выберите</option>
                        {ALL_BRANDS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">Год</label>
                      <input type="text" placeholder="2020" className="w-full border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors" />
                    </div>
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
