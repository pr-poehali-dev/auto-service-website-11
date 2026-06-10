import { useState, useEffect, useMemo, useRef } from "react";
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
  { value: "98%", label: "довольных клиентов" },
];

const CONTACTS = [
  {
    icon: "MapPin",
    label: "Адрес",
    value:
      "территория Микрорайон, 9А, деревня Гряды, Волоколамский муниципальный округ, Московская область, 143650",
  },
  { icon: "Phone", label: "Телефон", value: "+7 (910) 444-11-49" },
  { icon: "Phone", label: "Телефон 2", value: "+7 (985) 491-25-26" },
  { icon: "Clock", label: "Часы работы", value: "Пн–Вс: 9:00 – 18:00" },
];

// Шиномонтаж данные
// Колонки: 13", 14", 15", 16", 17", 18", 19", 20-21", 22"
const TIRE_COLS = ['13"', '14"', '15"', '16"', '17"', '18"', '19"', '20–21"', '22"+'];

interface TireItem {
  name: string;
  prices: (string | null)[];
  note?: string;
}
interface TireSection {
  title: string;
  items: TireItem[];
}

const TIRE_DATA: TireSection[] = [
  {
    title: "Монтаж/Демонтаж колёс",
    items: [
      { name: "Снятие и установка колеса", prices: ["100", "100", "150", "150", "200", "250", "300", "300", "500"] },
      { name: "Монтаж/Демонтаж колеса", prices: ["250", "250", "250", "250", "300", "300", "400", "500", "800"] },
    ],
  },
  {
    title: "Балансировка колёс",
    items: [
      { name: "1 колесо", prices: ["250", "300", "300", "400", "450", "500", "600", "700", "1 000"] },
    ],
  },
  {
    title: "Комплекс шиномонтажных работ (переобувка)",
    items: [
      { name: "Комплекс (4 колеса)", prices: ["2 400", "2 600", "2 800", "3 000", "3 500", "4 000", "5 000", "6 000", "9 000"] },
    ],
  },
  {
    title: "Замена готового комплекта с балансировкой",
    items: [
      { name: "Комплекс (4 колеса)", prices: ["1 400", "1 600", "1 800", "2 200", "2 500", "3 000", "3 600", "4 000", "6 000"] },
    ],
  },
  {
    title: "Дополнительные работы",
    items: [
      { name: "Установка нового вентилятора (колесо)", prices: ["500", "500", "500", "500", "500", "500", "500", "500", "500"] },
      { name: "Утилизация покрышки (колесо)", prices: ["500", "500", "500", "500", "500", "500", "500", "500", "500"] },
      { name: "Установка жгута — ремонт шины (колесо)", prices: ["1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000"] },
      { name: "Установка грибка/заплатки", prices: ["1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000"] },
      { name: "Герметизация обвода б/к шины (одна сторона)", prices: ["1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000", "1 000"] },
      { name: "Пакет для покрышек (колесо)", prices: [null, null, null, null, null, null, null, null, null], note: "Бесплатно" },
      { name: "Хранение шин (4 колеса)", prices: [null, null, null, null, null, null, null, null, null], note: "1 000 ₽/комплект/месяц" },
      { name: "Подкачка шин (4 колеса)", prices: [null, null, null, null, null, null, null, null, null], note: "100 ₽" },
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
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem("cookie_accepted") === "1";
  });

  // Calculator state
  const [calcBrand, setCalcBrand] = useState("");
  const [calcModel, setCalcModel] = useState<string>("");
  const [calcBrandSearch, setCalcBrandSearch] = useState("");
  const [calcActiveCategory, setCalcActiveCategory] = useState(
    NODES_CATEGORIES[0],
  );
  const [workSearch, setWorkSearch] = useState("");
  // Мультивыбор работ: { name, price }[]
  const [selectedWorks, setSelectedWorks] = useState<
    { name: string; price: [number, number] }[]
  >([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const navigate = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const filteredCalcBrands = useMemo(
    () =>
      ALL_BRANDS.filter((b) =>
        b.toLowerCase().includes(calcBrandSearch.toLowerCase()),
      ),
    [calcBrandSearch],
  );

  const calcModels = useMemo(
    () => (calcBrand ? getModelsForBrand(calcBrand) : []),
    [calcBrand],
  );

  const currentCatNodes = useMemo(() => {
    if (!calcBrand || !calcModel) return [];
    const all = getNodesForBrandModel(calcBrand, calcModel);
    if (workSearch.trim()) {
      return all.filter((n) =>
        n.name.toLowerCase().includes(workSearch.toLowerCase()),
      );
    }
    return all.filter((n) => n.category === calcActiveCategory);
  }, [calcBrand, calcModel, calcActiveCategory, workSearch]);

  const toggleWork = (name: string, price: [number, number]) => {
    setSelectedWorks((prev) => {
      const exists = prev.find((w) => w.name === name);
      if (exists) return prev.filter((w) => w.name !== name);
      return [...prev, { name, price }];
    });
  };

  const totalMin = selectedWorks.reduce((s, w) => s + w.price[0], 0);
  const totalMax = selectedWorks.reduce((s, w) => s + w.price[1], 0);

  // Request form state
  const [reqName, setReqName] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [reqError, setReqError] = useState("");
  const submitUrlRef = useRef<string | null>(null);

  useEffect(() => {
    fetch("/func2url.json").then(r => r.json()).then(d => {
      submitUrlRef.current = d["submit-request"] || null;
    }).catch(() => {});
  }, []);

  const handleSubmitRequest = async () => {
    if (!reqName.trim() || !reqPhone.trim()) {
      setReqError("Пожалуйста, заполните имя и телефон");
      return;
    }
    setReqError("");
    setReqSubmitting(true);
    try {
      const url = submitUrlRef.current;
      if (!url) throw new Error("no url");
      const worksText = selectedWorks.map(w => w.name).join(", ");
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reqName.trim(),
          phone: reqPhone.trim(),
          car_brand: calcBrand,
          car_model: calcModel,
          selected_works: worksText,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setReqSuccess(true);
        setReqName("");
        setReqPhone("");
      } else {
        setReqError(data.error || "Ошибка отправки");
      }
    } catch {
      setReqError("Не удалось отправить заявку. Позвоните нам напрямую.");
    } finally {
      setReqSubmitting(false);
    }
  };

  const acceptCookie = () => {
    localStorage.setItem("cookie_accepted", "1");
    setCookieAccepted(true);
  };

  return (
    <div className="min-h-screen bg-white font-golos text-zinc-900">
      {/* COOKIE BANNER */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 text-white px-6 py-4 shadow-2xl">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Icon
                name="Cookie"
                size={18}
                className="text-zinc-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-zinc-300 leading-relaxed">
                Мы используем файлы cookie для улучшения работы сайта и анализа
                посещаемости. Продолжая использовать сайт, вы соглашаетесь с
                нашей{" "}
                <span className="underline cursor-pointer text-zinc-200">
                  политикой конфиденциальности
                </span>
                .
              </p>
            </div>
            <button
              onClick={acceptCookie}
              className="flex-shrink-0 bg-white text-zinc-900 px-5 py-2 text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              Принять
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
              <Icon name="Wrench" size={15} className="text-white" />
            </div>
            <span className="font-bold text-base tracking-tight uppercase">
              АвтоСервис
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "text-zinc-900 bg-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+79104441149"
              className="hidden md:flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              <Icon name="Phone" size={13} />
              +7 (910) 444-11-49
            </a>
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full text-left px-6 py-3 text-sm font-medium border-b border-zinc-50 ${
                  activeSection === item.id
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500"
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
                  <div
                    key={i}
                    className="absolute border border-white"
                    style={{
                      width: `${60 + i * 50}px`,
                      height: `${60 + i * 50}px`,
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${i * 10}deg)`,
                    }}
                  />
                ))}
              </div>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 py-20 sm:py-28">
                <div className="max-w-3xl">
                  <p className="text-zinc-500 text-xs tracking-[0.35em] uppercase mb-8">
                    Профессиональный автосервис
                  </p>
                  <h1 className="text-white text-4xl sm:text-5xl md:text-[72px] font-bold leading-[1.04] mb-8">
                    Ваш автомобиль
                    <br />
                    <span className="text-zinc-500">в надёжных</span>
                    <br />
                    руках
                  </h1>
                  <p className="text-zinc-400 text-lg max-w-xl mb-12 leading-relaxed">
                    Ремонт, обслуживание и шиномонтаж любых марок. гарантия на
                    все работы. Работаем Пн–Вс 9:00–18:00.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">
                      {ALL_BRANDS.length}+ марок
                    </span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">
                      80+ видов работ
                    </span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">
                      Шиномонтаж R13–R22
                    </span>
                    <span className="text-zinc-600 text-sm border border-zinc-700 px-3 py-1">
                      Гарантия 12 мес.
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("calc")}
                      className="bg-white text-zinc-900 px-8 py-4 font-semibold text-base hover:bg-zinc-100 transition-colors"
                    >
                      Рассчитать стоимость
                    </button>
                    <button
                      onClick={() => navigate("tires")}
                      className="border border-zinc-600 text-white px-8 py-4 font-medium text-base hover:border-zinc-300 transition-colors"
                    >
                      Цены на шиномонтаж
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-zinc-100">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {ABOUT_STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="py-8 sm:py-12 px-4 sm:px-6 border-r border-zinc-100 last:border-r-0 text-center"
                    >
                      <div className="text-4xl font-bold mb-2">
                        {stat.value}
                      </div>
                      <div className="text-zinc-500 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-10 sm:mb-14">
                <div>
                  <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">
                    Что мы делаем
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold">Услуги</h2>
                </div>
                <button
                  onClick={() => navigate("tires")}
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Шиномонтаж <Icon name="ArrowRight" size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-zinc-100">
                {[
                  {
                    icon: "Cog",
                    title: "Двигатель",
                    desc: "Диагностика, ремонт и обслуживание двигателей всех типов",
                  },
                  {
                    icon: "Settings2",
                    title: "КПП",
                    desc: "Ремонт механических, автоматических и вариаторных коробок",
                  },
                  {
                    icon: "CircleDot",
                    title: "Тормоза",
                    desc: "Замена колодок, дисков, прокачка тормозной системы",
                  },
                  {
                    icon: "Gauge",
                    title: "Подвеска",
                    desc: "Диагностика и замена ходовой, развал-схождение",
                  },
                  {
                    icon: "Zap",
                    title: "Электрика",
                    desc: "Диагностика и ремонт электрооборудования",
                  },
                  {
                    icon: "CircleOff",
                    title: "Шиномонтаж",
                    desc: "Монтаж, демонтаж, балансировка R13–R22, ремонт проколов",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 hover:bg-zinc-50 transition-colors group cursor-default"
                  >
                    <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center mb-6 group-hover:border-zinc-900 group-hover:bg-zinc-900 transition-all duration-300">
                      <Icon
                        name={item.icon}
                        size={17}
                        className="text-zinc-400 group-hover:text-white transition-colors"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-zinc-900 py-16 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-white text-2xl sm:text-4xl font-bold mb-5">
                  Нужна помощь с автомобилем?
                </h2>
                <p className="text-zinc-400 mb-10 max-w-lg mx-auto">
                  Позвоните нам — мастер проконсультирует бесплатно и ответит на
                  любые вопросы
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+79104441149"
                    className="inline-flex items-center gap-3 bg-white text-zinc-900 px-8 py-4 font-semibold hover:bg-zinc-100 transition-colors"
                  >
                    <Icon name="Phone" size={18} />
                    +7 (910) 444-11-49
                  </a>
                  <a
                    href="tel:+79854912526"
                    className="inline-flex items-center gap-3 border border-zinc-600 text-white px-8 py-4 font-semibold hover:border-zinc-300 transition-colors"
                  >
                    <Icon name="Phone" size={18} />
                    +7 (985) 491-25-26
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======= ABOUT ======= */}
        {activeSection === "about" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="mb-10 sm:mb-16">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">
                О нас
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">О сервисе</h1>
              <div className="w-16 h-px bg-zinc-900" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 mb-16 sm:mb-24">
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Профессиональный подход к каждому автомобилю
                </h2>
                <p className="text-zinc-500 leading-relaxed mb-5">
                  Работаем с 2007 года и накопили огромный опыт в обслуживании и
                  ремонте автомобилей всех марок. Сервис оснащён современным
                  диагностическим оборудованием.
                </p>
                <p className="text-zinc-500 leading-relaxed mb-5">
                  Каждый мастер имеет профильное образование и регулярно
                  проходит обучение у официальных дилеров. Гарантируем качество
                  на все виды работ.
                </p>
                <p className="text-zinc-500 leading-relaxed">
                  Используем оригинальные запчасти или сертифицированные
                  аналоги. Прозрачное ценообразование — вы знаете, за что
                  платите.
                </p>
              </div>
              <div className="space-y-px bg-zinc-100">
                {[
                  {
                    icon: "Shield",
                    title: "Гарантия на работы",
                    desc: "12 месяцев на все виды ремонта",
                  },
                  {
                    icon: "Clock",
                    title: "Точные сроки",
                    desc: "Выдерживаем обещанные сроки, предупреждаем заранее",
                  },
                  {
                    icon: "BadgeCheck",
                    title: "Честные цены",
                    desc: "Смета согласовывается до начала — никаких сюрпризов",
                  },
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="mb-8 sm:mb-10">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">
                Услуги и цены
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                Шиномонтаж
              </h1>
              <p className="text-zinc-500 text-sm">
                Работаем с легковыми автомобилями, кроссоверами и
                внедорожниками. Шины R13–R22.
              </p>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: "Clock", text: "Без записи, пн–вс 9:00–18:00" },
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

            {/* Desktop table */}
            <div className="hidden lg:block space-y-0 border border-zinc-200 overflow-hidden">
              {/* Header row */}
              <div className="grid bg-zinc-900 text-white text-xs uppercase tracking-wider" style={{ gridTemplateColumns: "2fr repeat(9, 1fr)" }}>
                <div className="px-4 py-3">Вид работ</div>
                {TIRE_COLS.map(c => <div key={c} className="px-2 py-3 text-center">{c}</div>)}
              </div>
              {TIRE_DATA.map((section, si) => (
                <div key={si}>
                  <div className="bg-zinc-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 border-t border-zinc-200">
                    {section.title}
                  </div>
                  {section.items.map((item, ii) => (
                    <div key={ii} className="grid border-t border-zinc-100 hover:bg-zinc-50 transition-colors" style={{ gridTemplateColumns: "2fr repeat(9, 1fr)" }}>
                      <div className="px-4 py-3 text-sm font-medium text-zinc-800">{item.name}</div>
                      {item.note
                        ? <div className="col-span-9 px-4 py-3 text-sm text-center font-medium text-emerald-700">{item.note}</div>
                        : item.prices.map((p, pi) => (
                          <div key={pi} className="px-2 py-3 text-sm text-center font-medium text-zinc-900">{p ? `${p} ₽` : "—"}</div>
                        ))
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Tablet table (sm–lg): горизонтальный скролл */}
            <div className="hidden sm:block lg:hidden overflow-x-auto border border-zinc-200">
              <div style={{ minWidth: "700px" }}>
                <div className="grid bg-zinc-900 text-white text-xs uppercase tracking-wider" style={{ gridTemplateColumns: "2fr repeat(9, 1fr)" }}>
                  <div className="px-4 py-3">Вид работ</div>
                  {TIRE_COLS.map(c => <div key={c} className="px-2 py-3 text-center">{c}</div>)}
                </div>
                {TIRE_DATA.map((section, si) => (
                  <div key={si}>
                    <div className="bg-zinc-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 border-t border-zinc-200">{section.title}</div>
                    {section.items.map((item, ii) => (
                      <div key={ii} className="grid border-t border-zinc-100" style={{ gridTemplateColumns: "2fr repeat(9, 1fr)" }}>
                        <div className="px-4 py-3 text-sm font-medium text-zinc-800">{item.name}</div>
                        {item.note
                          ? <div className="col-span-9 px-4 py-3 text-sm text-center font-medium text-emerald-700">{item.note}</div>
                          : item.prices.map((p, pi) => (
                            <div key={pi} className="px-2 py-3 text-sm text-center font-medium text-zinc-900">{p ? `${p} ₽` : "—"}</div>
                          ))
                        }
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-4">
              {TIRE_DATA.map((section, si) => (
                <div key={si}>
                  <div className="bg-zinc-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider">{section.title}</div>
                  <div className="space-y-px border border-t-0 border-zinc-200">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="bg-white p-4 border-t border-zinc-100">
                        <p className="text-sm font-semibold mb-3 text-zinc-900">{item.name}</p>
                        {item.note
                          ? <div className="text-sm font-medium text-emerald-700">{item.note}</div>
                          : (
                            <div className="grid grid-cols-3 gap-1.5">
                              {TIRE_COLS.map((col, ci) => (
                                item.prices[ci] && (
                                  <div key={ci} className="bg-zinc-50 rounded px-2 py-2 text-center">
                                    <div className="text-[9px] text-zinc-400 uppercase tracking-wide mb-0.5">{col}</div>
                                    <div className="text-xs font-semibold text-zinc-900">{item.prices[ci]} ₽</div>
                                  </div>
                                )
                              ))}
                            </div>
                          )
                        }
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-zinc-400 text-xs">* Низкопрофильная резина (профиль 40 и ниже) — +25%</p>
              <p className="text-zinc-400 text-xs">* Run Flat — +50%</p>
              <p className="text-zinc-400 text-xs">* Джипы — цена договорная</p>
            </div>

            {/* Bottom promo */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-100">
              {[
                {
                  icon: "Percent",
                  title: "Скидка 10%",
                  desc: "При сезонной смене резины комплектом (4 колеса)",
                },
                {
                  icon: "Package",
                  title: "Хранение шин",
                  desc: "Удобное хранение на нашем складе — не надо везти домой",
                },
                {
                  icon: "Timer",
                  title: "Быстро",
                  desc: "Сезонная смена 4 колёс без записи за 20–40 минут",
                },
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="mb-8 sm:mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">
                Стоимость ремонта
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                Калькулятор
              </h1>
              <p className="text-zinc-500 text-sm">
                Выберите марку, модель и конкретный вид работы — получите цену
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Left: form */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                    Марка автомобиля
                    <span className="ml-2 normal-case tracking-normal font-normal text-zinc-400">
                      {ALL_BRANDS.length} доступно
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Начните вводить марку..."
                    value={calcBrandSearch}
                    onChange={(e) => setCalcBrandSearch(e.target.value)}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors mb-1"
                  />
                  <select
                    value={calcBrand}
                    onChange={(e) => {
                      setCalcBrand(e.target.value);
                      setCalcModel("");
                      setSelectedWorks([]);
                    }}
                    size={4}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-2 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  >
                    <option value="">— Выберите марку —</option>
                    {filteredCalcBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-zinc-500">
                    Модель
                  </label>
                  <select
                    value={calcModel}
                    onChange={(e) => {
                      setCalcModel(e.target.value);
                      setSelectedWorks([]);
                    }}
                    disabled={!calcBrand}
                    className="w-full border-2 border-zinc-200 bg-white px-4 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors disabled:opacity-40"
                  >
                    <option value="">Выберите модель</option>
                    {calcModels.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {calcBrand && calcModel && (
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-3 text-zinc-500">
                      Виды работ
                      <span className="ml-2 normal-case tracking-normal font-normal text-zinc-400">
                        {getNodesForBrandModel(calcBrand, calcModel).length}{" "}
                        позиций · можно выбрать несколько
                      </span>
                    </label>

                    {/* Work search */}
                    <div className="relative mb-3">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon
                          name="Search"
                          size={14}
                          className="text-zinc-400"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Поиск по виду работы..."
                        value={workSearch}
                        onChange={(e) => {
                          setWorkSearch(e.target.value);
                          setCalcActiveCategory(NODES_CATEGORIES[0]);
                        }}
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

                    {/* Category tabs */}
                    {!workSearch && (
                      <div className="flex gap-px bg-zinc-100 mb-3 overflow-x-auto">
                        {NODES_CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCalcActiveCategory(cat)}
                            className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                              calcActiveCategory === cat
                                ? "bg-zinc-900 text-white"
                                : "bg-white text-zinc-500 hover:text-zinc-900"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}

                    {workSearch && (
                      <p className="text-xs text-zinc-400 mb-2 px-1">
                        Найдено: {currentCatNodes.length}
                      </p>
                    )}

                    <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                      {currentCatNodes.length > 0 ? (
                        currentCatNodes.map((node) => {
                          const isSelected = selectedWorks.some(
                            (w) => w.name === node.name,
                          );
                          return (
                            <button
                              key={node.name}
                              onClick={() => toggleWork(node.name, node.price)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 border text-sm transition-all text-left ${
                                isSelected
                                  ? "border-zinc-900 bg-zinc-900 text-white"
                                  : "border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 flex-shrink-0 border flex items-center justify-center ${
                                  isSelected
                                    ? "bg-white border-white"
                                    : "border-zinc-400"
                                }`}
                              >
                                {isSelected && (
                                  <Icon
                                    name="Check"
                                    size={10}
                                    className="text-zinc-900"
                                  />
                                )}
                              </div>
                              <span className="flex-1 min-w-0 pr-2">
                                {workSearch
                                  ? (() => {
                                      const idx = node.name
                                        .toLowerCase()
                                        .indexOf(workSearch.toLowerCase());
                                      if (idx === -1) return node.name;
                                      return (
                                        <>
                                          {node.name.slice(0, idx)}
                                          <mark className="bg-yellow-100 text-zinc-900 rounded-sm px-0.5">
                                            {node.name.slice(
                                              idx,
                                              idx + workSearch.length,
                                            )}
                                          </mark>
                                          {node.name.slice(
                                            idx + workSearch.length,
                                          )}
                                        </>
                                      );
                                    })()
                                  : node.name}
                              </span>
                              <span className="text-xs flex-shrink-0 opacity-70">
                                {node.price[0].toLocaleString("ru")}–
                                {node.price[1].toLocaleString("ru")} ₽
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="py-8 text-center text-zinc-400 text-sm border-2 border-dashed border-zinc-200">
                          <Icon
                            name="SearchX"
                            size={22}
                            className="mx-auto mb-2 text-zinc-300"
                          />
                          Ничего не найдено по запросу «{workSearch}»
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: result */}
              <div className="flex flex-col">
                {selectedWorks.length > 0 ? (
                  <div className="md:sticky md:top-24">
                    {/* Selected works list */}
                    <div className="border-2 border-zinc-900 p-6 mb-4">
                      <p className="text-xs uppercase tracking-wider text-zinc-400 mb-4">
                        Выбранные работы
                      </p>
                      <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-1">
                        {selectedWorks.map((w) => (
                          <div
                            key={w.name}
                            className="flex items-start justify-between gap-2 text-sm"
                          >
                            <button
                              onClick={() => toggleWork(w.name, w.price)}
                              className="text-zinc-400 hover:text-zinc-900 flex-shrink-0 mt-0.5"
                            >
                              <Icon name="X" size={12} />
                            </button>
                            <span className="flex-1 text-zinc-700 leading-tight">
                              {w.name}
                            </span>
                            <span className="text-zinc-500 text-xs flex-shrink-0 whitespace-nowrap">
                              {w.price[0].toLocaleString("ru")}–
                              {w.price[1].toLocaleString("ru")} ₽
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-zinc-200 pt-4">
                        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Итоговая стоимость
                        </p>
                        <div>
                          <span className="text-3xl font-bold">
                            {totalMin.toLocaleString("ru")}
                          </span>
                          <span className="text-xl font-bold text-zinc-400">
                            {" "}
                            — {totalMax.toLocaleString("ru")} ₽
                          </span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-2">
                          {calcBrand} {calcModel} · {selectedWorks.length}{" "}
                          {selectedWorks.length === 1
                            ? "работа"
                            : selectedWorks.length < 5
                              ? "работы"
                              : "работ"}
                        </p>
                      </div>
                    </div>
                    {/* Request form */}
                    {reqSuccess ? (
                      <div className="border-2 border-emerald-500 bg-emerald-50 p-6 text-center">
                        <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center mx-auto mb-3">
                          <Icon name="Check" size={22} className="text-white" />
                        </div>
                        <p className="font-semibold text-zinc-900 mb-1">Заявка отправлена!</p>
                        <p className="text-zinc-500 text-sm">Мы свяжемся с вами в ближайшее время</p>
                        <button
                          onClick={() => { setReqSuccess(false); setSelectedWorks([]); }}
                          className="mt-4 text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                          Новый расчёт
                        </button>
                      </div>
                    ) : (
                      <div className="border border-zinc-200 p-5 space-y-3">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-1">Оставить заявку</p>
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          value={reqName}
                          onChange={e => setReqName(e.target.value)}
                          className="w-full border-2 border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                        />
                        <input
                          type="tel"
                          placeholder="Номер телефона"
                          value={reqPhone}
                          onChange={e => setReqPhone(e.target.value)}
                          className="w-full border-2 border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                        />
                        {reqError && (
                          <p className="text-red-500 text-xs">{reqError}</p>
                        )}
                        <button
                          onClick={handleSubmitRequest}
                          disabled={reqSubmitting}
                          className="w-full bg-zinc-900 text-white py-3 font-semibold text-sm hover:bg-zinc-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {reqSubmitting ? (
                            <><Icon name="Loader" size={15} className="animate-spin" /> Отправка...</>
                          ) : (
                            <><Icon name="Send" size={15} /> Отправить заявку</>
                          )}
                        </button>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-px bg-zinc-200" />
                          <span className="text-xs text-zinc-400">или</span>
                          <div className="flex-1 h-px bg-zinc-200" />
                        </div>
                        <a
                          href="tel:+79104441149"
                          className="w-full border border-zinc-300 py-2.5 font-medium text-sm hover:border-zinc-900 transition-all flex items-center justify-center gap-2 text-zinc-600"
                        >
                          <Icon name="Phone" size={14} />
                          +7 (910) 444-11-49
                        </a>
                      </div>
                    )}
                    <div className="bg-zinc-50 p-4 mt-3 space-y-2">
                      {[
                        "Стоимость указана за работу",
                        "Запчасти — отдельно при осмотре",
                        "Гарантия 12 месяцев на все работы",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                          <div className="w-1.5 h-1.5 bg-zinc-900 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    {!reqSuccess && (
                      <button
                        onClick={() => setSelectedWorks([])}
                        className="w-full mt-3 text-xs text-zinc-400 hover:text-zinc-900 transition-colors py-1"
                      >
                        Очистить список
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="md:sticky md:top-24">
                    <div className="border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center py-16 text-center mb-6">
                      <div className="w-16 h-16 border-2 border-zinc-200 flex items-center justify-center mb-5">
                        <Icon
                          name="Calculator"
                          size={26}
                          className="text-zinc-300"
                        />
                      </div>
                      <p className="text-zinc-400 font-medium mb-1">
                        Выберите работы слева
                      </p>
                      <p className="text-zinc-300 text-sm">
                        Можно выбрать несколько — сумма посчитается
                        автоматически
                      </p>
                    </div>
                    {calcBrand && !calcModel && (
                      <div className="p-4 bg-zinc-50 border border-zinc-100 text-sm text-zinc-500">
                        <p className="font-medium text-zinc-700 mb-1">
                          {calcBrand}
                        </p>
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="mb-8 sm:mb-12">
              <p className="text-zinc-400 text-xs tracking-[0.25em] uppercase mb-3">
                Свяжитесь с нами
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Контакты</h1>
              <div className="w-16 h-px bg-zinc-900" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <div className="space-y-px mb-8">
                  {CONTACTS.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-5 p-6 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={15} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">
                          {c.label}
                        </p>
                        {c.icon === "Phone" ? (
                          <a
                            href={`tel:+${c.value.replace(/\D/g, "")}`}
                            className="font-medium hover:text-zinc-600 transition-colors"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="font-medium">{c.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 text-white p-6">
                  <h3 className="font-semibold mb-2">
                    Бесплатная консультация
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Позвоните нам — мастер ответит на вопросы и поможет
                    разобраться с проблемой
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="tel:+79104441149"
                      className="inline-flex items-center gap-2 font-semibold hover:text-zinc-300 transition-colors"
                    >
                      <Icon name="Phone" size={15} />
                      +7 (910) 444-11-49
                    </a>
                    <a
                      href="tel:+79854912526"
                      className="inline-flex items-center gap-2 font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <Icon name="Phone" size={15} />
                      +7 (985) 491-25-26
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Как нас найти</h2>
                <p className="text-zinc-500 text-sm mb-4">
                  территория Микрорайон, 9А, деревня Гряды, Волоколамский
                  муниципальный округ, Московская область. Бесплатная парковка
                  на территории.
                </p>
                {/* Яндекс карта */}
                <div
                  className="w-full overflow-hidden mb-6 border border-zinc-200"
                  style={{ height: "300px" }}
                >
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3ACPwueXIC&amp;source=constructor"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    title="Карта проезда"
                    allowFullScreen
                    style={{ display: "block" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "Car", text: "Бесплатная парковка" },
                    { icon: "Coffee", text: "Зона ожидания" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 bg-zinc-50 text-sm text-zinc-600"
                    >
                      <Icon
                        name={item.icon}
                        size={14}
                        className="text-zinc-400 flex-shrink-0"
                      />
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
      <footer className="border-t border-zinc-100 py-8 sm:py-10 mt-12 sm:mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 flex items-center justify-center">
              <Icon name="Wrench" size={11} className="text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-tight">
              АвтоСервис
            </span>
          </div>
          <p className="text-zinc-400 text-sm text-center">
            © 2007 – 2026. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="text-zinc-400 text-sm hover:text-zinc-900 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}