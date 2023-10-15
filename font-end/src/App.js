import { Alert, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './routes'
import PublicRoute from './containers/PublicRoute';
import PrivateRoute from './containers/PrivateRoute';

import { theme } from './asset/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes >
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={route.public ? <PublicRoute component={route.component} /> : <PrivateRoute component={route.component} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
