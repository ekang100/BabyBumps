import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import styles from './Task.module.css';
import Popup from '../../components/Popup';

const Task = ({
  taskId,
  stage,
  category,
  handleDragStart,
  handleDragEnd,
  index,
  title,
  description,
  notes,
  updateTaskNotes,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || '');

  const handleIconClick = (e) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleSaveNotes = () => {
    updateTaskNotes(taskId, editedNotes);
    setIsPopupOpen(false);
  };

  if (!title || !description) {
    return (
      <div className={styles.taskContainer} data-id={taskId}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>Task not found</div>
        </div>
        <div className={styles.taskBody}>
          <div className={styles.taskDescription}>No description available.</div>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={(event) => {
        handleDragStart(event, taskId, stage, category, index);
        event.currentTarget.classList.add(styles.dragging); // Add dragging class
      }}
      onDragEnd={(event) => {
        handleDragEnd();
        event.currentTarget.classList.remove(styles.dragging); // Remove dragging class
      }}
      className={styles.taskContainer}
      data-id={taskId}
    >
      <div className={styles.taskHeader}>
        <div className={styles.taskTitle}>{title}</div>
      </div>
      <div className={styles.taskBody}>
        <div className={styles.taskDescription}>⁍ {description}</div>
        <div className={styles.taskFooter}>
          <div className={styles.taskIconContainer} onClick={handleIconClick}>
            <FiEdit className={styles.taskIcon} />
            {notes && <div className={styles.taskStatusIndicator} />}
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          title={title}
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
          onSave={handleSaveNotes}
          placeholder="Enter your notes here..."
        />
      )}
    </div>
  );
};

export default Task;