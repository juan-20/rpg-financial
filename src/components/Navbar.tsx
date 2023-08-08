import Popup from "./Popup";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <h1>Banco dos crias 🏦</h1>
        </a>
        <div className="flex md:order-2">
          <Popup
            content="Para segurança do site você deve digitar o PIN da party para poder fazer as alterações"
            title="Login"
          />
        </div>
      </div>
    </nav>
  );
}
