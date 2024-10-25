import React, { useState } from 'react';
import './CollectionPage.css';
import IncomeEntryPage from '../IncomeEntryPage/IncomeEntryPage'; // Ensure the path is correct
import ModifyIncomeDataPage from '../ModifyIncomeDataPage/ModifyIncomeDataPage'; // Ensure the path is correct

function CollectionPage() {
  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  const [showExpensesOptions, setShowExpensesOptions] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showModifyForm, setShowModifyForm] = useState(false); // New state for modify form

  return (
    <div className="collection-page">
      <h1>Collection</h1>
      <div className="button-group">
        <div>
          <button
            onClick={() => {
              setShowIncomeOptions(!showIncomeOptions);
              setShowExpensesOptions(false); // Close expenses options when income options are clicked
              setShowIncomeForm(false); // Hide form if switching between options
              setShowModifyForm(false); // Hide modify form if switching between options
            }}
          >
            Income Entry
          </button>
          {showIncomeOptions && (
            <div className="options">
              <button
                onClick={() => {
                  setShowIncomeForm(true);
                  setShowModifyForm(false); // Ensure modify form is hidden when new entry is clicked
                }}
              >
                New Entry
              </button>
              <button
                onClick={() => {
                  setShowModifyForm(true);
                  setShowIncomeForm(false); // Ensure income form is hidden when modify entry is clicked
                }}
              >
                Modify Entry
              </button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              setShowExpensesOptions(!showExpensesOptions);
              setShowIncomeOptions(false); // Close income options when expenses options are clicked
              setShowIncomeForm(false); // Hide forms if switching between options
              setShowModifyForm(false); // Hide forms if switching between options
            }}
          >
            Expenses Entry
          </button>
          {showExpensesOptions && (
            <div className="options">
              <button>New Expense</button>
              <button>Modify Expense</button>
            </div>
          )}
        </div>
      </div>

      {/* Render the IncomeEntryPage form if 'New Entry' is clicked */}
      {showIncomeForm && (
        <div className="income-form-container">
          <IncomeEntryPage />
        </div>
      )}

      {/* Render the ModifyIncomeDataPage form if 'Modify Entry' is clicked */}
      {showModifyForm && (
        <div className="modify-form-container">
          <ModifyIncomeDataPage />
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
