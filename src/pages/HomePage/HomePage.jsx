import React from 'react';

// img
import logo from '../../assets/images/logo.svg';

// component
import CalculatorInput from "../../components/CalculatorInput";
import CalculatorOutput from "../../components/CalculatorOutput";
import calculatorApi from "../../api/calculatorApi";

const HomePage = ()=>{
  const [data, setData] = React.useState({
    bill: 0,
    tip: 0,
    personCount: 0,

    isCustomAvailable: false
  });

  const [error, setError] = React.useState({
    billErr: false,
    tipErr: false,
    personCountErr: false,

    billErrText: '',
    tipErrText: '',
    personCountErrText: '',
  });

  const [result, setResult] = React.useState({
    amount: '00.00',
    total: '00.00',
    isFetching: false,
  });

  const isValidateTrue = ()=>{

    if (data.bill === 0 || data.bill==='0'
      || data.personCount === 0
      || data.personCount=== '0'
    ){
      setError({
        ...error,
        billErr: (data.bill === 0 || data.bill==='0' || data.bill < 0),
        billErrText:
          (data.bill === 0 || data.bill==='0') ? 'Bill must be add' : 'Bill must be greater than 0',

        personCountErr: (data.personCount === 0 || data.personCount==='0' || data.personCount < 0),
        personCountErrText:
          (data.personCount === 0 || data.personCount==='0') ?
            'Number of person must be add' : 'Number of person must be greater than 0',
      });
      return false;
    }
    setError({
      billErr: false,
      tipErr: false,
      personCountErr: false,

      billErrText: '',
      tipErrText: '',
      personCountErrText: '',
    });
    return true;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('onsubmit');

    if(isValidateTrue()){
      setResult({
        ...result,
        amount: '--.--',
        total: '--.--',
        isFetching: true,
      })
      calculatorApi.get(data.bill, data.tip, data.personCount
        ).then(({result, total, amount})=>{
          console.log(result, total, amount)
          setResult({
            ...result,
            amount: amount.toFixed(2).toString(),
            total: total.toFixed(2).toString(),
            isFetching: false,
          })
        }).catch(()=>{
          setResult({
            ...result,
            isFetching: false,
          })
        });
    }
  }

  const handleReset = ()=>{
    setData({
      bill: 0,
      tip: 0,
      personCount: 0,

      isCustomAvailable: false
    })
    setError({
      billErr: false,
      tipErr: false,
      personCountErr: false,

      billErrText: '',
      tipErrText: '',
      personCountErrText: '',
    });
    setResult({
      amount: '00.00',
      total: '00.00',
      isFetching: false,
    })
  }

  const handleChange = (e, isCustom)=>{
    e.target.name === 'bill' && setData({
      ...data,
      bill: parseFloat(e.target.value)
    });
    e.target.name === 'personCount' && setData({
      ...data,
      personCount: parseFloat(e.target.value)
    });
    (data.tip!==e.target.value && e.target.name === 'tipPercent')
    && setData(rev =>({
      ...data,
      tip:e.target.value ? parseFloat(e.target.value) : 0,
      isCustomAvailable: isCustom || rev.isCustomAvailable,
    }));
  }

  const handleFocus = (e)=>{
    (e.target.name==='bill' && e.target.value ==='0') &&
      setData({
        ...data,
        bill: ''
      });
    (e.target.name==='tipPercent' && e.target.value ==='0') &&
    setData({
      ...data,
      tip: ''
    });
    (e.target.name==='personCount' && e.target.value ==='0') &&
    setData({
      ...data,
      personCount: ''
    })
  }

  const handleBlur = (e)=>{
    (e.target.name==='bill' && e.target.value ==='') &&
    setData({
      ...data,
      bill: 0
    });
    (e.target.name==='personCount' && e.target.value ==='') &&
    setData({
      ...data,
      personCount: 0
    })
  }


  const handleCustomAvailable = (isAvailable)=>{
    if(data.isCustomAvailable===isAvailable) return;
    setData({
      ...data,
      isCustomAvailable: isAvailable
    });
  }

  return(
    <div className='homePage'>
      <section className="main__container">
        {/*logo*/}
        <img src={logo} alt="logo" />
          {/*<!--      main*/}
          <div id="form-submit" className="calculator">
            {/*content left*/}
            <CalculatorInput handleChange={handleChange}
                             data={data} error={error}
                             handleFocus={handleFocus}
                             handleBlur={handleBlur}
                             handleCustomAvailable={handleCustomAvailable}/>

            {/*content right*/}
            <CalculatorOutput handleSubmit={handleSubmit}
                              handleReset={handleReset}
                              data={data} result={result}/>
          </div>
      </section>
    </div>
  );
}

export default HomePage;
