import React from 'react';
import InfoCard from '../../components/InfoCard';
import styles from './process-map.module.css';

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
    <div>
      <h1 className={styles.title}>Process Map</h1>
      <div className={styles.container}>
        {stages.map((stage, index) => (
          <div key={index} className={styles.stage}>
            <div className={`${styles.side} ${styles.left}`}>
              {stage.left && <InfoCard title={stage.left.title} items={stage.left.items} />}
            </div>
            <div className={styles.stepContainer}>
              <span className={styles.step}>{stage.step}</span>
              <div className={styles.connector}></div>
            </div>
            <div className={`${styles.side} ${styles.right}`}>
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