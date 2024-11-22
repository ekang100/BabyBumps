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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const event = new Event('dragstart');
      e.currentTarget.dispatchEvent(event);
    }
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
        event.currentTarget.classList.add(styles.dragging);
      }}
      onDragEnd={(event) => {
        handleDragEnd();
        event.currentTarget.classList.remove(styles.dragging);
      }}
      onKeyDown={handleKeyDown}
      className={styles.taskContainer}
      data-id={taskId}
      tabIndex={0}
      role="button"
      aria-label={`${title} task in ${category} category of ${stage}`}
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