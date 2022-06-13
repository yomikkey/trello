import React, { useRef, useState } from 'react'
import EditIcon from '../assets/pen.png';
import DeleteIcon from '../assets/delete.png';
import CheckIcon from '../assets/check.png';


interface TaskListItemProps {
  taskListItems: { 
    id: number,
    name: string 
  }[];
  editTask: (index: number, newTask: string) => void;
  deleteTask: (index: number) => void;
  onDragStart: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (evt: React.DragEvent<HTMLDivElement>) => void;
}

function TaskListItem(props: TaskListItemProps) {
  const { taskListItems, editTask, deleteTask,onDragStart,onDragEnd } = props;
  const [Items, setItems] = useState(taskListItems);
  const [editedItem, setEditedItem] = useState('');
  const [editMode, setEditMode] = useState(-1);

  return (
    <>
      {Items.map((TaskItem, index) => (
        index == editMode ?
          <div 
            key={index} 
            className='Task-Card-Item'
            id={TaskItem.id.toString()}
            onDragStart={e => onDragStart(e)}
            onDragEnd={e => onDragEnd(e)}
          >
            <input
              className='Task-Card-Item-Input'
              type={'text'}
              autoFocus
              // value={TaskItem}
              placeholder={TaskItem.name}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setEditedItem(e.currentTarget.value);
              }
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  editTask(index, editedItem);
                  setEditMode(-1);
                }
              }}
            />
            <img
              className='Ok-Task-Icon'
              src={CheckIcon}
              height={12}
              alt='Check Task'
              onClick={() => {
                editTask(index, editedItem);
                setEditMode(-1);
              }
              }
            />
          </div>
          :
          <div key={index}
            className='Task-Card-Item'
            draggable
            
          >
            <span>{TaskItem.name}</span>
            <img
              className='Edit-Task-Icon'
              src={EditIcon}
              alt='Edit Task'
              height={14}
              onClick={() => {
                setEditMode(index);
              }
              }
            />
            <img
              className='Delete-Task-Icon'
              src={DeleteIcon}
              height={12}
              alt='Delete Task'
              onClick={() => {
                deleteTask(index);
              }
              }
            />
          </div>

      ))}
    </>
  )
}

export default TaskListItem