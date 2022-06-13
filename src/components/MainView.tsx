import React, { useState } from 'react'
import TaskList from './TaskList'

function MainView() {

    const [TaskCardCount, setTaskCardCount] = useState(1);
    const [TastItemCount, setTastItemCount] = useState(1);
    const [taskCard, settaskCard] = useState([
        {
            taskCardKey: 0,
            taskCardTitle: 'Add Title',
            taskCardItems: [
                {
                    id: 0,
                    name: 'Add Task'
                }
            ],
        },
    ]);

    const handleOnClickAddCard = () => {
        setTaskCardCount(TaskCardCount + 1);
        settaskCard([...taskCard, {
            taskCardKey: TaskCardCount,
            taskCardTitle: 'Add Title',
            taskCardItems: [{ id: TastItemCount, name: 'Add Task' }],
        }]);
    }

    const handleOnClickDeleteCard = (key: number) => {
        const newTaskCard = taskCard.filter(object => {
            return object.taskCardKey !== key;
        });
        settaskCard(newTaskCard);
    }

    const handleOnEditTitle = (key: number, newTitle: string) => {
        const newTaskCard = taskCard.map(object => {
            if (object.taskCardKey === key) {
                object.taskCardTitle = newTitle;
            }
            return object;
        });
        settaskCard(newTaskCard);
    }

    const handleUpdateTask = (index: number, taskCardItems: {id:number,name:string}[]) => {
        const objIndex = taskCard.findIndex(obj => obj.taskCardKey === index);
        const newTaskCard = [...taskCard];
        // newTaskCard[objIndex].taskCardItems = taskCardItems;
        newTaskCard[objIndex].taskCardItems = taskCardItems;
        settaskCard(newTaskCard);
    }

    return (
        <div className="main-Content" >
            {taskCard.map((taskCard, index) => (
                <TaskList
                    key={taskCard.taskCardKey}
                    taskCard={taskCard}
                    updateTask={handleUpdateTask}
                    onDelete={handleOnClickDeleteCard}
                    changeTitle={handleOnEditTitle}
                />
            ))}
            <div className="Add-Task-Card-Button-Container">
                <button className="Add-Task-Card-Button" onClick={() => {
                    handleOnClickAddCard();
                }}>+</button>
            </div>
        </div>
    )
}

export default MainView