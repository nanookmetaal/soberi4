import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/providers/theme-provider";
import { Navbar } from "./components/layout/navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button className="cursor-pointer" variant={"outline"}>
          Click me
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
