import { ThemeProvider } from "./components/providers/theme-provider";
import { Navbar } from "./components/layout/navbar";
import { PlayScreen } from "./components/layout/play-screen";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <PlayScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
