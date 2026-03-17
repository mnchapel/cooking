<div align="center">

# Cooking

</div>

<p align="center">
<strong>A personal Website for a collection of recipes.</strong>
</p>

<p align="center">
  <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img alt="licence" src="https://img.shields.io/badge/licence-GNU_GPLv3-brightgreen"></a>
  <img alt="stack" src="https://img.shields.io/badge/stack-JS%20%7C%20Vue.js%20%7C%20Tailwind%20CSS-blue">
  <img alt="status" src="https://img.shields.io/badge/status-in_dev-orange">
  <a rel="ci" href="https://github.com/mnchapel/cooking/actions"><img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mnchapel/%20cooking/pages-build-deployment?logo=github&label=Build/CI"></a>
  <img alt="GitHub deployments" src="https://img.shields.io/github/deployments/mnchapel/cooking/pages-build-deployment?logo=github&label=deployment">
  <img alt="Codecov" src="https://img.shields.io/codecov/c/github/mnchapel/cooking?logo=codecov">
</p>
<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/-JavaScript-f7df1e?logo=javascript&logoColor=white">
  <img alt="vue.js" src="https://img.shields.io/badge/-Vue.js-4fc08d?logo=vuedotjs&logoColor=white">
  <img alt="Static Badge" src="https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white">
</p>

Source code for our family recipes website: side dishes, appetizers, beverages, main courses, sauces, breakfast, and desserts. See a demo here.

<p align="center">
  <a href="#-features">Features</a> &nbsp;&bull;&nbsp;
  <a href="#-about">About</a> &nbsp;&bull;&nbsp;
  <a href="#-getting-started">Getting started</a> &nbsp;&bull;&nbsp;
  <a href="#️-development">Development</a> &nbsp;&bull;&nbsp;
  <a href="#-deployment">Deployment</a> &nbsp;&bull;&nbsp;
  <a href="#-usage">Usage</a> &nbsp;&bull;&nbsp;
  <a href="#-resources">Resources</a> &nbsp;&bull;&nbsp;
  <a href="#-contributing">Contributing</a> &nbsp;&bull;&nbsp;
  <a href="#-contributors">Contributors</a> &nbsp;&bull;&nbsp;
  <a href="#️-license">License</a>
</p>

## ✨ Features

- **A modern Website** - This static website is modern and lightweight thanks to [Vue.js](https://vuejs.org/), [Nuxt](https://nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/).
- **Quick navigation** - Tag filters and the search bar allow you to quickly find recipes.
- **Fast edition** - Content is in Markdown format.
- **Fully Responsive** – Adapts to all modern browsers and devices.
- **Makes writing shopping lists easier** - Each recipe can be added to a virtual shopping cart that lists the ingredients you need to buy.

## 💫 About

### Built with

- [Vue.js 3](https://vuejs.org/) with [Vue Router](https://router.vuejs.org/) - The web framework
- [Nuxt 4](https://nuxt.com/) - The web framework
- [Nuxt UI](https://ui.nuxt.com/) - UI components
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [Marked](https://marked.js.org/) and [gray-matter](https://www.npmjs.com/package/gray-matter) - Markdown parsers
- [Vite](https://vite.dev/) - Frontend build tool
- [GitHub Actions](https://github.com/features/actions) - Automated workflow
- [Prettier](https://prettier.io/) with [Prettier for arrays](https://www.npmjs.com/package/prettier-plugin-multiline-arrays?activeTab=readme) - Code formatter
- [ESLint](https://eslint.org/) with ESLint plugins for [Vue.js](https://eslint.vuejs.org/), [CSS](https://www.npmjs.com/package/@eslint/css), [JSON](https://www.npmjs.com/package/@eslint/json), [HTML](https://www.npmjs.com/package/@html-eslint/eslint-plugin), [Prettier](https://www.npmjs.com/package/eslint-config-prettier) - For catching bugs

## 🚀 Getting started

### Prerequisites

To install, build, and deploy this website, the following software must be installed:

- [Node.js v24.13+](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

For development, [VS Code](https://code.visualstudio.com/) is recommended, along with the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar), [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

To verify that Node.js and npm are installed, open a terminal and run:

```bash
node --version
npm --version
```

If both commands return a version number, the installation is successful.

If an error occurs, download and install Node.js and npm by following the [procedure described in the official documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). This one strongly recommends using nvm (Node Version Manager) instead of the official Node.js installer. In this case, follow the appropriate installation procedure according to the operating system:

- [Install nvm, Node.js and npm **on Linux**](https://github.com/nvm-sh/nvm/tree/master?tab=readme-ov-file#installing-and-updating).
- [Install nvm, Node.js and npm **on Windows**](https://github.com/coreybutler/nvm-windows).

### Local setup

1. Download the project in using one of the following methods:
    - [Direct download as a ZIP archive](https://github.com/mnchapel/cooking/archive/refs/heads/main.zip)
    - Clone the repository with Git:

      ```bash
      git clone https://github.com/mnchapel/cooking.git
      ```

2. If the ZIP archive was downloaded, extract its contents to any folder.

3. Open a terminal in the project's folder and run this command to install dependencies :

    ```bash
    npm install
    ```

4. Start a local development server:

    ```bash
    npm run dev
    ```

    The website is now accessible with a browser at <http://localhost:5173>.

## 🛠️ Development

### Project structure

```text
project-root/
├── .vscode/                       # IDE workspace configuration
│   └── tasks.json                 # Custom build and automation tasks for VS Code
├── docs/                          # Auto-generated project documentation
├── public/                        # Static assets served as-is at the application root (excluded from build processing)
├── scripts/                       # Code files not intended for the Vue application but for back-end, specially with Node.js
├── src/                           # Application source code
│   ├── assets/                    # Static assets processed by the build pipeline
│   ├── components/                # Reusable Vue UI components
│   ├── composables/               # Reusable Vue Composition API logic
│   ├── content/                   # Markdown-based content files
│   ├── helpers/                   # Shared utility and helper functions
│   ├── layouts/                   # Layout components providing persistent page structure
│   ├── plugins/                   # Vue plugins and third-party integrations
│   ├── router/                    # Application routing configuration and dynamic route definitions
│   ├── store/                     # Centralized state management (Vuex modules)
│   ├── views/                     # Route-level view components (page entry points)
│   ├── App.vue                    # Root application component
│   ├── global.js                  # Global application configuration and variables
│   └── main.js                    # Application bootstrap and initialization entry point
├── .prettierrc.json               # Code formatting configuration (Prettier)
├── package.json                   # Project metadata, dependencies, and npm scripts
├── LICENSE.md                     # Project license information
└── README.md                      # Project overview and documentation
```

### Code style and commit messages

- **Code Formatting:** Use [Prettier](https://prettier.io/) to ensure consistency. Many editors can apply `.prettierrc.json` automatically when saving.
- **Coding Style**: Follow the [Vue.js Style Guide](https://vuejs.org/style-guide/) and the naming convention already in place.
- **Commit Messages:** Follow the [Conventional Commits](https://www.conventionalcommits.org/) style to maintain a clear and informative history:
  - `feat`: New features.
  - `fix`: Bug fixes.
  - `docs`: Documentation updates.
  - `style`: Code style changes.
  - `refactor`: Refactoring without changing functionality.
  - `test`: Adding or modifying tests.
  - `chore`: Maintenance tasks.
  - `merge`: Merging branches or pull requests. Examples:
    - `merge: feature-branch-xxx into feature-branch`
    - `merge: remote feature-branch into local feature-branch`
    - `merge: pull request #12 from feature-branch`

### Usefull commands

- To **install** the npm packages:

  ```bash
  npm install
  ```

  - VS Code task: `npm: install`.

- To **compile and hot-reloading** for development:

  ```bash
  npm run dev
  ```

  - VS Code task: none.

- To **compile and minify** for production:

  ```bash
  npm run build
  ```

  - VS Code task: none.

## 🌍 Deployment

[TODO](https://github.com/HugoRCD/canvas/blob/main/README.md) and [TODO](https://docs.readur.app/deployment/)

## 📖 Usage

### Add a recipe

TODO

## 📚 Resources

General links:

## 🤝 Contributing

Found a bug? Please [open an issue](https://github.com/josephgarnier/fast-sim-design/issues/new) in including details, reproduction steps, and any relevant screenshots or logs. Your contribution is welcome and greatly appreciated.

## 👥 Contributors

This project is maintained and developed by [Joseph Garnier](https://www.joseph-garnier.fr/) and [Marie-Neige Chapel](https://github.com/mnchapel).

## ©️ License

This work is licensed under the terms of the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">GNU GPLv3</a>. See the [LICENSE.md](LICENSE.md) file for details.
