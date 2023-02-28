import { FormEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './service/firebase';
import { onValue, ref, remove, set, update } from 'firebase/database';
import {TbDiamond} from 'react-icons/tb'
import {GiHealthPotion} from 'react-icons/gi'
import {HiPlusCircle} from 'react-icons/hi'
import {AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Popup from './components/Popup';
import { useAuth } from './hooks/AuthContext';

interface bankProps {
  name: string,
  value: number
  id: string
}

interface itemProps extends bankProps {
  icon: string
}

interface dataProps {
  money: bankProps[],
  items: itemProps[]
}

function App() {
  const [money, setMoney] = useState<bankProps[]>([]);
  const [items, setItems] = useState<itemProps[]>([]);
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
    isPinInLocalStorage(pin)
    if(isPinValid === false) return
    setShowAdd(true)
    if (showAdd === true){
      setShowAdd(false)
    }
  }

  const handleAddItem= (event: FormEvent) => {
    event.preventDefault();
    isPinInLocalStorage(pin)
    if(isPinValid === false) return
    if(title && quantity){
    let newId = uuidv4()
    set(ref(db, 'items/' + newId), {
      name: title,
      value: quantity,
      id: newId
    })
    setTitle('');
    setQuantity('');
    toast('💎 Item adicionado!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }else{
      toast.error('Preencha os campos!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    
  }

  const removeItem = (id: string) => {
    isPinInLocalStorage(pin)
    if(isPinValid === false) return
    const itemRef = ref(db, `items/${id}`)
    remove(itemRef)
    console.log(itemRef);

    toast('🗑️ Item excluido', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
  }

  const updateCoins = (id: string) => {
    isPinInLocalStorage(pin)
    if(isPinValid === false) return
    if (coin){
    const itemRef = ref(db, `money/${id}`)
    update(itemRef, {
      value: coin,
    })
    toast('🪙 Dinheiro atualizado!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      setCoin('')
  }else{
    toast.error('Preencha o campo!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
    
  }
  const { postLocalStorage, pin, isPinInLocalStorage, isPinValid } = useAuth()

  return (
    <div className="App">
      <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
      <h1>Banco dos crias 🏦</h1>
        <strong className='sub-title'>Moedas:</strong>
      <div className="card">
      {money.map((e: bankProps, index)=> (
        <div key={index} className='coins'>
          <span>{e.name}:</span>
        <div className="changeMoney">
        <button>
          {e.value}
        </button>
        <input onChange={(event) => setCoin(event.target.value)}
             className='changeCoin'
             type="number" 
             name='1'
             placeholder={`Coins`}/>
             <button onClick={() => updateCoins(e.id)}  className="edit">
                <AiFillEdit className=''/>
                Alterar
             </button>
        </div>
        </div>
        ))} 
        <div className="items">
        <strong className='sub-title'>Itens:</strong> 
          {items.map((e: itemProps, index) => (
            <div className="item">
              <i className={e.icon}></i>
              <p>{e.name}:</p>
              <p>{e.value}</p>
              <BsFillTrashFill className='trash' onClick={() => removeItem(e.id)}/>
            </div>
          ))}
          
          _____
        </div>
        {/* <div className="center">
          <p>1 silver = 10 copper</p>
          <p>1 electrum = 5 silver</p>
          <p>1 gold = 10 silver</p>
          <p>1 platinum = 10 gold</p>
        </div> */}
      </div>


      <div onClick={addItem} className="addnewItem">
      <HiPlusCircle/> Adicionar um novo item
      </div>
        {showAdd ?
          <div className="input">
            <div className="">
              <p>Adicione um item encontrado, e a quantidade e/ou o valor dos items</p>
            </div>
            <div className="input-group">
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
          </div>
        : null}

      {/* <a href='https://forms.gle/Frfq1WDTwcxz2xwA9' className="read-the-docs">
        Preencha o formulario com oque você tem
      </a> */}
        <Popup content='Para segurança do site você deve digitar o PIN da party para poder fazer as alterações' title='Autenticar' />
    </div>
  )
}

export default App
