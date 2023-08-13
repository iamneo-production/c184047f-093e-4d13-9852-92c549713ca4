import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export function UserProvider({ children }) {
    const [emailId, setEmailId] = useState('');

    return (
        <EmailContext.Provider value={{ emailId, setEmailId }}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmailId() {
    return useContext(EmailContext);
}
