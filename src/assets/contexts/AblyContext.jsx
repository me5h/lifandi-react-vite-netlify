import { createContext, useState } from 'react';
import Ably from 'ably';

export const AblyContext = createContext();

export const AblyProvider = ({ children }) => {
    const [ably] = useState(() => new Ably.Realtime.Promise({
        authUrl: '/.netlify/functions/generate-ably-token'
    }));

    return (
        <AblyContext.Provider value={ably}>
            {children}
        </AblyContext.Provider>
    );
};
