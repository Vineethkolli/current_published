import './IncomeEntryPage.css';
import { useState } from "react";

function IncomeEntryPage() {
    const [incomeData, setIncomeData] = useState({
        name: '',
        amount: '',
        status: '',
        paymentMode: '',
        belongsTo: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncomeData({ ...incomeData, [name]: value });
        setError('');
        setSuccessMessage(''); // Clear success message when user modifies any field
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!incomeData.name || !incomeData.amount || !incomeData.status || !incomeData.paymentMode || !incomeData.belongsTo) {
            setError('All fields are required');
            return;
        }

        console.log(incomeData);
        
        try {
            const response = await fetch("http://localhost:3820/incomeEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(incomeData),
            });

            if (response.ok) {
                setSuccessMessage('Income data added successfully');
                setError(''); // Clear error message upon successful submission
                setIncomeData({ // Reset the form fields after successful submission
                    name: '',
                    amount: '',
                    status: '',
                    paymentMode: '',
                    belongsTo: ''
                });
            } else {
                setError('Failed to add income data');
            }

        } catch (error) {
            setError('An error occurred while submitting the form');
            console.log(error);
        }
    };

    return (
        <div className='income-entry-container'>
            <h1>Income Entry</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={incomeData.name} type='text' placeholder='Name' name='name' required />
                <input onChange={handleChange} value={incomeData.amount} type='number' placeholder='Amount' name='amount' required />
                <select name='status' onChange={handleChange} value={incomeData.status} required>
                    <option value=''>Select Status</option>
                    <option value='paid'>Paid</option>
                    <option value='not paid'>Not Paid</option>
                </select>
                <select name='paymentMode' onChange={handleChange} value={incomeData.paymentMode} required>
                    <option value=''>Select Payment Mode</option>
                    <option value='cash'>Cash</option>
                    <option value='upi'>UPI</option>
                    <option value='app'>App</option>
                </select>
                <select name='belongsTo' onChange={handleChange} value={incomeData.belongsTo} required>
                    <option value=''>Select Belongs To</option>
                    <option value='youth'>Youth</option>
                    <option value='villagers'>Villagers</option>
                </select>
                {error && <p style={{color: "red"}}>{error}</p>}
                {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default IncomeEntryPage;
