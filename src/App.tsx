import { FormEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./service/firebase";
import { onValue, ref, remove, set, update } from "firebase/database";
import { TbDiamond } from "react-icons/tb";
import { GiHealthPotion, GiPoolTableCorner } from "react-icons/gi";
import { HiPlusCircle } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill, BsTable } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Popup from "./components/Popup";
import { useAuth } from "./hooks/AuthContext";
import Navbar from "./components/Navbar";
import { Drawer } from "vaul";

interface bankProps {
  name: string;
  value: number;
  id: string;
}

interface itemProps extends bankProps {
  icon: string;
}

interface dataProps {
  money: bankProps[];
  items: itemProps[];
}

function App() {
  const [money, setMoney] = useState<bankProps[]>([]);
  const [items, setItems] = useState<itemProps[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const [coin, setCoin] = useState("");

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const query = ref(db, `/`);
      onValue(query, (snapshot) => {
        const data: dataProps = snapshot.val();
        setMoney(data.money);
        setItems(Object.values(data.items));
      });
    };
    fetchData();
  }, []);

  function addItem() {
    isPinInLocalStorage(pin);
    if (isPinValid === false) return;
    setShowAdd(true);
    if (showAdd === true) {
      setShowAdd(false);
    }
  }

  const handleAddItem = (event: FormEvent) => {
    event.preventDefault();
    isPinInLocalStorage(pin);
    if (isPinValid === false) return;
    if (title && quantity) {
      let newId = uuidv4();
      set(ref(db, "items/" + newId), {
        name: title,
        value: quantity,
        id: newId,
      });
      setTitle("");
      setQuantity("");
      toast("💎 Item adicionado!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Preencha os campos!", {
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
  };

  const removeItem = (id: string) => {
    isPinInLocalStorage(pin);
    console.log(isPinValid);
    if (isPinValid === false) return;
    const itemRef = ref(db, `items/${id}`);
    remove(itemRef);
    console.log(itemRef);

    toast("🗑️ Item excluido", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const updateCoins = (id: string) => {
    isPinInLocalStorage(pin);
    if (isPinValid === false) return;
    if (coin) {
      const itemRef = ref(db, `money/${id}`);
      update(itemRef, {
        value: coin,
      });
      toast("🪙 Dinheiro atualizado!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCoin("");
    } else {
      toast.error("Preencha o campo!", {
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
  };
  const { postLocalStorage, pin, isPinInLocalStorage, isPinValid } = useAuth();

  return (
    <div className="App pt-20">
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

      <form className="flex flex-col justify-center items-center" action="">
        <div className="coins">
          <div className="flex justify-between items-center">
            <strong className="sub-title">Moedas:</strong>
            <Drawer.Root shouldScaleBackground>
              <Drawer.Trigger asChild>
                <button
                  type="button"
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path>
                  </svg>
                </button>
              </Drawer.Trigger>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Portal>
                <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[50%] fixed bottom-0 left-0 right-0">
                  <div className="p-4 bg-white rounded-t-[10px] flex-1">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                    <div className="max-w-md mx-auto">
                      <Drawer.Title className="font-medium mb-4">
                        Drawer for React.
                      </Drawer.Title>
                      <p className="text-gray-600 mb-2">
                        <div className="center">
                          <p>1 silver = 10 copper</p>
                          <p>1 electrum = 5 silver</p>
                          <p>1 gold = 10 silver</p>
                          <p>1 platinum = 10 gold</p>
                        </div>
                      </p>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
          <div className="flex flex-col gap-4">
            {money.map((e: bankProps, index) => (
              <div className="" key={index}>
                <span>{e.name}:</span>
                <div className="flex gap-4 justify-center items-center">
                  <p>{e.value}</p>
                  <input
                    onChange={(event) => setCoin(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="1"
                    placeholder={`Novo valor para ${e.name}`}
                  />
                  <button
                    onClick={() => updateCoins(e.id)}
                    className="flex justify-center items-center gap-2"
                  >
                    <AiFillEdit />
                    Alterar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <strong className="flex justify-center items-center">Itens:</strong>
            {items.map((e: itemProps, index) => (
              <div className="flex gap-4 items-center p-4">
                <i className={`${e.icon} w-4 h-4`}></i>
                <p className="text-ellipsis overflow-hidden h-6 w-72 flex justify-center">
                  {e.name}:
                </p>
                <p className="h-6 w-20 flex justify-center text-ellipsis overflow-hidden">
                  {e.value}
                </p>
                <BsFillTrashFill
                  className="trash"
                  onClick={() => removeItem(e.id)}
                />
                {/* <button
                  onClick={() => updateCoins(e.id)}
                  className="flex justify-center items-center gap-2"
                >
                  <AiFillEdit />
                  Alterar
                </button> */}
              </div>
            ))}
            _____
          </div>
        </div>
      </form>

      <div onClick={addItem} className="addnewItem">
        <HiPlusCircle /> Adicionar um novo item
      </div>
      {showAdd ? (
        <div className="input">
          <div className="">
            <p>
              Adicione um item encontrado, e a quantidade e/ou o valor dos items
            </p>
          </div>
          <div className="input-group">
            <input
              onChange={(event) => setTitle(event.target.value)}
              className="addText"
              type="text"
              name="Nome"
              placeholder="Nome"
            />

            <input
              onChange={(event) => setQuantity(event.target.value)}
              className="addQuant"
              type="string"
              name="Quantidade"
              placeholder="Quant."
            />
            <button onClick={handleAddItem}>Enviar</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
