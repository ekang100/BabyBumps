import { useState } from 'react';
import styles from './project-management.module.css';

const Stage = ({ stage, categories, tasks, handleDragStart, handleDrop }) => (
  <div className={styles.stage}>
    <h3 className={styles.stageTitle}>{stage}</h3>
    {categories.map(category => (
      <Category
        key={category}
        stage={stage}
        category={category}
        tasks={tasks[stage][category]}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    ))}
  </div>
);

const Category = ({ stage, category, tasks, handleDragStart, handleDrop }) => (
  <div
    className={styles.category}
    onDragOver={(event) => event.preventDefault()}
    onDrop={(event) => handleDrop(event, stage, category)}
  >
    <h4 className={styles.categoryTitle}>{category}</h4>
    {tasks.map(task => (
      <Task
        key={task}
        task={task}
        stage={stage}
        category={category}
        handleDragStart={handleDragStart}
      />
    ))}
  </div>
);

const Task = ({ task, stage, category, handleDragStart }) => (
  <div
    draggable
    onDragStart={(event) => handleDragStart(event, task, stage, category)}
    className={styles.task}
  >
    {task}
  </div>
);

const UpdatedPM = () => {
  const stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
  const categories = ['To Do', 'In Progress', 'Done'];

  const [tasks, setTasks] = useState({
    'Stage 1': { 'To Do': ['Task 1', 'Task 2', "Task 3"], 'In Progress': [], 'Done': [] },
    'Stage 2': { 'To Do': ['Task 4', 'Task 5', "Task 6"], 'In Progress': [], 'Done': [] },
    'Stage 3': { 'To Do': ['Task 7', 'Task 8', "Task 9"], 'In Progress': [], 'Done': [] },
    'Stage 4': { 'To Do': ['Task 10', 'Task 11', "Task 12"], 'In Progress': [], 'Done': [] },
  });

  const handleDragStart = (event, task, sourceStage, sourceCategory) => {
    event.dataTransfer.setData('task', task);
    event.dataTransfer.setData('sourceStage', sourceStage);
    event.dataTransfer.setData('sourceCategory', sourceCategory);
  };

  const handleDrop = (event, targetStage, targetCategory) => {
    event.preventDefault();
    const task = event.dataTransfer.getData('task');
    const sourceStage = event.dataTransfer.getData('sourceStage');
    const sourceCategory = event.dataTransfer.getData('sourceCategory');
  
    // Ensure the task is only moved within the same stage
    if (sourceStage !== targetStage) return;
  
    if (sourceCategory === targetCategory) return;
  
    setTasks(prev => {
      const newTasks = { ...prev };
      newTasks[sourceStage][sourceCategory] = newTasks[sourceStage][sourceCategory].filter(t => t !== task);
      newTasks[targetStage][targetCategory] = [...newTasks[targetStage][targetCategory], task];
      return newTasks;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your To-Dos</h1>
      <div className={styles.stagesContainer}>
        {stages.map(stage => (
          <Stage
            key={stage}
            stage={stage}
            categories={categories}
            tasks={tasks}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdatedPM;