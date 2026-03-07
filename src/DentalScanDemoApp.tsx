import { useMemo, useState } from "react";

export default function DentalScanDemoApp() {
    const [currentScreen, setCurrentScreen] = useState("landing");
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
            details:
                "Определяется ретинированный третий моляр с риском давления на соседние структуры.",
        },
    ];

    const metrics = [
        { label: "Сокращение времени анализа", value: "40–50%" },
        { label: "Целевой adoption врачей", value: "> 70%" },
        { label: "Совпадение с экспертным мнением", value: ">= 90%" },
    ];

    const dashboardMetrics = [
        { label: "Исследований сегодня", value: "12" },
        { label: "Среднее время анализа", value: "~ 2 мин" },
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

    const screens = useMemo(
        () => [
            {
                label: "Landing",
                key: "landing",
                description: "О продукте, ценности и сценариях",
            },
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

    const featureCards = [
        {
            title: "AI-assisted CT analysis",
            text: "Помогает врачу быстрее выделять зоны внимания и не заменяет клиническое решение.",
        },
        {
            title: "Dynamic comparison",
            text: "Сценарий сравнения текущего исследования с предыдущими снимками пациента.",
        },
        {
            title: "Report draft generation",
            text: "Формирует черновик заключения для последующей верификации врачом.",
        },
    ];

    const landingSections = {
        problem: [
            "Врач тратит 15–25 минут на анализ одного КТ.",
            "Сложно сравнивать снимки в динамике и отслеживать изменения.",
            "Высокая когнитивная нагрузка повышает риск пропуска значимых находок.",
        ],
        solution: [
            "AI помогает быстрее выделять подозрительные зоны на снимке.",
            "Система поддерживает сценарий сравнения текущего и предыдущих исследований.",
            "Формируется черновик отчёта для последующей клинической верификации врачом.",
        ],
        steps: [
            "Upload CT / DICOM",
            "AI preprocessing",
            "Findings and heatmap",
            "Report draft and doctor review",
        ],
        metrics: [
            { label: "Time reduction", value: "40–50%" },
            { label: "Expert agreement", value: ">= 90%" },
            { label: "Adoption target", value: "> 70%" },
        ],
    };

    const primaryButton =
        "rounded-2xl bg-slate-900 text-white px-5 py-3 font-medium transition hover:bg-slate-800";
    const secondaryButton =
        "rounded-2xl border border-slate-200 bg-white text-slate-900 px-5 py-3 font-medium transition hover:bg-slate-50";
    const darkHeroButton =
        "rounded-2xl border border-white/20 bg-white/10 text-white px-5 py-3 font-medium transition hover:bg-white/15";

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
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    styles[status] || "bg-slate-50 text-slate-700 border-slate-200"
                }`}
            >
        {status}
      </span>
        );
    };

    const ScreenNav = () => (
        <aside className="lg:col-span-3 rounded-[28px] bg-white/90 backdrop-blur border border-slate-200 shadow-sm p-5 h-fit sticky top-6">
            <div className="inline-flex rounded-full bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 text-xs font-medium">
                Product demo
            </div>
            <h2 className="mt-4 text-lg font-semibold">Navigation</h2>

            <div className="mt-5 space-y-3">
                {screens.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setCurrentScreen(item.key)}
                        className={`w-full text-left rounded-2xl border px-4 py-4 transition ${
                            currentScreen === item.key
                                ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100"
                        }`}
                    >
                        <div className="font-medium">{item.label}</div>
                        <div
                            className={`mt-1 text-sm leading-6 ${
                                currentScreen === item.key ? "text-slate-200" : "text-slate-500"
                            }`}
                        >
                            {item.description}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-medium">Demo scope</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• landing с ценностью продукта</li>
                    <li>• dashboard исследований</li>
                    <li>• upload flow</li>
                    <li>• viewer + findings + report</li>
                </ul>
            </div>
        </aside>
    );

    const LandingScreen = () => (
        <div className="space-y-8">
            <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8 md:p-10">
                    <div className="space-y-6">
                        <div className="inline-flex items-center rounded-full bg-white/15 border border-white/20 px-3 py-1 text-sm text-white backdrop-blur">
                            DentalScan · AI decision support for dental CT
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white">
                                AI-платформа для анализа КТ в стоматологии
                            </h1>
                            <p className="mt-4 max-w-2xl text-slate-300 text-base md:text-lg leading-7">
                                Концепт healthtech SaaS-продукта для клиник: помогает врачу быстрее
                                анализировать CBCT-исследования, сравнивать снимки в динамике и
                                формировать черновик клинического отчёта.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setCurrentScreen("dashboard")}
                                className="rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium transition hover:opacity-90"
                            >
                                Открыть product demo
                            </button>
                            <button
                                onClick={() => setCurrentScreen("viewer")}
                                className={darkHeroButton}
                            >
                                Смотреть AI viewer
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            {metrics.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                                >
                                    <div className="text-sm text-slate-300">{item.label}</div>
                                    <div className="mt-2 text-2xl font-semibold text-white">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur self-stretch">
                        <div className="rounded-[24px] bg-slate-950 border border-white/10 p-4 h-full">
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                                <div>
                                    <div className="text-lg font-semibold text-white">
                                        AI analysis preview
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        Patient ID 23421 · CBCT · Demo mode
                                    </div>
                                </div>
                                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                                    Clinical decision support
                                </div>
                            </div>

                            <div className="mt-5 aspect-[16/11] rounded-[22px] bg-slate-900 relative overflow-hidden border border-white/10">
                                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_40%)]" />
                                <div className="absolute inset-6 rounded-[28px] border border-slate-700" />
                                <div className="absolute left-[16%] top-[26%] h-20 w-20 rounded-full border-2 border-amber-300" />
                                <div className="absolute left-[52%] top-[44%] h-24 w-24 rounded-full border-2 border-red-300" />
                                <div className="absolute left-[70%] top-[24%] h-16 w-16 rounded-full border-2 border-cyan-300" />

                                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-800/85 px-3 py-1 text-xs text-slate-50 backdrop-blur">
                                    AI overlay ON
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div className="rounded-xl bg-slate-800/80 border border-white/10 px-3 py-2 text-xs text-slate-50">
                                        Slice 128 / 412
                                    </div>
                                    <div className="rounded-xl bg-slate-800/80 border border-white/10 px-3 py-2 text-xs text-slate-50">
                                        3 findings detected
                                    </div>
                                    <div className="rounded-xl bg-slate-800/80 border border-white/10 px-3 py-2 text-xs text-slate-50">
                                        Report draft ready
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="rounded-2xl bg-slate-900 border border-white/10 p-4">
                                    <div className="text-sm text-slate-400">Finding 1</div>
                                    <div className="mt-1 font-medium break-all text-xs text-slate-50">
                                        Периапикальное воспаление
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-slate-900 border border-white/10 p-4">
                                    <div className="text-sm text-slate-400">Finding 2</div>
                                    <div className="mt-1 font-medium break-all text-xs text-slate-50">
                                        Снижение плотности кости
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-slate-900 border border-white/10 p-4">
                                    <div className="text-sm text-slate-400">Finding 3</div>
                                    <div className="mt-1 font-medium break-all text-xs text-slate-50">
                                        Ретинированный зуб
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureCards.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6"
                    >
                        <div className="h-11 w-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 font-semibold">
                            +
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-slate-600 leading-7">{item.text}</p>
                    </div>
                ))}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 text-xs font-medium">
                        Problem
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Какие боли решает продукт
                    </h2>
                    <ul className="mt-5 space-y-3 text-slate-600 leading-7">
                        {landingSections.problem.map((item) => (
                            <li key={item}>• {item}</li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-medium">
                        Solution
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Как работает решение
                    </h2>
                    <ul className="mt-5 space-y-3 text-slate-600 leading-7">
                        {landingSections.solution.map((item) => (
                            <li key={item}>• {item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        How it works
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Основной user flow
                    </h2>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {landingSections.steps.map((item, index) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-medium">
                                    {index + 1}
                                </div>
                                <div className="mt-3 text-sm break-all text-slate-900">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 text-xs font-medium">
                        Metrics
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Целевые показатели
                    </h2>
                    <div className="mt-5 space-y-4">
                        {landingSections.metrics.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="text-sm text-slate-500">{item.label}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6">
                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        Product value
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Что делает DentalScan
                    </h2>
                    <div className="mt-5 space-y-4 text-slate-600 leading-7">
                        <p>
                            Помогает врачу быстрее ориентироваться в исследовании и выделять зоны,
                            требующие внимания.
                        </p>
                        <p>
                            Показывает AI findings как вспомогательный слой принятия решений, а не как
                            замену клинической экспертизы.
                        </p>
                        <p>
                            Формирует черновик отчёта и подготавливает workflow для дальнейшей
                            интеграции с CRM клиники.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                    <div className="inline-flex rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs font-medium">
                        AI governance
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                        Ключевой принцип
                    </h2>
                    <p className="mt-4 text-slate-600 leading-7">
                        AI не ставит диагноз и не принимает клинических решений. Финальное
                        заключение всегда остаётся за врачом.
                    </p>
                    <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                        <div className="text-sm font-medium text-slate-900">
                            Что учитывает концепт
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li>• explainable AI</li>
                            <li>• конфиденциальность медицинских данных</li>
                            <li>• клиническая валидация до реального запуска</li>
                            <li>• разграничение ответственности врача и системы</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );

    const DashboardScreen = () => (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 rounded-[28px] bg-white/90 backdrop-blur border border-slate-200 shadow-sm p-5">
                <div>
                    <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        Operations dashboard
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                        Исследования и статусы анализа
                    </h2>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        Интерфейс для клиники или врача: список кейсов, статусы, быстрый переход к
                        анализу и загрузке новых исследований.
                    </p>
                </div>

                <button onClick={() => setCurrentScreen("upload")} className={primaryButton}>
                    Загрузить новое исследование
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardMetrics.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-[24px] bg-white shadow-sm border border-slate-200 px-5 py-4"
                    >
                        <div className="text-sm text-slate-500">{item.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-slate-900">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/70">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Список исследований
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Demo dashboard для product showcase.
                        </p>
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                        3 active cases
                    </div>
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
                            <tr
                                key={study.id}
                                className="border-t border-slate-100 hover:bg-slate-50/60 transition"
                            >
                                <td className="px-5 py-4 font-medium text-slate-900">{study.id}</td>
                                <td className="px-5 py-4 text-slate-900">{study.patient}</td>
                                <td className="px-5 py-4 text-slate-900">{study.type}</td>
                                <td className="px-5 py-4 text-slate-900">{study.date}</td>
                                <td className="px-5 py-4">
                                    <StatusBadge status={study.status} />
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => setCurrentScreen("viewer")}
                                        className="rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2 transition hover:bg-slate-50"
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-[28px] bg-white border border-slate-200 shadow-sm p-6">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    Upload flow
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Upload study</h2>
                <p className="mt-2 text-slate-500">
                    Экран MVP для загрузки КТ или DICOM-файла и запуска предварительного анализа.
                </p>

                <div className="mt-6 rounded-[28px] border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div className="text-lg font-medium text-slate-900">
                        Перетащите файл или выберите вручную
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                        Поддерживаемые форматы: DICOM, CBCT, ZIP-архив исследования.
                    </p>

                    <label className="inline-flex mt-5 cursor-pointer rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium transition hover:bg-slate-800">
                        Выбрать файл
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>

                    {uploadedFile && (
                        <div className="mt-4 rounded-2xl bg-white border border-slate-200 px-4 py-3 inline-block text-sm shadow-sm text-slate-900">
                            Загружен файл: <span className="font-medium">{uploadedFile}</span>
                        </div>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                        <div className="font-medium text-slate-900">Шаг 1. Валидация данных</div>
                        <div className="mt-2 text-sm text-slate-600">
                            Проверка формата файла, completeness исследования и базовых метаданных.
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                        <div className="font-medium text-slate-900">Шаг 2. Запуск AI-анализа</div>
                        <div className="mt-2 text-sm text-slate-600">
                            После загрузки система подготавливает данные для поиска подозрительных зон.
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={startAnalysis}
                        disabled={!uploadedFile}
                        className={`rounded-2xl px-5 py-3 font-medium transition ${
                            uploadedFile
                                ? "bg-slate-900 text-white hover:bg-slate-800"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                    >
                        Запустить анализ
                    </button>

                    <button onClick={() => setCurrentScreen("dashboard")} className={secondaryButton}>
                        Назад в dashboard
                    </button>
                </div>
            </div>

            <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-5">
                <h3 className="text-lg font-semibold text-slate-900">Что показывает этот экран</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li>• понятный вход в user flow</li>
                    <li>• простую загрузку mock-case</li>
                    <li>• готовность к AI processing</li>
                    <li>• UX без перегруза врача деталями</li>
                </ul>
            </div>
        </div>
    );

    const ViewerScreen = () => (
        <section className="grid grid-cols-1 gap-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
                <h2 className="text-lg font-semibold text-slate-900">User workflow</h2>
                <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6 items-start">
                    <div className="mt-5 space-y-4">
                        {timeline.map((step, index) => (
                            <div key={step} className="flex gap-3 items-start">
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="font-medium text-slate-900">{step}</div>
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

                    <div className="mt-8 xl:mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                        <div className="text-sm font-medium text-slate-900">MVP-экраны</div>
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

            <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                            <div>
                                <div className="text-lg font-semibold text-left text-slate-900">
                                    Просмотр исследования
                                </div>
                                <div className="text-sm text-slate-500">
                                    Пациент ID 23421 · CBCT · 06.03.2026
                                </div>
                            </div>
                            <div className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm border border-emerald-200">
                                {analysisStarted ? "Анализ завершён" : "Демо-режим"}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="aspect-[16/10] rounded-[24px] bg-slate-900 relative overflow-hidden border border-slate-800">
                                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_40%)]" />
                                <div className="absolute inset-6 rounded-[28px] border border-slate-700" />
                                <div className="absolute left-[18%] top-[28%] h-20 w-20 rounded-full border-2 border-amber-300" />
                                <div className="absolute left-[54%] top-[45%] h-24 w-24 rounded-full border-2 border-red-300" />
                                <div className="absolute left-[70%] top-[26%] h-16 w-16 rounded-full border-2 border-cyan-300" />

                                <div className="absolute left-4 top-4 rounded-full bg-slate-800/85 backdrop-blur px-3 py-1 text-xs text-slate-50 border border-white/20">
                                    AI overlay ON
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-800/80 backdrop-blur px-3 py-1 text-xs text-slate-50 border border-white/20">
                    Slice 128 / 412
                  </span>
                                    <span className="rounded-full bg-slate-800/80 backdrop-blur px-3 py-1 text-xs text-slate-50 border border-white/20">
                    Axial view
                  </span>
                                    <span className="rounded-full bg-slate-800/80 backdrop-blur px-3 py-1 text-xs text-slate-50 border border-white/20">
                    3 findings detected
                  </span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    onClick={() => setCurrentScreen("upload")}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left text-slate-900 hover:bg-slate-100 transition"
                                >
                                    Загрузить исследование
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left text-slate-900 hover:bg-slate-100 transition">
                                    Запустить анализ
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left text-slate-900 hover:bg-slate-100 transition">
                                    Показать overlay
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-left text-slate-900 hover:bg-slate-100 transition">
                                    Экспорт отчёта
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Key findings</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            AI-подсказки для врача. Финальное клиническое решение принимает специалист.
                        </p>

                        <div className="mt-5 space-y-3 text-left">
                            {findings.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-medium break-all text-slate-900">
                                                {item.title}
                                            </div>
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

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-slate-900">MVP scope</h2>
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                <div className="font-medium text-slate-900">1. Dashboard</div>
                                <div className="mt-2 text-slate-600">
                                    Список исследований, фильтры по пациенту, статус анализа, быстрый доступ к отчётам.
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                <div className="font-medium text-slate-900">2. Upload</div>
                                <div className="mt-2 text-slate-600">
                                    Загрузка DICOM / КТ, проверка формата, старт анализа, базовая валидация данных.
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                <div className="font-medium text-slate-900">3. Viewer</div>
                                <div className="mt-2 text-slate-600">
                                    Просмотр снимка, slice navigation, AI overlay, акцент на подозрительные зоны.
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                                <div className="font-medium text-slate-900">4. Report</div>
                                <div className="mt-2 text-slate-600">
                                    Краткий отчёт по находкам, рекомендации, экспорт PDF, подтверждение врачом.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-white border border-slate-200 shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Report draft</h2>
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4 text-sm">
                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Пациент</div>
                                <div className="font-medium text-slate-900">
                                    ID 23421 · исследование CBCT
                                </div>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Находки</div>
                                <ul className="mt-2 space-y-2 text-slate-700 flex flex-col items-start text-left">
                                    <li>• Подозрение на периапикальное воспаление в области зуба 36.</li>
                                    <li>• Локальное снижение плотности костной ткани в нижней челюсти слева.</li>
                                    <li>• Ретинированный зуб 48, рекомендована дополнительная оценка положения.</li>
                                </ul>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="text-slate-500">Рекомендация</div>
                                <div className="text-slate-700 leading-7 text-left">
                                    Провести клиническую верификацию находок, сопоставить с жалобами
                                    пациента и при необходимости назначить дополнительную диагностику.
                                </div>
                            </div>

                            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-3">
                                <button className="rounded-2xl bg-slate-900 text-white px-4 py-2 font-medium transition hover:bg-slate-800">
                                    Подтвердить отчёт
                                </button>
                                <button className="rounded-2xl border border-slate-200 bg-white text-slate-900 px-4 py-2 font-medium transition hover:bg-slate-100">
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
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_28%),linear-gradient(to_bottom,#f8fbff,#f8fafc)] text-slate-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="rounded-[32px] bg-white/80 backdrop-blur border border-slate-200 shadow-sm px-6 py-5 md:px-8 md:py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm border border-slate-200">
                                DentalScan · AI SaaS для анализа КТ в стоматологии
                            </div>
                            <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                                HealthTech landing + product demo
                            </h1>
                            <p className="mt-3 max-w-3xl text-slate-600 text-base md:text-lg leading-7">
                                Демонстрация концепта продукта: landing с ценностным предложением и
                                рабочий demo-flow с dashboard, upload, viewer и report.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setCurrentScreen("landing")}
                                className="rounded-2xl border border-slate-200 bg-white text-slate-900 px-4 py-2.5 font-medium transition hover:bg-slate-50"
                            >
                                Landing
                            </button>
                            <button
                                onClick={() => setCurrentScreen("dashboard")}
                                className="rounded-2xl bg-slate-900 text-white px-4 py-2.5 font-medium transition hover:bg-slate-800"
                            >
                                Demo
                            </button>
                        </div>
                    </div>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <ScreenNav />

                    <main className="lg:col-span-9">
                        {currentScreen === "landing" && <LandingScreen />}
                        {currentScreen === "dashboard" && <DashboardScreen />}
                        {currentScreen === "upload" && <UploadScreen />}
                        {currentScreen === "viewer" && <ViewerScreen />}
                    </main>
                </section>
            </div>

            <section className="rounded-[32px] border border-slate-200 bg-slate-900 text-white shadow-xl p-8 md:p-10 mt-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="inline-flex rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs text-slate-200">
                            CTA
                        </div>
                        <h2 className="mt-4 text-3xl font-semibold text-white">
                            Explore the product demo
                        </h2>
                        <p className="mt-3 max-w-2xl text-slate-300 leading-7">
                            Перейди в demo-flow, чтобы посмотреть dashboard, upload flow, viewer с
                            AI-находками и черновик отчёта.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setCurrentScreen("dashboard")}
                            className="rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium transition hover:opacity-90"
                        >
                            Open demo
                        </button>
                        <button
                            onClick={() => setCurrentScreen("viewer")}
                            className="rounded-2xl border border-white/15 bg-white/10 text-white px-5 py-3 font-medium transition hover:bg-white/15"
                        >
                            Go to viewer
                        </button>
                    </div>
                </div>
            </section>

            <footer className="text-center text-sm text-slate-500 py-6">
                DentalScan concept demo · Product case by Arina Kunashko
            </footer>
        </div>
    );
}