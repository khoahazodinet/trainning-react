import React from 'react';

// img
import logo from '../../assets/images/logo.svg';

// component
import CalculatorInput from "./components/CalculatorInput";
import CalculatorOutput from "./components/CalculatorOutput";
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
    fetchResponseErr: false,

    billErrText: '',
    tipErrText: '',
    personCountErrText: '',
    fetchResponseErrText: ''
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
        billErr: (
          data.bill === 0 ||
          data.bill ==='0' ||
          data.bill < 0
        ),
        billErrText: (
          data.bill === 0 ||
          data.bill === '0'
        ) ? 'Bill must be add' : 'Bill must be greater than 0',
        personCountErr: (
          data.personCount === 0 ||
          data.personCount ==='0' ||
          data.personCount < 0
        ),
        personCountErrText: (
          data.personCount === 0 ||
          data.personCount ==='0'
        ) ? 'Number of person must be add' : 'Number of person must be greater than 0',
      });
      return false;
    }

    setError({
      billErr: false,
      tipErr: false,
      personCountErr: false,
      fetchResponseErr: false,

      billErrText: '',
      tipErrText: '',
      personCountErrText: '',
      fetchResponseErrText: ''
    });
    return true;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('onsubmit');

    if(isValidateTrue()){

      // set is fetching data
      setResult({
        ...result,
        amount: '--.--',
        total: '--.--',
        isFetching: true,
      })

      // fetch data
      calculatorApi.get(data).then(({result, total, amount})=>{

        // set fetch done
        setResult({
          ...result,
          amount: amount.toFixed(2).toString(),
          total: total.toFixed(2).toString(),
          isFetching: false,
        })
        setError({
          billErr: false,
          tipErr: false,
          personCountErr: false,
          fetchResponseErr: false,

          billErrText: '',
          tipErrText: '',
          personCountErrText: '',
          fetchResponseErrText: '',
        });
      }).catch(()=>{
        // set fetch done
        setResult({
          ...result,
          isFetching: false,
        })
        setError({
          ...error,
          billErr: false,
          tipErr: false,
          personCountErr: false,
          fetchResponseErr: true,

          billErrText: '',
          tipErrText: '',
          personCountErrText: '',
          fetchResponseErrText: 'Fetch Data Error',
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
      fetchResponseErr: false,

      billErrText: '',
      tipErrText: '',
      personCountErrText: '',
      fetchResponseErrText: ''
    });
    setResult({
      amount: '00.00',
      total: '00.00',
      isFetching: false,
    })
  }

  const handleChange = (e)=>{
    if(isNaN(e.target.value)) return;
    setData({
      ...data,
      [e.target.name]: e.target.value ? parseFloat(e.target.value) : ''
    });
  }

  const handleFocus = (e)=>{
    setData(rev=>({
      ...data,
      [e.target.name]: e.target.value  === '0' ? '' : rev[e.target.name]
    }));
  }

  const handleBlur = (e)=>{
    setData(rev=>({
      ...data,
      [e.target.name]: e.target.value  === '' ? '0' : rev[e.target.name]
    }));
  }

  const handleCustomAvailable = (isAvailable)=>{
    if(data.isCustomAvailable===isAvailable) return;
    setData({
      ...data,
      tip: 0,
      isCustomAvailable: isAvailable
    });
  }

  return(
    <div className='homePage'>
      <section className="main__container">
        {/*logo*/}
        <img src={logo} alt="logo" />
          <h3 style={{color:'red', marginTop: '20px'}}
            >{error.fetchResponseErrText}</h3>
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
