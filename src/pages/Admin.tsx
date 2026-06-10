import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Request {
  id: number;
  name: string;
  phone: string;
  car_brand: string;
  car_model: string;
  selected_works: string;
  status: string;
  created_at: string;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "");

  const [requests, setRequests] = useState<Request[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/func2url.json").then(r => r.json()).then(setUrls).catch(() => {});
  }, []);

  useEffect(() => {
    if (token && urls["get-requests"]) {
      loadRequests();
    }
  }, [token, urls]);

  const loadRequests = async () => {
    setLoadingData(true);
    setDataError("");
    try {
      const res = await fetch(urls["get-requests"], {
        headers: { "X-Admin-Token": token },
      });
      const data = await res.json();
      if (res.status === 401) {
        setToken("");
        sessionStorage.removeItem("admin_token");
        setDataError("Сессия истекла, войдите снова");
        return;
      }
      setRequests(data.requests || []);
    } catch {
      setDataError("Ошибка загрузки данных");
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(urls["admin-login"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();
      if (data.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem("admin_token", data.token);
      } else {
        setLoginError(data.error || "Неверный логин или пароль");
      }
    } catch {
      setLoginError("Ошибка соединения");
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    sessionStorage.removeItem("admin_token");
    setRequests([]);
  };

  const filtered = requests.filter(r => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(s) ||
      r.phone?.toLowerCase().includes(s) ||
      r.car_brand?.toLowerCase().includes(s) ||
      r.car_model?.toLowerCase().includes(s)
    );
  });

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-white flex items-center justify-center">
              <Icon name="Wrench" size={16} className="text-zinc-900" />
            </div>
            <div>
              <p className="font-bold text-white text-sm uppercase tracking-tight">АвтоСервис</p>
              <p className="text-zinc-500 text-xs">Панель администратора</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Логин</label>
              <input
                type="text"
                value={loginUsername}
                onChange={e => setLoginUsername(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Пароль</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <Icon name="AlertCircle" size={14} />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading || !urls["admin-login"]}
              className="w-full bg-white text-zinc-900 py-3 font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <><Icon name="Loader" size={15} className="animate-spin" /> Вход...</>
              ) : (
                "Войти"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-zinc-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Icon name="Wrench" size={14} className="text-zinc-900" />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-tight">АвтоСервис</p>
              <p className="text-zinc-400 text-xs">Панель администратора</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadRequests}
              disabled={loadingData}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <Icon name="RefreshCw" size={14} className={loadingData ? "animate-spin" : ""} />
              Обновить
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <Icon name="LogOut" size={14} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Всего заявок", value: requests.length, icon: "FileText" },
            { label: "Новых", value: requests.filter(r => r.status === "new").length, icon: "Bell" },
            { label: "Результаты поиска", value: filtered.length, icon: "Search" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-zinc-200 p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-zinc-400 uppercase tracking-wider">{s.label}</p>
                <Icon name={s.icon} size={15} className="text-zinc-300" />
              </div>
              <p className="text-3xl font-bold text-zinc-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Поиск по имени, телефону, марке..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-zinc-200 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {dataError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-4 flex items-center gap-2">
            <Icon name="AlertCircle" size={14} />
            {dataError}
          </div>
        )}

        {loadingData ? (
          <div className="flex items-center justify-center py-20 text-zinc-400">
            <Icon name="Loader" size={24} className="animate-spin mr-3" />
            Загрузка...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Icon name="Inbox" size={36} className="mb-3 text-zinc-300" />
            <p className="text-sm">{search ? "Ничего не найдено" : "Заявок пока нет"}</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-900 text-white text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left w-10">#</th>
                    <th className="px-4 py-3 text-left">Имя</th>
                    <th className="px-4 py-3 text-left">Телефон</th>
                    <th className="px-4 py-3 text-left">Автомобиль</th>
                    <th className="px-4 py-3 text-left">Работы</th>
                    <th className="px-4 py-3 text-left">Дата</th>
                    <th className="px-4 py-3 text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} className={`border-t border-zinc-100 hover:bg-zinc-50 transition-colors ${i % 2 === 0 ? "" : "bg-zinc-50/50"}`}>
                      <td className="px-4 py-3 text-zinc-400 text-xs">{r.id}</td>
                      <td className="px-4 py-3 font-medium text-zinc-900">{r.name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.phone}`} className="text-zinc-700 hover:text-zinc-900 flex items-center gap-1.5">
                          <Icon name="Phone" size={12} className="text-zinc-400" />
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        {[r.car_brand, r.car_model].filter(Boolean).join(" ") || "—"}
                      </td>
                      <td className="px-4 py-3 text-zinc-500 max-w-xs">
                        <span className="line-clamp-2 text-xs">{r.selected_works || "—"}</span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{formatDate(r.created_at)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${r.status === "new" ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                          {r.status === "new" ? "Новая" : r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map(r => (
                <div key={r.id} className="bg-white border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{r.name}</p>
                      <a href={`tel:${r.phone}`} className="text-sm text-zinc-500 flex items-center gap-1 mt-0.5">
                        <Icon name="Phone" size={12} />
                        {r.phone}
                      </a>
                    </div>
                    <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 text-xs font-medium ${r.status === "new" ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>
                      {r.status === "new" ? "Новая" : r.status}
                    </span>
                  </div>
                  {(r.car_brand || r.car_model) && (
                    <p className="text-sm text-zinc-600 mb-1">
                      <span className="text-zinc-400 text-xs">Авто: </span>
                      {[r.car_brand, r.car_model].filter(Boolean).join(" ")}
                    </p>
                  )}
                  {r.selected_works && (
                    <p className="text-xs text-zinc-400 mb-2 line-clamp-2">{r.selected_works}</p>
                  )}
                  <p className="text-xs text-zinc-300">{formatDate(r.created_at)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
