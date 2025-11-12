<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!doctype html>
    <html lang="pt-BR" class="h-full">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro do Aluno - Central de Vagas - Faeterj-Rio</title>
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
                            class="nav-item active bg-slate-700 border-blue-500 text-blue-400 px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
                            <span class="nav-icon text-xl w-6 text-center flex-shrink-0">👤</span>
                            <span class="nav-text">Cadastro do Aluno</span>
                            <div
                                class="nav-tooltip absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible transition-all z-50 shadow-lg">
                                Cadastro do Aluno
                            </div>
                        </a>

                        <a href="empresa.jsp"
                            class="nav-item px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 border-l-4 border-transparent hover:border-blue-500 transition-all block no-underline text-inherit">
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
                    <!-- Cadastro do Aluno -->
                    <div class="mb-8">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">👤 Cadastro do
                            Aluno</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-lg">Complete seu perfil para receber as melhores
                            oportunidades</p>
                    </div>

                    <!-- Personal Info -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informações Pessoais</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome
                                    Completo</label>
                                <input type="text" placeholder="Digite seu nome completo"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                                    <input type="email" placeholder="seu@email.com"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Telefone</label>
                                    <input type="tel" placeholder="(21) 99999-9999"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Academic Info -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informações Acadêmicas</h3>
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Curso</label>
                                <select
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                    <option>Selecione seu curso</option>
                                    <option>Análise e Desenvolvimento de Sistemas</option>
                                    <option>Sistemas de Informação</option>
                                    <option>Design Digital</option>
                                    <option>Marketing Digital</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Período</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Selecione</option>
                                        <option>1º Período</option>
                                        <option>2º Período</option>
                                        <option>3º Período</option>
                                        <option>4º Período</option>
                                        <option>5º Período</option>
                                        <option>6º Período</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Turno</label>
                                    <select
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                                        <option>Selecione</option>
                                        <option>Manhã</option>
                                        <option>Tarde</option>
                                        <option>Noite</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Skills and Experience -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Competências e Experiência
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competências
                                    Técnicas</label>
                                <textarea placeholder="Ex: Java, Python, SQL, Git, HTML/CSS..." rows="4"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-vertical"></textarea>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experiência
                                    Profissional</label>
                                <textarea placeholder="Descreva suas experiências anteriores..." rows="4"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-vertical"></textarea>
                            </div>
                            <div class="flex flex-col md:flex-row gap-3">
                                <button
                                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Salvar Cadastro
                                </button>
                                <button
                                    class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Gamification -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎮 Sistema de Gamificação
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">Ganhe pontos completando seu perfil e se
                            candidatando a vagas!</p>
                        <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                            <li class="flex items-center gap-2">
                                <span class="text-green-500">✅</span>
                                <span>Cadastro completo: +50 pontos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-green-500">✅</span>
                                <span>Primeira candidatura: +30 pontos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-green-500">✅</span>
                                <span>Currículo atualizado: +20 pontos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <span class="text-green-500">✅</span>
                                <span>Avaliação positiva de empresa: +40 pontos</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation será renderizada pelo componente JavaScript -->
        </div>

        <!-- JavaScript Files -->
        <script src="assets/js/components/BottomNavigationBar.js"></script>
        <script src="assets/js/common.js"></script>
        <script src="assets/js/aluno.js"></script>
    </body>

    </html>