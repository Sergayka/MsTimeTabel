// src/store/GroupContext.js
import React, { createContext, useState, useContext } from 'react';

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const changeGroup = (group) => setSelectedGroup(group);

    return (
        <GroupContext.Provider value={{ selectedGroup, changeGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
