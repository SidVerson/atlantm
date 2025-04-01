export default defineNuxtRouteMiddleware((to) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) {
        return navigateTo('/login');
    }

    if (to.path.startsWith('/admin') && user.role !== 'admin') {
        return navigateTo('/');
    }

    if (to.path.startsWith('/manager') && user.role !== 'manager') {
        return navigateTo('/');
    }
});