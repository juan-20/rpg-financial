import { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { onValue, ref, remove, set, update } from 'firebase/database';
import {TbDiamond} from 'react-icons/tb'
import {GiHealthPotion} from 'react-icons/gi'
import {HiPlusCircle} from 'react-icons/hi'
import {AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'

import { v4 as uuidv4 } from 'uuid';

interface bankProps {
  name: string,
  value: number
  id: string
}

interface dataProps {
  money: bankProps[],
  items: bankProps[]
}

function App() {
  const [money, setMoney] = useState<bankProps[]>([]);
  const [items, setItems] = useState<bankProps[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const [coin, setCoin] = useState('');

  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
    const query =  ref(db, `/`);
    onValue(query, (snapshot) => {
      const data: dataProps = snapshot.val();
      setMoney(data.money)
      setItems(Object.values(data.items))
    })
  }
  fetchData();
}, []);

console.log(items);
  function addItem(){
    setShowAdd(true)
    if (showAdd === true){
      setShowAdd(false)
    }
  }

  const handleAddItem= (event: FormEvent) => {
    event.preventDefault();
    let newId = uuidv4()
    set(ref(db, 'items/' + newId), {
      name: title,
      value: quantity,
      id: newId
    })
    .then(() => {
      setTitle('');
      setQuantity('')
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  const removeItem = (id: string) => {
    
    const itemRef = ref(db, `items/${id}`)
    remove(itemRef)
    console.log(itemRef);
    
  }

  const updateCoins = (id: string) => {
    
    const itemRef = ref(db, `money/${id}`)
    update(itemRef, {
      value: coin,
    })
    console.log(itemRef);
    
  }

  return (
    <div className="App">
      <h1>Banco dos crias 🏦</h1>
      <div className="card">
      {money.map((e: bankProps, index)=> (
        <div key={index} className='coins'>
          <span>{e.name}</span>
        <div className="changeMoney">
        <button>
          {e.value}
        </button>
        <input onChange={(event) => setCoin(event.target.value)}
             className='changeCoin'
             type="number" 
             name='1'
             placeholder='1' />
             <div onClick={() => updateCoins(e.id)}  className="edit">
                <AiFillEdit className=''/>
                Alterar
              </div>
        </div>
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
          </div> 
          {items.map((e: bankProps, index) => (
            <div className="item">
              <p>{e.name}:</p>
              <p>{e.value}</p>
              <BsFillTrashFill onClick={() => removeItem(e.id)}/>
            </div>
          ))}
          
          _____
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
      <div onClick={addItem} className="addnewItem">
      <HiPlusCircle/> Adicionar um novo item
      </div>
        {showAdd ?
          <div className="input">
            <input onChange={(event) => setTitle(event.target.value)}
             className='addText'
             type="text" 
             name="Nome"
             placeholder='Nome' />

            <input onChange={(event) => setQuantity(event.target.value)}
              className='addQuant' 
              type="string" 
              name="Quantidade"
              placeholder='Quant.' />
            <button onClick={handleAddItem}>Enviar</button>
          </div>
        : null}
    </div>
  )
}

export default App
