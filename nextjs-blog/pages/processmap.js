import React, { useState } from 'react';
import InfoCard from '../components/InfoCard';
import Image from 'next/image';
import Link from 'next/link';

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
  const [popupContent, setPopupContent] = useState(null);
  const [inputText, setInputText] = useState(''); 

  const openPopup = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
    setInputText(''); 
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Submitted: ${inputText}`); // Just for testing, alert the text
    setInputText(''); 
  };

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
      
      {/* Header Section */}
      <header style={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        boxSizing: 'border-box',
      }}>
        <div style={{ flex: 1 }}>
          <Image src="/logo.png" alt="Baby Bumps Logo" width={150} height={50} />
        </div>
        <nav style={{
          display: 'flex',
          gap: '20px',
        }}>
          <Link href="/about">About Us</Link>
          <Link href="/surrogates">Find a Surrogate</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/processmap">Process Map</Link>
        </nav>
      </header>

      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Process Map</h1> 

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
          height: 'calc(100% - 40px)',
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
              {stage.left && 
                <div>
                  <InfoCard title={stage.left.title} items={stage.left.items} />
                  <button onClick={() => openPopup({ title: stage.left.title, items: stage.left.items })}>Click To Edit!</button>
                </div>}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80px',
              zIndex: 3,
              textAlign: 'center',
              marginTop: '10px',
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
                    <div key={i}>
                      <InfoCard title={item.title} items={item.items} />
                      <button onClick={() => openPopup({ title: item.title, items: item.items })}>Click To Edit!</button>
                    </div>
                  ))
                : stage.right && 
                  <div>
                    <InfoCard title={stage.right.title} items={stage.right.items} />
                    <button onClick={() => openPopup({ title: stage.right.title, items: stage.right.items })}>Click To Edit!</button>
                  </div>}
            </div>
          </div>
        ))}
      </div>

      {popupContent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
        }} onClick={closePopup}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: 'white',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            position: 'relative',
          }}>
            <button onClick={closePopup} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '5px 10px',
              backgroundColor: '#ea5b5b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>Close</button>
            <h2>{popupContent.title}</h2>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '10px',
              }}
            />
            <button onClick={handleSubmit} style={{
              padding: '8px 15px',
              backgroundColor: '#ea5b5b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessMap;
