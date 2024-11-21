import { useState } from 'react';
import styles from './project-management.module.css';

const UpdatedPM = () => {
  const stages = ['Planning', 'In Progress', 'Review', 'Complete'];
  const categories = ['Medical', 'Legal', 'Personal'];
  
  const [tasks, setTasks] = useState({
    'Planning': {
      'Medical': ['Schedule initial consultation', 'Complete health screening'],
      'Legal': ['Review surrogacy laws', 'Prepare initial documentation'],
      'Personal': ['Set timeline goals', 'Create support network']
    },
    'In Progress': {
      'Medical': [],
      'Legal': [],
      'Personal': []
    },
    'Review': {
      'Medical': [],
      'Legal': [],
      'Personal': []
    },
    'Complete': {
      'Medical': [],
      'Legal': [],
      'Personal': []
    }
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

    if (sourceStage === targetStage && sourceCategory === targetCategory) return;

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
          <div key={stage} className={styles.stage}>
            <h3 className={styles.stageTitle}>{stage}</h3>
            {categories.map(category => (
              <div
                key={category}
                className={styles.category}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, stage, category)}
              >
                <h4 className={styles.categoryTitle}>{category}</h4>
                {tasks[stage][category].map(task => (
                  <div
                    key={task}
                    draggable
                    onDragStart={(event) => handleDragStart(event, task, stage, category)}
                    className={styles.task}
                  >
                    {task}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatedPM;