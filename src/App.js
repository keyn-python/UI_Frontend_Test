import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    Study_Hours_per_Week: '',
    Sleep_Hours_per_Night: '',
    Attendance: '',
    Participation_Score: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "Study_Hours_per_Week": parseFloat(form.Study_Hours_per_Week),
      "Sleep_Hours_per_Night": parseFloat(form.Sleep_Hours_per_Night),
      "Attendance (%)": parseFloat(form.Attendance),
      "Participation_Score": parseFloat(form.Participation_Score)
    };

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResult(data.Result);
    } catch (err) {
      console.error(err);
      setResult("Error connecting to server.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Grade Predictor</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <InputField
          label="📘 Study Hours per Week"
          name="Study_Hours_per_Week"
          value={form.Study_Hours_per_Week}
          handleChange={handleChange}
        />
        <InputField
          label="🌙 Sleep Hours per Night"
          name="Sleep_Hours_per_Night"
          value={form.Sleep_Hours_per_Night}
          handleChange={handleChange}
        />
        <InputField
          label="📅 Attendance (%)"
          name="Attendance"
          value={form.Attendance}
          handleChange={handleChange}
        />
        <InputField
          label="🏅 Participation Score"
          name="Participation_Score"
          value={form.Participation_Score}
          handleChange={handleChange}
        />
        <button type="submit" style={styles.button}>Predict</button>
      </form>

      {result && (
        <div style={styles.resultBox}>
          <span style={{ fontWeight: 'bold' }}>Result:</span> {result === "Pass" ? "✅ Pass" : "❌ Fail"}
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, name, value, handleChange }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={handleChange}
      style={styles.input}
      required
    />
  </div>
);

const styles = {
  container: {
    maxWidth: '500px',
    margin: '3rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#f4f6f8',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.3rem',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    marginTop: '1rem',
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  resultBox: {
    marginTop: '1.5rem',
    fontSize: '1.25rem',
    textAlign: 'center'
  }
};

export default App;
