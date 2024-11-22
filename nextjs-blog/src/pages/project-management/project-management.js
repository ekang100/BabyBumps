import { useState } from 'react';
import styles from './project-management.module.css';

const Stage = ({ stage, categories, taskLog, handleDragStart, handleDrop, handleDragOver, dragInsertion, handleDragEnd }) => (
  <div className={styles.stage}>
    <h3 className={styles.stageTitle}>{stage}</h3>
    {categories.map((category) => (
      <Category
        key={category}
        stage={stage}
        category={category}
        taskIds={taskLog[stage][category]}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        dragInsertion={dragInsertion}
        handleDragEnd={handleDragEnd}
      />
    ))}
  </div>
);

const Category = ({
  stage,
  category,
  taskIds,
  handleDragStart,
  handleDrop,
  handleDragOver,
  dragInsertion,
  handleDragEnd,
}) => (
  <div
    className={styles.category}
    onDragOver={handleDragOver}
    onDrop={(event) => handleDrop(event, stage, category)}
  >
    <h4 className={styles.categoryTitle}>{category}</h4>
    {taskIds.map((taskId, index) => (
      <Task
        key={taskId}
        taskId={taskId}
        stage={stage}
        category={category}
        handleDragStart={handleDragStart}
        index={index}
        dragInsertion={dragInsertion}
        handleDragEnd={handleDragEnd}
      />
    ))}
  </div>
);

const Task = ({ taskId, stage, category, handleDragStart, index, dragInsertion, handleDragEnd }) => {
  const isDraggedOver = dragInsertion.draggedOverTaskId === taskId;
  const insertionClass = isDraggedOver
    ? dragInsertion.insertBefore
      ? styles.taskInsertionBefore
      : styles.taskInsertionAfter
    : '';

  return (
    <div
      draggable
      onDragStart={(event) => handleDragStart(event, taskId, stage, category, index)}
      onDragEnd={handleDragEnd}
      className={`${styles.task} ${insertionClass}`}
      data-id={taskId}
    >
      Task {taskId}
    </div>
  );
};

const UpdatedPM = () => {
  const stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
  const categories = ['To Do', 'In Progress', 'Done'];

  const [taskLog, setTaskLog] = useState({
    'Stage 1': { 'To Do': [1, 2, 3], 'In Progress': [], 'Done': [] },
    'Stage 2': { 'To Do': [4, 5, 6], 'In Progress': [], 'Done': [] },
    'Stage 3': { 'To Do': [7, 8, 9], 'In Progress': [], 'Done': [] },
    'Stage 4': { 'To Do': [10, 11, 12], 'In Progress': [], 'Done': [] },
  });

  const [dragInsertion, setDragInsertion] = useState({
    draggedOverTaskId: null,
    insertBefore: true,
  });

  const handleDragStart = (event, taskId, sourceStage, sourceCategory, sourceIndex) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('sourceStage', sourceStage);
    event.dataTransfer.setData('sourceCategory', sourceCategory);
    event.dataTransfer.setData('sourceIndex', sourceIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const target = event.target.closest(`.${styles.task}`);

    if (target) {
      const taskId = parseInt(target.getAttribute('data-id'), 10);
      const boundingRect = target.getBoundingClientRect();
      const cursorY = event.clientY;
      const midpoint = boundingRect.top + boundingRect.height / 2;
      const insertBefore = cursorY < midpoint;

      setDragInsertion({
        draggedOverTaskId: taskId,
        insertBefore: insertBefore,
      });
    }
  };

  const handleDragEnd = () => {
    setDragInsertion({
      draggedOverTaskId: null,
      insertBefore: true,
    });
  };

  const handleDrop = (event, targetStage, targetCategory) => {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const sourceStage = event.dataTransfer.getData('sourceStage');
    const sourceCategory = event.dataTransfer.getData('sourceCategory');
    const sourceIndex = parseInt(event.dataTransfer.getData('sourceIndex'), 10);
  
    // Ensure the task is only moved within the same stage
    if (sourceStage !== targetStage) return;
  
    setTaskLog((prev) => {
      const newTaskLog = { ...prev };
  
      // Remove task from source
      const sourceTasks = [...newTaskLog[sourceStage][sourceCategory]];
      const removedTask = sourceTasks.splice(sourceIndex, 1)[0];
      newTaskLog[sourceStage][sourceCategory] = sourceTasks;
  
      // Determine the target index
      const targetTasks = [...newTaskLog[targetStage][targetCategory]];
      let targetIndex = targetTasks.length; // Default to end
  
      const { draggedOverTaskId, insertBefore } = dragInsertion;
  
      if (draggedOverTaskId !== null) {
        const hoveredIndex = targetTasks.indexOf(draggedOverTaskId);
        if (hoveredIndex !== -1) {
          targetIndex = insertBefore ? hoveredIndex : hoveredIndex + 1;
        }
      }
  
      // Adjust logic to handle dragging the first item upwards
      if (sourceIndex === 0 && insertBefore) {
        targetIndex = 0; // Ensure it stays at the top
      }
  
      // Insert task at target index
      targetTasks.splice(targetIndex, 0, removedTask);
      newTaskLog[targetStage][targetCategory] = targetTasks;
  
      return newTaskLog;
    });
  
    // Reset the insertion state
    setDragInsertion({
      draggedOverTaskId: null,
      insertBefore: true,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your To-Dos</h1>
      <div className={styles.stagesContainer}>
        {stages.map((stage) => (
          <Stage
            key={stage}
            stage={stage}
            categories={categories}
            taskLog={taskLog}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            dragInsertion={dragInsertion}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdatedPM;