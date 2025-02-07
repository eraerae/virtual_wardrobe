import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CreateNewOutfit from "./CreateNewOutfit";
import "bootstrap/dist/css/bootstrap.min.css";
import OutfitsGallery from "./OutfitGallery";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateNewOutfit" element={<CreateNewOutfit />} />
        <Route path="/OutfitGallery" element={<OutfitsGallery />} />
      </Routes>
    </Router>
  );
};

export default App;
