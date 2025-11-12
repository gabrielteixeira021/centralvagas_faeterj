<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!doctype html>
    <html lang="pt-BR" class="h-full">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Área da Empresa - Central de Vagas - Faeterj-Rio</title>
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
            <!-- Mobile Header -->
            <header
                class="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-slate-800 text-white shadow-lg">
                <div class="w-8"></div>
                <h1 id="mobile-system-title" class="text-lg font-semibold text-center flex-1">Central de Vagas</h1>
                <button onclick="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-700 transition-colors">
                    <span id="mobile-theme-icon" class="text-xl">🌙</span>
                </button>
            </header>

            <!-- Sidebar -->
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
                <div class="flex flex-col flex-1 justify-between overflow-y-auto">
                    <!-- Main Navigation -->
                    <nav class="py-4">
                        <a href="index.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">🏠</span>
                            <span class="nav-text">Página Inicial</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Página Inicial
                            </div>
                        </a>

                        <a href="vagas.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">💼</span>
                            <span class="nav-text">Consulta de Vagas</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Consulta de Vagas
                            </div>
                        </a>

                        <a href="aluno.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">👤</span>
                            <span class="nav-text">Cadastro do Aluno</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Cadastro do Aluno
                            </div>
                        </a>

                        <a href="empresa.jsp"
                            class="nav-item active bg-slate-700 border-blue-500 text-blue-400 px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
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
                    <!-- Área da Empresa -->
                    <div class="mb-8">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">🏢 Área da Empresa
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 text-lg">Gerencie suas vagas e encontre os melhores
                            talentos</p>
                    </div>

                    <!-- Create New Job -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cadastrar Nova Vaga</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome da
                                    Empresa</label>
                                <input type="text" placeholder="Digite o nome da empresa"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título da
                                    Vaga</label>
                                <input type="text" placeholder="Ex: Desenvolvedor Java Jr"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Área</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Selecione a área</option>
                                        <option>Tecnologia</option>
                                        <option>Design</option>
                                        <option>Marketing</option>
                                        <option>Administração</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Selecione o tipo</option>
                                        <option>Estágio</option>
                                        <option>Emprego</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição
                                    da Vaga</label>
                                <textarea placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                                    rows="4"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-vertical"></textarea>
                            </div>
                            <button
                                class="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Publicar Vaga
                            </button>
                        </div>
                    </div>

                    <!-- Published Jobs -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Minhas Vagas Publicadas
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Vaga
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Área
                                        </th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Candidatos</th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Status</th>
                                        <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                                            Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Desenvolvedor Java Jr
                                        </td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Tecnologia</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">12</td>
                                        <td class="py-3 px-4">
                                            <span
                                                class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Ativa</span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <div class="flex gap-2">
                                                <button
                                                    class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">Ver</button>
                                                <button
                                                    class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">Editar</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-gray-50 dark:hover:bg-slate-700">
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Designer UX/UI</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">Design</td>
                                        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">8</td>
                                        <td class="py-3 px-4">
                                            <span
                                                class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Ativa</span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <div class="flex gap-2">
                                                <button
                                                    class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">Ver</button>
                                                <button
                                                    class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">Editar</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Database Info -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">💾 Banco de Dados
                            Relacional</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">O sistema utiliza MySQL/PostgreSQL com as
                            seguintes tabelas principais:</p>
                        <ul class="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-1">•</span>
                                <span><strong>alunos:</strong> Dados pessoais, acadêmicos e competências</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-1">•</span>
                                <span><strong>empresas:</strong> Informações das empresas parceiras</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-1">•</span>
                                <span><strong>vagas:</strong> Detalhes das oportunidades disponíveis</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-1">•</span>
                                <span><strong>candidaturas:</strong> Relacionamento entre alunos e vagas</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-blue-500 mt-1">•</span>
                                <span><strong>gamificacao:</strong> Pontuação e conquistas dos alunos</span>
                            </li>
                        </ul>
                        <p class="text-gray-600 dark:text-gray-300">
                            <strong>Padrão DAO:</strong> Cada tabela possui uma classe DAO dedicada para operações CRUD,
                            garantindo separação de responsabilidades e facilidade de manutenção.
                        </p>
                    </div>

                    </tbody>
                    </table>
                </div>
        </div>
        </div>

        <!-- Bottom Navigation será renderizada pelo componente JavaScript -->

        <!-- JavaScript Files -->
        <script src="assets/js/components/BottomNavigationBar.js"></script>
        <script src="assets/js/common.js"></script>
        <script src="assets/js/empresa.js"></script>
        </main>
        </div>
    </body>

    </html>