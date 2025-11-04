import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeHealthCheckScheduleServices = () => {
  const [name, setName] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [address, setAddress] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [contact, setContact] = useState('+91');
  const [extraInfo, setExtraInfo] = useState('');
  const [serviceFrequency, setServiceFrequency] = useState('Monthly Check-up');
  const [estimate, setEstimate] = useState(2500);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const costs = { 
      'Monthly Check-up': 2500, 
      'Quarterly Check-up': 2000, 
      'One-time Visit': 3000 
    };
    setEstimate(costs[serviceFrequency] || 2500);
  }, [serviceFrequency]);

  const valid =
    name.trim() &&
    registeredEmail.trim() &&
    address.trim() &&
    serviceFrequency &&
    fromDate &&
    toDate &&
    contact.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/services/scheduled', {
        serviceType: 'Home Health Check',
        name,
        registeredEmail,
        address,
        fromDate,
        toDate,
        contact,
        extraInfo,
        estimatedCost: estimate,
        serviceFrequency
      });

      console.log('Service scheduled:', response.data);
      setSuccess(true);
      
      setTimeout(() => {
        setName('');
        setRegisteredEmail('');
        setAddress('');
        setFromDate('');
        setToDate('');
        setContact('+91');
        setExtraInfo('');
        setServiceFrequency('Monthly Check-up');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error scheduling service:', err);
      setError(err.response?.data?.message || 'Failed to schedule service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 460,
        margin: '48px auto',
        padding: '28px 25px 22px 25px',
        borderRadius: 14,
        background: '#fff',
        boxShadow: '0 6px 24px rgba(60,80,180,0.13)',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <h2
        style={{
          color: '#2348c1',
          marginBottom: 18,
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: 1,
        }}
      >
        Home Health Check Schedule Services
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Services Category
          </label>
          <select
            disabled
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              background: '#f5f7fa',
              width: '100%',
              color: '#5d5d72',
              border: '1px solid #d6deeb',
            }}
          >
            <option>Home Health Check Services</option>
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Registered Email/Username
          </label>
          <input
            type="text"
            required
            value={registeredEmail}
            onChange={e => setRegisteredEmail(e.target.value)}
            placeholder="Enter registered email/username"
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Address
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Type address"
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label
              style={{ fontWeight: 500, fontSize: 15, display: 'block' }}
            >
              From Date
            </label>
            <input
              type="date"
              required
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              style={{
                padding: '8px',
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: '1px solid #d6deeb',
                width: '100%',
                background: '#f7f8fa',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{ fontWeight: 500, fontSize: 15, display: 'block' }}
            >
              To Date
            </label>
            <input
              type="date"
              required
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              style={{
                padding: '8px',
                marginTop: 4,
                borderRadius: 8,
                fontSize: 15,
                border: '1px solid #d6deeb',
                width: '100%',
                background: '#f7f8fa',
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Contact Number
          </label>
          <input
            type="tel"
            required
            value={contact}
            minLength={10}
            onChange={e => setContact(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Extra Information
          </label>
          <textarea
            value={extraInfo}
            onChange={e => setExtraInfo(e.target.value)}
            placeholder="Health concerns or special requirements (optional)"
            rows={3}
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
              resize: 'vertical',
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500, display: 'block', fontSize: 15 }}>
            Service Frequency
          </label>
          <select
            required
            value={serviceFrequency}
            onChange={e => setServiceFrequency(e.target.value)}
            style={{
              padding: '10px',
              marginTop: 4,
              borderRadius: 8,
              fontSize: 15,
              border: '1px solid #d6deeb',
              width: '100%',
              background: '#f7f8fa',
            }}
          >
            <option value="Monthly Check-up">Monthly Check-up - ₹2500</option>
            <option value="Quarterly Check-up">Quarterly Check-up - ₹2000</option>
            <option value="One-time Visit">One-time Visit - ₹3000</option>
          </select>
        </div>
        <div
          style={{
            margin: '22px 0 28px 0',
            fontWeight: 700,
            fontSize: 18,
            color: '#2348c1',
            background: '#f5f8fe',
            borderRadius: 7,
            padding: '12px 0',
            textAlign: 'center',
            boxShadow: '0 1px 8px rgba(80,120,200,0.09)',
          }}
        >
          Estimated Cost: ₹{estimate}
        </div>

        {error && (
          <div
            style={{
              marginBottom: 15,
              color: '#d32f2f',
              textAlign: 'center',
              fontWeight: 500,
              background: '#ffebee',
              padding: '10px',
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!valid || loading}
          style={{
            padding: '11px 33px',
            borderRadius: 9,
            background: valid && !loading ? '#2348c1' : '#d4dbee',
            color: valid && !loading ? 'white' : '#7c87a1',
            fontWeight: 600,
            fontSize: 17,
            border: 'none',
            cursor: valid && !loading ? 'pointer' : 'not-allowed',
            margin: '0 auto',
            display: 'block',
          }}
        >
          {loading ? 'Scheduling...' : 'Schedule Now'}
        </button>
        {success && (
          <div
            style={{
              marginTop: 15,
              color: '#118800',
              textAlign: 'center',
              fontWeight: 500,
              background: '#e8f5e9',
              padding: '10px',
              borderRadius: 8,
            }}
          >
            ✅ Service scheduled successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default HomeHealthCheckScheduleServices;