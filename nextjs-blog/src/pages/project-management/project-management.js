import { useState, useEffect } from 'react';
import styles from './project-management.module.css';
import Task from './Task';
import taskData from './taskData';

const InsertionIndicator = ({ isActive }) => (
  <div className={`${styles.insertionIndicator} ${isActive ? styles.active : ''}`} />
);

const Category = ({
  stage,
  category,
  taskIds,
  handleDragStart,
  handleDragEnd,
  handleDragOverInsertion,
  handleDrop,
  dragInsertion,
  tasks,
  updateTaskNotes,
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
          title={tasks[taskId].title}
          description={tasks[taskId].description}
          notes={tasks[taskId].notes}
          updateTaskNotes={updateTaskNotes}
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
  tasks,
  updateTaskNotes,
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
        tasks={tasks}
        updateTaskNotes={updateTaskNotes}
      />
    ))}
  </div>
);

const UpdatedPM = () => {
  const stages = [
    'Embryo Creation',
    'Agency & Legal',
    'Matching Process',
    'Medical Journey',
  ];
  const categories = ['To Do', 'In Progress', 'Done'];

  // Initialize tasks and taskLog with default values
  const [tasks, setTasks] = useState(taskData);
  const [taskLog, setTaskLog] = useState({
    'Embryo Creation': { 'To Do': [1, 2, 3], 'In Progress': [], 'Done': [] },
    'Agency & Legal': { 'To Do': [4, 5, 6], 'In Progress': [], 'Done': [] },
    'Matching Process': { 'To Do': [7, 8, 9], 'In Progress': [], 'Done': [] },
    'Medical Journey': { 'To Do': [10, 11, 12], 'In Progress': [], 'Done': [] },
  });

  // State to check if component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // State for drag and drop
  const [dragInsertion, setDragInsertion] = useState({
    isActive: false,
    stage: null,
    category: null,
    index: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      const savedTaskLog = localStorage.getItem('taskLog');

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }

      if (savedTaskLog) {
        setTaskLog(JSON.parse(savedTaskLog));
      }

      setHasMounted(true);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasMounted]);

  // Save taskLog to localStorage whenever taskLog changes
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('taskLog', JSON.stringify(taskLog));
    }
  }, [taskLog, hasMounted]);

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

      let insertIndex =
        dragInsertion.stage === targetStage &&
        dragInsertion.category === targetCategory &&
        dragInsertion.index !== null
          ? dragInsertion.index
          : targetTasks.length;

      // Adjust insertIndex if the task is moved to a higher index in the same category
      if (
        sourceStage === targetStage &&
        sourceCategory === targetCategory &&
        sourceIndex < insertIndex
      ) {
        insertIndex -= 1;
      }

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

  // Function to update task notes
  const updateTaskNotes = async (taskId, notes) => {
    setIsLoading(true);
    setError(null);
    try {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [taskId]: {
          ...prevTasks[taskId],
          notes,
        },
      }));
    } catch (err) {
      setError('Failed to update notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Render null or loading while waiting for component to mount
  if (!hasMounted) {
    return null; // Or a loading spinner/component if preferred
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Surrogacy Journey Planner</h1>
      {isLoading && <div className={styles.loading}>Updating...</div>}
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
            tasks={tasks}
            updateTaskNotes={updateTaskNotes}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdatedPM;