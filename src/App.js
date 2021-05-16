import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navigation from "./Components/Navigation";
import Create from "./pages/Create";
import Notes from "./pages/Notes";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#31708F",
    },
    secondary: {
      main: "#8FC1E2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
