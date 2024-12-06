import React, { useEffect } from 'react';
import { GroupProvider, useGroup } from './components/GroupContext';
import { getGroups } from './api/api';
import GroupSelect from './components/GroupSelect';

function App() {
    const { selectedGroup, changeGroup } = useGroup();
    const [groups, setGroups] = React.useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsData = await getGroups();
                setGroups(groupsData);  // Устанавливаем массив групп в состояние
                // Устанавливаем группу по умолчанию
                if (groupsData.length > 0) {
                    changeGroup(groupsData[0]);
                }
            } catch (error) {
                console.error("Failed to fetch groups", error);
            }
        };

        fetchGroups();
    }, [changeGroup]);

    return (
        <div>
            <h1>Выберите группу</h1>
            <GroupSelect
                groups={groups}
                onGroupChange={changeGroup}
                selectedGroup={selectedGroup}  // Передаем выбранную группу
            />
            {selectedGroup && <p>Выбранная группа: {selectedGroup}</p>}
        </div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}

export default function AppWrapper() {
    return (
        <GroupProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </GroupProvider>
    );
}
