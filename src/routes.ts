import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
   // * matches all URLs, the ? makes it optional so it will match / as well
   route('/', 'pages/home.tsx'),
   route('login', 'pages/login.tsx'),
   route('register', 'pages/register.tsx'),
   route('*', 'catchall.tsx'),
   route('/dashboard/student', 'pages/studentDashboard.tsx'),
] satisfies RouteConfig
