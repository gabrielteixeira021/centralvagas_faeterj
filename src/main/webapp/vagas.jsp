<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!doctype html>
    <html lang="pt-BR" class="h-full">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consulta de Vagas - Central de Vagas - Faeterj-Rio</title>
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
                            class="nav-item px-6 py-3 flex items-center gap-3 text-white hover:bg-slate-700 transition-all no-underline">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">🏠</span>
                            <span class="nav-text">Página Inicial</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Página Inicial
                            </div>
                        </a>
                        <a href="vagas.jsp"
                            class="nav-item active bg-slate-700 border-r-4 border-blue-500 text-blue-400 px-6 py-3 flex items-center gap-3 hover:bg-slate-700 transition-all no-underline">
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
                    <!-- Consulta de Vagas -->
                    <div class="mb-8">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">💼 Consulta de
                            Vagas</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-lg">Encontre a oportunidade ideal para sua
                            carreira</p>
                    </div>

                    <!-- Search Filters -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔍 Filtros de Busca</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar
                                    por palavra-chave</label>
                                <input type="text" placeholder="Ex: Java, Design, Marketing..."
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Área</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Todas as áreas</option>
                                        <option>Back-end</option>
                                        <option>Front-end</option>
                                        <option>Full Stack</option>
                                        <option>Cybersecurity</option>
                                        <option>Data Science</option>
                                        <option>Mobile</option>
                                        <option>DevOps</option>
                                        <option>Blockchain</option>
                                        <option>Game Dev</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Todos os tipos</option>
                                        <option>Estágio</option>
                                        <option>Trainee</option>
                                        <option>CLT</option>
                                        <option>PJ</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                class="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Buscar Vagas
                            </button>
                        </div>
                    </div>

                    <!-- Architecture Info -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">📊 Arquitetura do Sistema
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold text-gray-900 dark:text-white mb-2">Servlets Implementados:</p>
                                <ul class="space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                                    <li>• <strong>VagasServlet:</strong> Listagem, busca e detalhamento de vagas</li>
                                    <li>• <strong>CandidaturaServlet:</strong> Processamento de candidaturas e
                                        notificações</li>
                                    <li>• <strong>EmpresaServlet:</strong> Gestão de vagas e candidaturas por empresas
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900 dark:text-white mb-2">API REST Interna:</p>
                                <ul class="space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                                    <li>• GET /api/vagas - Lista todas as vagas</li>
                                    <li>• GET /api/vagas/{id} - Detalhes de uma vaga específica</li>
                                    <li>• POST /api/candidaturas - Registra candidatura</li>
                                    <li>• GET /api/empresas/{id}/vagas - Vagas de uma empresa</li>
                                </ul>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300"><strong>Padrão de Projeto:</strong> DAO (Data
                                Access Object) para separação da lógica de acesso ao banco de dados</p>
                        </div>
                    </div>

                    <!-- Available Jobs -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Vagas Disponíveis</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Empresa</th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Cargo</th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Área
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Tipo
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Ação
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Tech Solutions</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Desenvolvedor Java Jr
                                        </td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Tecnologia</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Estágio</td>
                                        <td class="py-3 px-4">
                                            <button
                                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                                Candidatar
                                            </button>
                                        </td>
                                    </tr>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">DataCorp</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Analista de Dados</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Análise</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Emprego</td>
                                        <td class="py-3 px-4">
                                            <button
                                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                                Candidatar
                                            </button>
                                        </td>
                                    </tr>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">WebDesign Pro</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Designer UX/UI</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Design</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Estágio</td>
                                        <td class="py-3 px-4">
                                            <button
                                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                                Candidatar
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Marketing Digital</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Assistente de Marketing
                                        </td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Marketing</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Estágio</td>
                                        <td class="py-3 px-4">
                                            <button
                                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                                Candidatar
                                            </button>
                                        </td>
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
        <script src="assets/js/common.js"></script>
        <script src="assets/js/api.js"></script>
        <script src="assets/js/vagas.js"></script>
    </body>

    </html>