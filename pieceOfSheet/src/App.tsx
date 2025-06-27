// src/App.tsx
import './styles/globals.css';
import RuledSheet from "./components/RuledSheet";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <Toolbar />
        <RuledSheet pattern='________'/>
      </div>
    </div>
  );
}

export default App;