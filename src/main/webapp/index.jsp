<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!doctype html>
    <html lang="pt-BR" class="h-full">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Central de Vagas - Faeterj-Rio</title>
        <script src="/_sdk/element_sdk.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="assets/css/styles.css">
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        colors: {
                            primary: {
                                50: '#eff6ff',
                                500: '#3b82f6',
                                600: '#2563eb',
                                700: '#1d4ed8',
                                900: '#1e3a8a'
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            body {
                box-sizing: border-box;
            }
        </style>
        <style>
            @view-transition {
                navigation: auto;
            }
        </style>
        <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
    </head>

    <body class="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="flex h-full">
            <!-- Mobile Header será renderizado pelo componente JavaScript -->

            <!-- Sidebar Desktop -->
            <aside id="sidebar"
                class="hidden md:flex flex-col bg-slate-800 text-white shadow-xl transition-all duration-300 w-72 sidebar-expanded">
                <!-- Sidebar Header -->
                <div class="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-700">
                    <div class="sidebar-title">
                        <h1 id="system-title" class="text-xl font-semibold mb-1">Central de Vagas</h1>
                        <p id="institution-name" class="text-sm text-slate-400">Faeterj-Rio</p>
                    </div>
                    <button onclick="toggleSidebar()"
                        class="p-2 rounded-lg hover:bg-slate-700 transition-colors collapse-btn">
                        <span class="text-lg">◀</span>
                    </button>
                </div>

                <!-- Navigation Container -->
                <div class="flex flex-col flex-1 justify-between overflow-y-auto overflow-x-hidden">
                    <!-- Main Navigation -->
                    <nav class="py-4">
                        <a href="index.jsp"
                            class="nav-item active bg-slate-700 border-r-4 border-blue-500 text-blue-400 px-6 py-3 flex items-center gap-3 hover:bg-slate-700 transition-all no-underline">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">🏠</span>
                            <span class="nav-text">Página Inicial</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Página Inicial
                            </div>
                        </a>
                        <a href="vagas.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 text-white hover:bg-slate-700 transition-all no-underline">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">💼</span>
                            <span class="nav-text">Consulta de Vagas</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Consulta de Vagas
                            </div>
                        </a>
                        <a href="aluno.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 text-white hover:bg-slate-700 transition-all no-underline">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">👤</span>
                            <span class="nav-text">Cadastro do Aluno</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Cadastro do Aluno
                            </div>
                        </a>
                        <a href="empresa.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 text-white hover:bg-slate-700 transition-all no-underline">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">🏢</span>
                            <span class="nav-text">Área da Empresa</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Área da Empresa
                            </div>
                        </a>
                    </nav>

                    <!-- Theme Toggle - Bottom -->
                    <div class="border-t border-slate-700 py-4">
                        <div onclick="toggleTheme()"
                            class="nav-item px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-all">
                            <span id="desktop-theme-icon"
                                class="nav-icon text-xl w-6 text-center flex-shrink-0">🌙</span>
                            <span class="nav-text theme-text">Tema Escuro</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Alternar Tema
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto pt-16 md:pt-0 pb-20 md:pb-0">
                <div class="p-4 md:p-8 max-w-7xl mx-auto">
                    <!-- Página Inicial -->
                    <div class="mb-8">
                        <h2 id="welcome-message"
                            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Bem-vindo
                            à
                            Central de Vagas</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-lg">Conectando alunos às melhores oportunidades
                            de estágio e emprego</p>
                    </div><!-- Stats Grid -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
                            <h4
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                Vagas Ativas</h4>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white">127</p>
                        </div>
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                            <h4
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                Empresas Parceiras</h4>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white">45</p>
                        </div>
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
                            <h4
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                Alunos Cadastrados</h4>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white">892</p>
                        </div>
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
                            <h4
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                Contratações</h4>
                            <p class="text-3xl font-bold text-gray-900 dark:text-white">234</p>
                        </div>
                    </div><!-- About Card -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">📋
                            Sobre o Sistema</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">A Central de Vagas de Estágio
                            da Faeterj-Rio é uma plataforma completa que conecta alunos a oportunidades profissionais. O
                            sistema oferece:</p>
                        <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">•</span>
                                <span><strong>Consulta de Vagas:</strong> Listagem, filtros e busca de vagas de
                                    estágio/emprego</span>
                            </li>
                            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">•</span>
                                <span><strong>Cadastro do Aluno:</strong> Perfil completo com currículo e
                                    competências</span>
                            </li>
                            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">•</span>
                                <span><strong>Área da Empresa:</strong> Gestão de vagas e candidaturas</span>
                            </li>
                            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">•</span>
                                <span><strong>Sistema de Gamificação:</strong> Pontuação por engajamento</span>
                            </li>
                            <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">•</span>
                                <span><strong>Alertas Personalizados:</strong> Notificações sobre novas vagas</span>
                            </li>
                        </ul>
                    </div><!-- Featured Jobs -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">🎯
                            Destaques de Vagas</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Empresa</th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Vaga
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Área
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Tech Solutions</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Desenvolvedor Java Jr
                                        </td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Back-end</td>
                                        <td class="py-3 px-4"><span
                                                class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aberta</span>
                                        </td>
                                    </tr>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">DataCorp</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Analista de Dados</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Data Science</td>
                                        <td class="py-3 px-4"><span
                                                class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aberta</span>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">WebDesign Pro</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Desenvolvedor Front-end
                                            Jr</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Front-end</td>
                                        <td class="py-3 px-4"><span
                                                class="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Poucas
                                                vagas</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation será renderizada pelo componente JavaScript -->
        </div>

        <!-- JavaScript Files -->
        <script src="assets/js/components/MobileHeader.js"></script>
        <script src="assets/js/components/BottomNavigationBar.js"></script>
        <script src="assets/js/components/Sidebar.js"></script>
        <script src="assets/js/common.js"></script>
        <script src="assets/js/index.js"></script>
    </body>

    </html>