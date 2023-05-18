import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>> | (() => void);
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}
