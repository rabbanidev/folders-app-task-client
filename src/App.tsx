import { Routes, Route } from "react-router-dom";
import FolderList from "./components/FolderList";
import CreateFolder from "./components/CreateFolder";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<FolderList />} />
        <Route path="/create/:id" element={<CreateFolder />} />
      </Routes>
    </main>
  );
};

export default App;
