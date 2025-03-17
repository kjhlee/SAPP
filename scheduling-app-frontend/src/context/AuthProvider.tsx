import React, {createContext, useContext, useState, useEffect} from 'react';

interface AuthContextType{
    user: any;
    login: (token: string, userData: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (token: string, userData: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

    };
    return (
        <AuthContext.Provider value = {{ user, login }}>
            {children}
        </AuthContext.Provider>
    )
}