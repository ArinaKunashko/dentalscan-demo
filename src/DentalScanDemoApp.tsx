import { useMemo, useState } from "react";

export default function DentalScanDemoApp() {
    const [currentScreen, setCurrentScreen] = useState("dashboard");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [analysisStarted, setAnalysisStarted] = useState(false);

    const findings = [
        {
            title: "Периапикальное воспаление",
            tooth: "Зуб 36",
            confidence: "Высокая вероятность",
            details: "Обнаружен участок разрежения костной ткани в апикальной области.",
        },
        {
            title: "Снижение плотности костной ткани",
            tooth: "Нижняя челюсть слева",
            confidence: "Средняя вероятность",
            details: "Требуется дополнительная оценка по клиническому контексту.",
        },
        {
            title: "Ретинированный зуб",
            tooth: "Зуб 48",
            confidence: "Высокая вероятность",
            details: "Определяется ретинированный третий моляр с риском давления на соседние структуры.",
        },
    ];

    const metrics = [
        { label: "Исследований сегодня", value: "12" },
        { label: "Время анализа", value: "~ 2 мин" },
        { label: "Подозрительные зоны", value: "3" },
    ];

    const timeline = [
        "Загрузка КТ / DICOM",
        "AI-предобработка снимка",
        "Выделение подозрительных участков",
        "Формирование клинического отчёта",
    ];

    const studies = [
        {
            id: "CT-23421",
            patient: "Пациент ID 23421",
            date: "06.03.2026",
            status: "Анализ завершён",
            type: "CBCT",
        },
        {
            id: "CT-23418",
            patient: "Пациент ID 23418",
            date: "06.03.2026",
            status: "Ожидает анализа",
            type: "DICOM",
        },
        {
            id: "CT-23397",
            patient: "Пациент ID 23397",
            date: "05.03.2026",
            status: "Требует верификации",
            type: "CBCT",
        },
    ];

    const topActions = useMemo(
        () => [
            {
                label: "Dashboard",
                key: "dashboard",
                description: "Список кейсов и статусы анализа",
            },
            {
                label: "Upload",
                key: "upload",
                description: "Загрузка нового исследования",
            },
            {
                label: "Viewer & Report",
                key: "viewer",
                description: "Просмотр снимка и AI-находок",
            },
        ],
        []
    );

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setUploadedFile(file.name);
        setAnalysisStarted(false);
    };

    const startAnalysis = () => {
        setAnalysisStarted(true);
        setCurrentScreen("viewer");
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            "Анализ завершён": "bg-emerald-50 text-emerald-700 border-emerald-200",
            "Ожидает анализа": "bg-amber-50 text-amber-700 border-amber-200",
            "Требует верификации": "bg-sky-50 text-sky-700 border-sky-200",
        };

        return (
            <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[status] || "bg-slate-50 text-slate-700 border-slate-200"}`}
            >
        {status}
      </span>
        );
    };

    const DashboardScreen = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-2xl bg-white shadow-sm border border-slate-200 px-5 py-4"
                    >
                        <div className="text-sm text-slate-500">{item.label}</div>
                        <div className="mt-2 text-2xl font-semibold">{item.value}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 border-b border-slate-200">
                    <div>
                        <h2 className="text-lg font-semibold">Список исследований</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Демонстрационный dashboard для врача или клиники.
                        </p>
                    </div>
                    <button
                        onClick={() => setCurrentScreen("upload")}
                        className="rounded-2xl bg-slate-900 text-slate-900 px-4 py-2 font-medium hover:opacity-90 transition"
                    >
                        Загрузить новое исследование
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="text-left px-5 py-3 font-medium">ID</th>
                            <th className="text-left px-5 py-3 font-medium">Пациент</th>
                            <th className="text-left px-5 py-3 font-medium">Тип</th>
                            <th className="text-left px-5 py-3 font-medium">Дата</th>
                            <th className="text-left px-5 py-3 font-medium">Статус</th>
                            <th className="text-left px-5 py-3 font-medium">Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studies.map((study) => (
                            <tr key={study.id} className="border-t border-slate-100">
                                <td className="px-5 py-4 font-medium">{study.id}</td>
                                <td className="px-5 py-4">{study.patient}</td>
                                <td className="px-5 py-4">{study.type}</td>
                                <td className="px-5 py-4">{study.date}</td>
                                <td className="px-5 py-4">
                                    <StatusBadge status={study.status} />
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => setCurrentScreen("viewer")}
                                        className="rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition"
                                    >
                                        Открыть кейс
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const UploadScreen = () => (
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
            <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold">Загрузка исследования</h2>
                <p className="mt-2 text-slate-500">
                    Экран MVP для загрузки КТ или DICOM-файла и запуска предварительного анализа.
                </p>

                <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div className="text-lg font-medium">Перетащите файл или выберите вручную</div>
                    <p className="mt-2 text-sm text-slate-500">
                        Поддерживаемые форматы: DICOM, CBCT, ZIP-архив исследования.
                    </p>

                    <label className="inline-flex mt-5 cursor-pointer rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:opacity-90 transition">
                        Выбрать файл
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>

                    {uploadedFile && (
                        <div className="mt-4 rounded-2xl bg-white border border-slate-200 px-4 py-3 inline-block text-sm">
                            Загружен файл: <span className="font-medium">{uploadedFile}</span>
                        </div>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                        <div className="font-medium">Шаг 1. Валидация данных</div>
                        <div className="mt-2 text-sm text-slate-600">
                            Проверка формата файла, completeness исследования и базовых метаданных.
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                        <div className="font-medium">Шаг 2. Запуск AI-анализа</div>
                        <div className="mt-2 text-sm text-slate-600">
                            После загрузки система подготавливает данные для поиска подозрительных зон.
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={startAnalysis}
                        className="rounded-2xl bg-slate-900 text-slate-900 px-5 py-3 font-medium hover:opacity-90 transition"
                    >
                        Запустить анализ
                    </button>
                    <button
                        onClick={() => setCurrentScreen("dashboard")}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium hover:bg-slate-50 transition"
                    >
                        Назад в dashboard
                    </button>
                </div>
            </div>

        </div>
    );

    const ViewerScreen = () => (
        <section className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="lg:col-span-9 rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
                <h2 className="text-lg font-semibold">Поток пользователя</h2>
                <div className="flex justify-between">
                    <div className="mt-5 space-y-4">
                        {timeline.map((step, index) => (
                            <div key={step} className="flex gap-3 items-start">
                                <div
                                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="font-medium">{step}</div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        {index === 0 && "Врач загружает исследование или выбирает кейс из системы."}
                                        {index === 1 && "Система подготавливает данные и запускает алгоритм анализа."}
                                        {index === 2 && "AI выделяет потенциально значимые клинические находки."}
                                        {index === 3 && "Врач проверяет выводы и экспортирует результат."}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                        <div className="text-sm font-medium">MVP-экраны</div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li>• Dashboard / список исследований</li>
                            <li>• Upload / загрузка КТ</li>
                            <li>• Viewer / анализ снимка</li>
                            <li>• Findings panel / находки</li>
                            <li>• Report / финальный отчёт</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div
                        className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                            <div>
                                <div className="text-lg font-semibold text-left">Просмотр исследования</div>
                                <div className="text-sm text-slate-500">Пациент ID 23421 · CBCT · 06.03.2026</div>
                            </div>
                            <div
                                className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm border border-emerald-200">
                                {analysisStarted ? "Анализ завершён" : "Демо-режим"}
                            </div>
                        </div>

                        <div className="p-5">
                            <div
                                className="aspect-[16/10] rounded-2xl bg-slate-900 relative overflow-hidden border border-slate-800">
                                <div
                                    className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_40%)]"/>
                                <div className="absolute inset-6 rounded-[28px] border border-slate-700"/>
                                <div
                                    className="absolute left-[18%] top-[28%] h-20 w-20 rounded-full border-2 border-amber-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.02)]"/>
                                <div
                                    className="absolute left-[54%] top-[45%] h-24 w-24 rounded-full border-2 border-red-300"/>
                                <div
                                    className="absolute left-[70%] top-[26%] h-16 w-16 rounded-full border-2 border-cyan-300"/>

                                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs text-white border border-white/20">
                    Slice 128 / 412
                  </span>
                                    <span className="rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs text-white border border-white/20">
                    Axial view
                  </span>
                                    <span className="rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs text-white border border-white/20">
                    AI overlay ON
                  </span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setCurrentScreen("upload")}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left hover:bg-slate-100 transition"
                                >
                                    Загрузить исследование
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left hover:bg-slate-100 transition">
                                    Запустить анализ
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left hover:bg-slate-100 transition">
                                    Показать overlay
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left hover:bg-slate-100 transition">
                                    Экспорт отчёта
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
                        <h2 className="text-lg font-semibold">Ключевые находки</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            AI-подсказки для врача. Финальное клиническое решение принимает специалист.
                        </p>

                        <div className="mt-5 space-y-3 text-left">
                            {findings.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-sm text-slate-500 mt-1">{item.tooth}</div>
                                        </div>
                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 border border-slate-200">
                      {item.confidence}
                    </span>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-600">{item.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
                        <h2 className="text-lg font-semibold">Черновик клинического отчёта</h2>
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4 text-sm">
                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Пациент</div>
                                <div className="font-medium">ID 23421 · исследование CBCT</div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Находки</div>
                                <ul className="mt-2 space-y-2 text-slate-700 flex flex-col items-start">
                                    <li>• Подозрение на периапикальное воспаление в области зуба 36.</li>
                                    <li>• Локальное снижение плотности костной ткани в нижней челюсти слева.</li>
                                    <li>• Ретинированный зуб 48, рекомендована дополнительная оценка положения.</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Рекомендация</div>
                                <div className="text-slate-700 flex flex-col items-start text-left">
                                    Провести клиническую верификацию находок, сопоставить с жалобами пациента и при необходимости назначить дополнительную диагностику.
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-3">
                                <button className="rounded-2xl bg-slate-900 text-slate-900 px-4 py-2 font-medium hover:opacity-90 transition">
                                    Подтвердить отчёт
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-medium hover:bg-slate-100 transition">
                                    Скачать PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
            <div className="max-w-full mx-auto space-y-8">
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div
                            className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm shadow-sm border border-slate-200">
                            DentalScan · AI SaaS для анализа КТ в стоматологии
                        </div>
                        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                            Демонстрационный интерфейс продукта
                        </h1>
                        <p className="mt-3 max-w-full text-slate-600 text-base md:text-lg">
                            Концепт продукта для стоматологов: dashboard исследований, загрузка КТ,
                            автоматическое выявление подозрительных зон, быстрая проверка находок и формирование
                            клинического отчёта.
                        </p>
                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mt-3">
                            <h2 className="text-lg font-semibold">Структура интерфейса MVP</h2>
                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                    <div className="font-medium">1. Dashboard</div>
                                    <div className="mt-2 text-slate-600">
                                        Список исследований, фильтры по пациенту, статус анализа, быстрый доступ к
                                        отчётам.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                    <div className="font-medium">2. Upload</div>
                                    <div className="mt-2 text-slate-600">
                                        Загрузка DICOM / КТ, проверка формата, старт анализа, базовая валидация данных.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                    <div className="font-medium">3. Viewer</div>
                                    <div className="mt-2 text-slate-600">
                                        Просмотр снимка, slice navigation, AI-overlay, акцент на подозрительные зоны.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                    <div className="font-medium">4. Report</div>
                                    <div className="mt-2 text-slate-600">
                                        Краткий отчёт по находкам, рекомендации, экспорт PDF, подтверждение врачом.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-3 rounded-3xl bg-white border border-slate-200 shadow-sm p-5 h-fit">
                        <h2 className="text-lg font-semibold">Навигация MVP</h2>
                        <div className="mt-5 space-y-3">
                            {topActions.map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setCurrentScreen(item.key)}
                                    className={`w-full text-left rounded-2xl border px-4 py-4 transition ${
                                        currentScreen === item.key
                                            ? "bg-slate-900 text-slate-900 border-slate-900"
                                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                                    }`}
                                >
                                    <div className="font-medium">{item.label}</div>
                                    <div
                                        className={`mt-1 text-sm ${
                                            currentScreen === item.key ? "text-slate-900" : "text-slate-500"
                                        }`}
                                    >
                                        {item.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className="lg:col-span-9">
                        {currentScreen === "dashboard" && <DashboardScreen/>}
                        {currentScreen === "upload" && <UploadScreen/>}
                        {currentScreen === "viewer" && <ViewerScreen/>}
                    </main>
                </section>
            </div>
        </div>
    );
}
