import { useContext, useState } from "react";
import { passwordENV } from "../service/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, AuthProvider } from "../hooks/AuthContext";
import { Drawer } from "vaul";

interface PopupProps {
  title: string;
  content: string;
}

function Popup({ title, content }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState<string>("");

  const { postLocalStorage, pin, isPinInLocalStorage, isPinValid } = useAuth();
  const handleAuth = () => {
    if (password === passwordENV) {
      postLocalStorage(password);
      isPinInLocalStorage(password);
      toast("🔒 AU-TÊN-TI-CA-DO!", {
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
      toast.error("Senha incorreta!", {
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

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {title}
        </button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Drawer for React.
              </Drawer.Title>
              <p className="text-gray-600 mb-2">
                <div className="popup-header">
                  <h2>
                    {title}: {content}
                  </h2>
                </div>
                <form action="">
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Senha"
                    type="text"
                    className="input-lg"
                  />
                  <button onClick={handleAuth}>Enviar</button>
                </form>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default Popup;
