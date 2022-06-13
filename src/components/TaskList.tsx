import React, { ChangeEvent, useState } from 'react'
import TaskListItem from './TaskListItem';

interface TaskListProps {
  taskCard: {
    taskCardKey: number;
    taskCardTitle: string,
    taskCardItems:
    {
      id: number,
      name: string
    }[]
    // ],
  };
  changeTitle: (taskCardKey: number, newTitle: string) => void;
  updateTask: (taskCardKey: number, newTaskCardItems: { id: number, name: string }[]) => void;
  onDelete: (index: number) => void;
  // key: number;
}

function TaskList(props: TaskListProps) {
  const { taskCard, onDelete, updateTask, changeTitle } = props;
  const [newItem, setnewItem] = useState('');
  const [editTitle, seteditTitle] = useState('Add Title');
  const [isEditing, setisEditing] = useState(false);

  const onChangeAddTask = (newItem: string) => {
    const newTaskCard = { ...taskCard };
    let key = Math.floor((Math.random() * 1000000) + 1);
    newTaskCard.taskCardItems.push({ id: key, name: newItem });
    updateTask(taskCard.taskCardKey, newTaskCard.taskCardItems);
  }

  const onChangeUpdateTask = (index: number, newItem: string) => {
    const newTaskCard = { ...taskCard };
    newTaskCard.taskCardItems[index].name = newItem;
    updateTask(taskCard.taskCardKey, newTaskCard.taskCardItems);
  }

  const handleOnClickDeleteTask = (index: number) => {
    const newTaskCard = { ...taskCard };
    newTaskCard.taskCardItems.splice(index, 1);
    updateTask(taskCard.taskCardKey, newTaskCard.taskCardItems);
  }
  // -----------------------------------------------------------------------------------
  // drag and drop
  const onDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget as Element;
    if (newTarget?.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: React.DragEvent<HTMLDivElement>, key: number) => {
    evt.preventDefault();
    debugger;
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let tasks = taskCard.taskCardItems;
    console.log(data);
    console.log(evt.dataTransfer.getData("text/plain"));

    // console.log(tasks);
    // let updated = tasks.map(task => {
    //   if (task.name == data) task.done = value;
    //   return task;
    // });
    // this.setState({ tasks: updated });
  };

  return (
    <div
      className='Task-Card'
      draggable
      onDragLeave={e => onDragLeave(e)}
      onDragEnter={e => onDragEnter(e)}
      onDragEnd={e => onDragEnd(e)}
      onDragOver={e => onDragOver(e)}
      onDrop={e => onDrop(e, taskCard.taskCardKey)}
      id={taskCard.taskCardKey.toString()}
    >
      {isEditing ?
        <div className='Task-Card-Header-Editing'>
          <input type='text'
            autoFocus
            value={editTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              seteditTitle(e.target.value);
            }}
            onAbort={() => {
              changeTitle(taskCard.taskCardKey, taskCard.taskCardTitle);
              setisEditing(false);
            }}
            onBlur={() => {
              changeTitle(taskCard.taskCardKey, editTitle);
              setisEditing(false);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                changeTitle(taskCard.taskCardKey, editTitle);
                setisEditing(false);
              }
            }}

          />
        </div>
        :
        <div className='Task-Card-Header'>
          <span
            onDoubleClick={() => { setisEditing(true) }}
          >
            {taskCard?.taskCardTitle}
          </span>
        </div>

      }
      <div className='Task-Card-Body'>
        <TaskListItem
          taskListItems={taskCard?.taskCardItems}
          editTask={onChangeUpdateTask}
          deleteTask={handleOnClickDeleteTask}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </div>
      <div className='Task-Card-Footer'>
        <div className='Add-Task-Section'>
          <input
            className='Add-Task-Input'
            type={'text'}
            value={newItem}
            placeholder={'Add Task'}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setnewItem(e.currentTarget.value);
            }
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                newItem && (onChangeAddTask(newItem));
                setnewItem('');
              }
            }}
          />
          <button
            className='Add-Task-Button'
            onClick={() => {
              newItem && (onChangeAddTask(newItem));
              setnewItem('');
            }}
          >+</button>
        </div>
        <button
          className='Delete-Task-Card-Button'
          onClick={() => {
            onDelete(taskCard.taskCardKey)
          }} >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskList