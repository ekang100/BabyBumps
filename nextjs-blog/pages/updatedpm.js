import React, { useState } from 'react';

const stages = ['Stage 1: Contact Surrogate', 'Stage 2: Hospital Meetings']; // Main stages
const categories = ['To Do', 'In Progress', 'Blocked', 'Done']; // Subcategories

const UpdatedPM = () => {
  const [tasks, setTasks] = useState({
    'Stage 1: Contact Surrogate': {
      'To Do': ['Task 1', 'Task 2'],
      'In Progress': ['Task 3'],
      'Blocked': ['Task 4'],
      'Done': ['Task 5']
    },
    'Stage 2: Hospital Meetings': {
      'To Do': ['Task A', 'Task B'],
      'In Progress': ['Task C'],
      'Blocked': ['Task D'],
      'Done': ['Task E']
    }
  });

  const handleDragStart = (event, taskName, stage, category) => {
    event.dataTransfer.setData('taskName', taskName);
    event.dataTransfer.setData('sourceStage', stage);
    event.dataTransfer.setData('sourceCategory', category);
  };

  const handleDrop = (event, targetStage, targetCategory) => {
    const taskName = event.dataTransfer.getData('taskName');
    const sourceStage = event.dataTransfer.getData('sourceStage');
    const sourceCategory = event.dataTransfer.getData('sourceCategory');

    if (sourceStage !== targetStage || sourceCategory !== targetCategory) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        // Remove task from source
        newTasks[sourceStage][sourceCategory] = newTasks[sourceStage][sourceCategory].filter(task => task !== taskName);
        // Add task to target
        newTasks[targetStage][targetCategory] = [...newTasks[targetStage][targetCategory], taskName];
        return newTasks;
      });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Your To-Dos</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {stages.map(stage => (
          <div
            key={stage}
            style={{ flex: 1, border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}
          >
            <h3 style={{ textAlign: 'center' }}>{stage}</h3>
            {categories.map(category => (
              <div
                key={category}
                style={{ minHeight: '100px', padding: '10px', backgroundColor: '#f9f9f9' }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, stage, category)}
              >
                <h4>{category}</h4>
                {tasks[stage][category].map(task => (
                  <div
                    key={task}
                    draggable
                    onDragStart={(event) => handleDragStart(event, task, stage, category)}
                    style={{
                      padding: '8px',
                      marginBottom: '10px',
                      backgroundColor: '#d1ecf1',
                      border: '1px solid #bee5eb',
                      borderRadius: '5px',
                      cursor: 'move'
                    }}
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
}

export default UpdatedPM;
