import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const checkAuth = () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (token) {
    //                 setUser({ token });
    //             } else {
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             console.error('Failed to check authentication:', error);
    //             setUser(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     checkAuth();
    // }, []);

    const login = (data) => {
        console.log(data)
        setUser(data.user);
        sessionStorage.setItem('token', data.access_token);                
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
