import React from 'react';

export default function HouseSelection({ onSelectHouse }) {
  const [houses, setHouses] = React.useState([
    { id: 1, name: 'House 1', status: 'online' },
    { id: 2, name: 'House 2', status: 'offline' },
    { id: 3, name: 'House 3', status: 'offline' }
  ]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newHouseName, setNewHouseName] = React.useState('');
  const [hoveredHouse, setHoveredHouse] = React.useState(null);

  const handleAddHouse = () => {
    if (newHouseName.trim()) {
      const newHouse = {
        id: houses.length + 1,
        name: newHouseName.trim(),
        status: 'online'
      };
      setHouses([...houses, newHouse]);
      setNewHouseName('');
      setShowAddModal(false);
    }
  };

  const handleDeleteHouse = (houseId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this house?')) {
      setHouses(houses.filter(house => house.id !== houseId));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '12px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(135deg, #7c5cdb 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Choose your smart home
        </h1>
        
      </div>

      {/* Houses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {houses.map((house) => (
          <div
            key={house.id}
            onClick={() => house.status === 'online' && house.id === 1 && onSelectHouse(house.id)}
            onMouseEnter={() => setHoveredHouse(house.id)}
            onMouseLeave={() => setHoveredHouse(null)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: house.status === 'online' && house.id === 1 ? 'pointer' : 'default',
              opacity: house.status === 'offline' ? 0.5 : 1,
              transition: 'transform 0.2s',
              transform: hoveredHouse === house.id && house.status === 'online' && house.id === 1 ? 'scale(1.05)' : 'scale(1)',
              position: 'relative'
            }}
          >
            {/* Delete Button */}
            {hoveredHouse === house.id && (
              <button
                onClick={(e) => handleDeleteHouse(house.id, e)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(239, 68, 68, 0.95)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#dc2626';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.95)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            )}

            <div style={{ position: 'relative' }}>
              <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* House base */}
                <rect x="80" y="140" width="120" height="100" fill="#7c5cdb" rx="4"/>
                
                {/* Roof */}
                <path d="M 70 140 L 140 80 L 210 140 Z" fill="#6b4dc9"/>
                <path d="M 70 140 L 140 80 L 140 100 L 80 150 Z" fill="#8a6de8" opacity="0.6"/>
                
                {/* Chimney */}
                <rect x="170" y="95" width="20" height="45" fill="#6b4dc9" rx="2"/>
                <rect x="165" y="90" width="30" height="8" fill="#7c5cdb" rx="2"/>
                
                {/* Window */}
                <rect x="120" y="150" width="40" height="35" fill="#5940b0" rx="3"/>
                <line x1="140" y1="150" x2="140" y2="185" stroke="#4a35a0" strokeWidth="3"/>
                <line x1="120" y1="167" x2="160" y2="167" stroke="#4a35a0" strokeWidth="3"/>
                
                {/* Door */}
                <ellipse cx="140" cy="200" rx="25" ry="30" fill="#1a1530"/>
                <rect x="115" y="200" width="50" height="40" fill="#fbbf24"/>
                <circle cx="150" cy="220" r="3" fill="#5940b0"/>
                
                {/* Ground */}
                <rect x="60" y="240" width="160" height="8" fill="#6b4dc9" rx="4"/>
              </svg>
              
              {house.status === 'offline' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(239, 68, 68, 0.95)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  OFFLINE
                </div>
              )}
            </div>
            
            <h2 style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 'bold',
              marginTop: '20px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {house.name}
            </h2>
          </div>
        ))}
        
        {/* Add House Button */}
        <div
          onClick={() => setShowAddModal(true)}
          onMouseEnter={() => setHoveredHouse('add')}
          onMouseLeave={() => setHoveredHouse(null)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            transform: hoveredHouse === 'add' ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <div style={{ position: 'relative' }}>
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* House base */}
              <rect x="80" y="140" width="120" height="100" fill="#7c5cdb" rx="4" opacity="0.4"/>
              
              {/* Roof */}
              <path d="M 70 140 L 140 80 L 210 140 Z" fill="#6b4dc9" opacity="0.4"/>
              
              {/* Chimney */}
              <rect x="170" y="110" width="15" height="30" fill="#6b4dc9" rx="2" opacity="0.4"/>
              
              {/* Window */}
              <rect x="130" y="160" width="20" height="20" fill="#5940b0" rx="2" opacity="0.4"/>
              
              {/* Door */}
              <ellipse cx="140" cy="200" rx="25" ry="30" fill="#1a1530" opacity="0.4"/>
              <rect x="115" y="200" width="50" height="40" fill="#fbbf24" opacity="0.4"/>
              
              {/* Ground */}
              <rect x="60" y="240" width="160" height="8" fill="#6b4dc9" rx="4" opacity="0.4"/>
              
              {/* Plus icon */}
              <circle cx="200" cy="120" r="40" fill="#7c5cdb"/>
              <line x1="200" y1="95" x2="200" y2="145" stroke="white" strokeWidth="7" strokeLinecap="round"/>
              <line x1="175" y1="120" x2="225" y2="120" stroke="white" strokeWidth="7" strokeLinecap="round"/>
            </svg>
          </div>
          
          <h2 style={{
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            marginTop: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Add House
          </h2>
        </div>
      </div>

      {/* Add House Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => {
          setShowAddModal(false);
          setNewHouseName('');
        }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%)',
            padding: '40px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(124, 92, 219, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '24px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Add New House
            </h2>
            
            <input
              type="text"
              value={newHouseName}
              onChange={(e) => setNewHouseName(e.target.value)}
              placeholder="Enter house name..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddHouse()}
              autoFocus
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '2px solid #7c5cdb',
                background: '#0a0e27',
                color: 'white',
                marginBottom: '24px',
                outline: 'none',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#a78bfa'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#7c5cdb'}
            />
            
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewHouseName('');
                }}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: '2px solid #7c5cdb',
                  background: 'transparent',
                  color: '#7c5cdb',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#7c5cdb';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#7c5cdb';
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={handleAddHouse}
                disabled={!newHouseName.trim()}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  background: newHouseName.trim() ? '#7c5cdb' : '#4a4a6a',
                  color: 'white',
                  cursor: newHouseName.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (newHouseName.trim()) {
                    e.currentTarget.style.background = '#6b4dc9';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (newHouseName.trim()) {
                    e.currentTarget.style.background = '#7c5cdb';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                Add House
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}