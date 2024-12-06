// src/components/GroupSelect.js
import React from 'react';

function GroupSelect({ groups = [], onGroupChange, selectedGroup }) {
    if (!groups || groups.length === 0) {
        return <p>Загрузка групп...</p>;  // Покажем текст при отсутствии данных
    }

    return (
        <div>
            <label htmlFor="group-select">Выберите группу: </label>
            <select
                id="group-select"
                onChange={(e) => onGroupChange(e.target.value)}
                value={selectedGroup || ""}
            >
                <option value="">Выберите</option>
                {groups.map((group) => (
                    <option key={group} value={group}>
                        {group}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GroupSelect;
