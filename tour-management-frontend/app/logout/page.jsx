"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                localStorage.removeItem('token');
                router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        // Call the logout function
        logout();
    }, [router]);

    return <></>; // You can return null or any other component if needed
};

export default LogoutPage;
