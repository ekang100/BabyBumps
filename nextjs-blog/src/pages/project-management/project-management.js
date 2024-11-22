import { useState } from 'react';
import styles from './project-management.module.css';

const InsertionIndicator = ({ isActive }) => (
  <div className={`${styles.insertionIndicator} ${isActive ? styles.active : ''}`} />
);

const Task = ({ taskId, stage, category, handleDragStart, handleDragEnd, index }) => {
  return (
    <div
      draggable
      onDragStart={(event) => handleDragStart(event, taskId, stage, category, index)}
      onDragEnd={handleDragEnd}
      className={styles.task}
      data-id={taskId}
    >
      Task {taskId}
    </div>
  );
};

const Category = ({
  stage,
  category,
  taskIds,
  handleDragStart,
  handleDragEnd,
  handleDragOverInsertion,
  handleDrop,
  dragInsertion,
}) => (
  <div
    className={styles.category}
    onDragOver={(event) => event.preventDefault()}
    onDrop={(event) => handleDrop(event, stage, category)}
  >
    <h4 className={styles.categoryTitle}>{category}</h4>
    {taskIds.length === 0 && (
      <div
        className={styles.emptyCategory}
        onDragOver={(event) => handleDragOverInsertion(event, stage, category, 0)}
      >
        <InsertionIndicator
          isActive={
            dragInsertion.isActive &&
            dragInsertion.stage === stage &&
            dragInsertion.category === category &&
            dragInsertion.index === 0
          }
        />
      </div>
    )}
    {taskIds.map((taskId, index) => (
      <div key={taskId} className={styles.taskContainer}>
        <div
          className={styles.insertionArea}
          onDragOver={(event) => handleDragOverInsertion(event, stage, category, index)}
        >
          <InsertionIndicator
            isActive={
              dragInsertion.isActive &&
              dragInsertion.stage === stage &&
              dragInsertion.category === category &&
              dragInsertion.index === index
            }
          />
        </div>
        <Task
          taskId={taskId}
          stage={stage}
          category={category}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          index={index}
        />
      </div>
    ))}
    {taskIds.length > 0 && (
      <div
        className={styles.insertionArea}
        onDragOver={(event) =>
          handleDragOverInsertion(event, stage, category, taskIds.length)
        }
      >
        <InsertionIndicator
          isActive={
            dragInsertion.isActive &&
            dragInsertion.stage === stage &&
            dragInsertion.category === category &&
            dragInsertion.index === taskIds.length
          }
        />
      </div>
    )}
  </div>
);

const Stage = ({
  stage,
  categories,
  taskLog,
  handleDragStart,
  handleDragEnd,
  handleDragOverInsertion,
  handleDrop,
  dragInsertion,
}) => (
  <div className={styles.stage}>
    <h3 className={styles.stageTitle}>{stage}</h3>
    {categories.map((category) => (
      <Category
        key={category}
        stage={stage}
        category={category}
        taskIds={taskLog[stage][category]}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragOverInsertion={handleDragOverInsertion}
        handleDrop={handleDrop}
        dragInsertion={dragInsertion}
      />
    ))}
  </div>
);

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
    isActive: false,
    stage: null,
    category: null,
    index: null,
  });

  const handleDragStart = (event, taskId, sourceStage, sourceCategory, sourceIndex) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('sourceStage', sourceStage);
    event.dataTransfer.setData('sourceCategory', sourceCategory);
    event.dataTransfer.setData('sourceIndex', sourceIndex);
  };

  const handleDragOverInsertion = (event, stage, category, index) => {
    event.preventDefault();
    setDragInsertion({
      isActive: true,
      stage,
      category,
      index,
    });
  };

  const handleDragEnd = () => {
    setDragInsertion({
      isActive: false,
      stage: null,
      category: null,
      index: null,
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
      sourceTasks.splice(sourceIndex, 1);
      newTaskLog[sourceStage][sourceCategory] = sourceTasks;

      // Insert task at target index
      const targetTasks = [...newTaskLog[targetStage][targetCategory]];

      const insertIndex =
        dragInsertion.stage === targetStage &&
        dragInsertion.category === targetCategory &&
        dragInsertion.index !== null
          ? dragInsertion.index
          : targetTasks.length;

      targetTasks.splice(insertIndex, 0, taskId);
      newTaskLog[targetStage][targetCategory] = targetTasks;

      return newTaskLog;
    });

    // Reset the insertion state
    setDragInsertion({
      isActive: false,
      stage: null,
      category: null,
      index: null,
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
            handleDragEnd={handleDragEnd}
            handleDragOverInsertion={handleDragOverInsertion}
            handleDrop={handleDrop}
            dragInsertion={dragInsertion}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdatedPM;