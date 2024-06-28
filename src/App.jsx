import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import DrinksPage from "./components/DrinksPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <DrinksPage />
      </div>
      {/* <h1 className="text-3xl font-extrabold underline">BBT + Merch</h1> */}

      {/* <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          {" "}
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
          BBT count is {count}
        </Button>
      </div> */}
    </>
  );
}

export default App;
