import React, { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; 

const stages = ['To Do', 'In Progress', 'Blocked', 'Done'];

function UpdatedPM() {
  const [tasks, setTasks] = useState({
    'To Do': ['Task 1', 'Task 2'],
    'In Progress': ['Task 3'],
    'Blocked': ['Task 4'],
    'Done': ['Task 5']
  });

  // Handle drag start
  const handleDragStart = (event, taskName, stage) => {
    event.dataTransfer.setData('taskName', taskName);
    event.dataTransfer.setData('sourceStage', stage);
  };

  // Handle drop
  const handleDrop = (event, targetStage) => {
    const taskName = event.dataTransfer.getData('taskName');
    const sourceStage = event.dataTransfer.getData('sourceStage');

    if (sourceStage !== targetStage) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        // Remove the task from the source stage
        newTasks[sourceStage] = newTasks[sourceStage].filter(task => task !== taskName);
        // Add the task to the target stage
        newTasks[targetStage] = [...newTasks[targetStage], taskName];
        return newTasks;
      });
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header style={{
        width: '100%', 
        backgroundColor: '#fff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
          <Image src="/logo.png" alt="Baby Bumps Logo" width={150} height={50} />
        </div>
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '10px 0'
        }}>
          <Link href="/about">About Us</Link>
          <Link href="/surrogates">Find a Surrogate</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/processmap">Process Map</Link>
          <Link href="/updatedpm">To Do!</Link>
        </nav>
      </header>
      
      <h1 style={{ textAlign: 'center' }}>Your To-Dos</h1>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {stages.map(stage => (
          <div
            key={stage}
            style={{ flex: 1, border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, stage)}
          >
            <h3 style={{ textAlign: 'center' }}>{stage}</h3>
            <div style={{ minHeight: '100px', padding: '10px', backgroundColor: '#f9f9f9' }}>
              {tasks[stage].map(task => (
                <div
                  key={task}
                  draggable
                  onDragStart={(event) => handleDragStart(event, task, stage)}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdatedPM;
