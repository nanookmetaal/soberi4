import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <div className="p-4 flex items-center justify-between text-4xl text-blue-500 dark:text-blue-300">
      <div id="navbar-items" className="flex items-center justify-start gap-4">
        <h1 className="text-gray-600 dark:text-white">Soberi4</h1>
        <a
          href="https://www.unco.edu/hewit/pdf/giant-map/connect-4-instructions.pdf"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rules
        </a>
      </div>
      <div id="secondary-items">
        <ModeToggle />
      </div>
    </div>
  );
}
