import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { onValue, ref } from 'firebase/database';
import {TbDiamond} from 'react-icons/tb'
import {GiHealthPotion} from 'react-icons/gi'

interface bankProps {
  name: string,
  value: number
}



function App() {
  const [data, setData] = useState<bankProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    const query =  ref(db, `/money`);
    onValue(query, (snapshot) => {
      const data: bankProps[] = snapshot.val();
      console.log(data);
      setData(data)
    })
    }

   fetchData();
  }, []);

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Banco dos crias 🏦</h1>
      <div className="card">
      {data.map((e: bankProps, index)=> (
        <div className='coins'>
          <span>{e.name}</span>
        <button onClick={() => setCount((count) => count + 1)}>
          {e.value}
        </button>
        </div>
        ))} 
        <div className="items">
          <div className="item">
            <TbDiamond size={16}/>
            <p>Diamante revify: 3</p>
          </div>
          <div className="item">
            <GiHealthPotion size={16}/>
            <p>Poção de cura 4d4 + 4: 3</p>
          </div> _____
        </div>
        <div className="center">
          <p>1 silver = 10 copper</p>
          <p>1 electrum = 5 silver</p>
          <p>1 gold = 10 silver</p>
          <p>1 platinum = 10 gold</p>
        </div>
      </div>
      <a href='https://forms.gle/Frfq1WDTwcxz2xwA9' className="read-the-docs">
        Preencha o formulario com oque você tem
      </a>
    </div>
  )
}

export default App
