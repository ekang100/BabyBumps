import React from 'react';
import InfoCard from '../components/InfoCard';

const stages = [
  {
    step: 'STEP 01',
    left: {
      title: 'Plan to make embryos',
      items: ['Consider donor eggs/donor sperm if needed'],
    },
  },
  {
    step: 'STEP 02',
    right: {
      title: 'Genetically test embryos prior to transfer',
      items: ['PGT-P'],
    },
  },
  {
    step: 'STEP 03',
    left: {
      title: 'Prep for surrogacy journey',
      items: ['Information, research, community'],
    },
  },
  {
    step: 'STEP 04',
    right: [
      {
        title: 'Option 1: Agency',
        items: ['Research agencies and find the right fit based on personality and timeline'],
      },
      {
        title: 'Option 2: Independent Journeys',
        items: ['Family/friends, Facebook', 'Find surrogacy consultant'],
      },
    ],
  },
  {
    step: 'STEP 05',
    left: {
      title: 'Make profile to match with surrogate',
      items: ['Focus on your personality, your support system, what you hope your relationship will be like with surrogate'],
    },
  },
];

const ProcessMap = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#faf5e6',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center' }}>Process Map</h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '4px',
          height: 'calc(100% - 40px)', // Adjust to make space for step labels
          backgroundColor: '#ea5b5b',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}></div>
        
        {stages.map((stage, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            margin: '20px 0',
            position: 'relative',
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '20px',
              maxWidth: '300px',
              visibility: stage.left ? 'visible' : 'hidden',
              zIndex: 2,
            }}>
              {stage.left && <InfoCard title={stage.left.title} items={stage.left.items} />}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80px',
              zIndex: 3,
              textAlign: 'center',
              marginTop: '10px', // Add margin for better spacing
            }}>
              <span style={{
                color: '#ea5b5b',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}>{stage.step}</span>
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              gap: '10px',
              paddingLeft: '20px',
              justifyContent: 'flex-start',
              maxWidth: '300px',
              visibility: stage.right ? 'visible' : 'hidden',
              zIndex: 2,
            }}>
              {Array.isArray(stage.right)
                ? stage.right.map((item, i) => (
                    <InfoCard key={i} title={item.title} items={item.items} />
                  ))
                : stage.right && <InfoCard title={stage.right.title} items={stage.right.items} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessMap;
