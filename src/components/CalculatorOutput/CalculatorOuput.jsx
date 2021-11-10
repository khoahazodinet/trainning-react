import React from 'react';

const CalculatorOutput = (props)=>{
  const {
    handleSubmit,
    data,
    result,
    handleReset
  } = props

  return(
    <div className="content content-right">
      <div className="contentBox">
        <div className="item tip-amount">
          <div className="label">
            <h1>
              Tip Amount
            </h1>
            <span>
                  / person
                </span>
          </div>
          <div className="result">
            <h2 id="amount-result">
              {result.amount}
            </h2>
          </div>
        </div>
        <div className="item total">
          <div className="label">
            <h1>
              Total
            </h1>
            <span>
                  / person
                </span>
          </div>
          <div className="result">
            <h2 id="total-result">
              {result.total}
            </h2>
          </div>
        </div>
      </div>
      <div className="button-footer">
        <button
          disabled={result.isFetching}
          className={result.isFetching ? 'btn-disabled' : ''}
          onClick={handleSubmit}
          id="submit-button">SUBMIT
        </button>
        <button
          disabled={
            (result.isFetching
            )
          }
          className={`reset 
            ${
            ( result.isFetching
              || (
                (data.bill === 0 || data.bill ==='0' || data.bill === '') &&
                (data.personCount===0 || data.personCount==='0' || data.personCount==='')
              )
            )
              && 'btn-disabled'
            }`
          }
          onClick={handleReset} type="button">RESET
        </button>
      </div>
    </div>
  );
}

export default CalculatorOutput;