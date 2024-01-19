// auth.js (create a separate file for authentication-related functions)
import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role; // Assuming the role is stored in the token
    }
    return null;
};

export const isAdmin = () => {
    const userRole = getUserRole();
    return userRole === 'Admin';
};
