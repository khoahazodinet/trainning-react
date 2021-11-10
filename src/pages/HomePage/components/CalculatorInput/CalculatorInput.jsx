import React from 'react';
import dollar from "../../../../assets/images/icon-dollar.svg";
import person from "../../../../assets/images/icon-person.svg";

const CalculatorInput = (props)=>{
  const {handleChange,
    data, error,
    handleFocus,
    handleBlur,
    handleCustomAvailable} = props;

  const tipSelection = [
    {
      name: '5%',
      value: 5
    },
    {
      name: '10%',
      value: 10
    },
    {
      name: '15%',
      value: 15
    },
    {
      name: '25%',
      value: 25
    },
    {
      name: '50%',
      value: 50
    },
  ];

  return(
    <div className="content content-left">
      <div className="bill">
        <label htmlFor="billInput">Bill</label>
        &nbsp;&nbsp;
        <span className="error" id="bill-error" >
          {error.billErr && error.billErrText}
        </span>
        <div className="bill__input">
          <img src={dollar} alt="dollar-icon"/>
          <input type="number" id="billInput"
                 onChange={handleChange}
                 onFocus={handleFocus}
                 onBlur={handleBlur}
                 value={data.bill} name="bill" step="0.01"/>
        </div>
      </div>
      <div className="tip">
        <label>
          Select Tip %
          <span className="error" id="tip-error" />
        </label>
        <div className="items">
          {tipSelection.map((item, key)=>(
            <div className="item" key={key}>
              <label className="container__input">
                <input type="radio" name="tip" onChange={handleChange} value={item.value} />
                <span className={`checkmark ${
                  (data.tip === item.value && data.isCustomAvailable === false) 
                    && 'isChecked'
                }`}
                  onClick={()=>handleCustomAvailable(false)}
                >{item.name}</span>
              </label>
            </div>
          ))}

          <div className='item' onClick={()=>handleCustomAvailable(true)}>
            {data.isCustomAvailable ?
              (<input
                  rel={'input'} value={data.tip}
                  autoFocus={data.isCustomAvailable}
                  onFocus={handleFocus} onBlur={handleBlur}
                  type='number' className='inputCustom' name='tip'
                      onChange={(e)=>handleChange(e, true)}/>) :
              (<div className="custom">
                Custom
              </div>)
            }
          </div>
        </div>
      </div>
      <div className="count__number">
        <label htmlFor="count-number">
          Number of People &nbsp;&nbsp;
          <span className="error" id="person-count-error" >
            {error.personCountErr && error.personCountErrText}
          </span>
        </label>
        <div className="count__number__input">
          <img src={person} alt="person-icon"/>
          <input id="count-number" type="number"
                 onChange={handleChange}
                 onFocus={handleFocus}
                 onBlur={handleBlur}
                 value={data.personCount} name="personCount" step="0.01"/>
        </div>
      </div>
    </div>
  );
}

export default CalculatorInput;