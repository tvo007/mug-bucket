import { Switch, Route } from "react-router-dom";
import { ImageUploadPage } from "./pages/ImageUploadPage";
import { ImageResultPage } from "./pages/ImageResultPage";

function App() {
  return (
    <Switch>
      <Route exact={true} path="/" component={ImageUploadPage} />
      <Route exact={true} path="/img/:key" component={ImageResultPage} />
    </Switch>
  );
}

export default App;
