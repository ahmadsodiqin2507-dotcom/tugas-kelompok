// Utility functions

// Format currency to Indonesian Rupiah
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Get current user from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
}

// Check user role
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function isUser() {
    const user = getCurrentUser();
    return user && user.role === 'user';
}
