/**
 * function components must follow:
 * export { default as Component } from 'path/to/component';
 */

// Pages
export { default as App } from '../app.component.jsx';
export { default as AboutPage } from './pages/about/about.page.jsx';
export { default as HomePage } from './pages/home/home.page.jsx';
export { default as LoginPage } from './pages/login/login.page.jsx';
export { default as WorkerHomePage } from './pages/home/worker/worker-home.page.jsx';
export { default as ManagerHomePage } from './pages/home/manager/manager-home.page.jsx';
export { default as CeoHomePage } from './pages/home/ceo/ceo-home.page.jsx';

// Components
export { default as HeaderComponent } from './components/header/header.component.jsx';
export { default as NavComponent } from './components/nav/nav.component.jsx';
export { default as ExampleComponent } from './components/example/example.component.jsx';
export { default as AddUserForm } from './components/add-user-form/add-user-form.component.jsx';
export { default as TasksComponent } from './components/tasks/tasks.component.jsx';