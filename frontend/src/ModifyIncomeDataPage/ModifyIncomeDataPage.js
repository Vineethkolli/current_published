import './ModifyIncomeDataPage.css';
import { useState } from "react";

function ModifyIncomeDataPage() {
    const [name, setName] = useState('');
    const [incomeData, setIncomeData] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success messages

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!name) {
            setError('Name is required');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3820/incomeData/${name}`);
            const data = await response.json();
            if (data) {
                setIncomeData(data);
                setError('');
                setSuccessMessage(''); // Clear success message when searching
            } else {
                setError('No data found for this name');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncomeData({ ...incomeData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!incomeData) return;

        try {
            const response = await fetch(`http://localhost:3820/updateIncomeData`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(incomeData),
            });

            if (response.ok) {
                setSuccessMessage('Income data updated successfully'); // Success message on update
                setError(''); // Clear error message on success
            } else {
                setError('Failed to update income data'); // Error message on failure
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3820/deleteIncomeData/${incomeData._id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setIncomeData(null);
                setName('');
                setError('');
                setSuccessMessage('Income data deleted successfully'); // Success message on delete
            } else {
                setError('Failed to delete income data'); // Error message on failure
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while deleting');
        }
    };

    const handleNoModifications = () => {
        setIncomeData(null);
        setSuccessMessage('No modifications made'); // Success message on no modifications
        setError(''); // Clear error message
    };

    return (
        <div className='modify-income-data-container'>
            <h1>Modify Income Data</h1>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                <button type='submit'>Search</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Success message display */}
            {incomeData && (
                <form onSubmit={handleUpdate}>
                    <input type='text' name='name' value={incomeData.name} onChange={handleChange} />
                    <input type='number' name='amount' value={incomeData.amount} onChange={handleChange} />
                    <select name='status' value={incomeData.status} onChange={handleChange}>
                        <option value='paid'>Paid</option>
                        <option value='not paid'>Not Paid</option>
                    </select>
                    <select name='paymentMode' value={incomeData.paymentMode} onChange={handleChange}>
                        <option value='cash'>Cash</option>
                        <option value='upi'>UPI</option>
                        <option value='app'>App</option>
                    </select>
                    <select name='belongsTo' value={incomeData.belongsTo} onChange={handleChange}>
                        <option value='youth'>Youth</option>
                        <option value='villagers'>Villagers</option>
                    </select>
                    <button type='submit'>Update</button>
                    <button type='button' onClick={handleDelete}>Delete</button>
                    <button type='button' onClick={handleNoModifications}>No Modifications</button>
                </form>
            )}
        </div>
    );
}

export default ModifyIncomeDataPage;
