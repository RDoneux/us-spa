import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import Login from './routes/login/Login';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Loading from './routes/loading/Loading';
import ServiceUnavailable from './routes/service-unavailable/ServiceUnavailable';
import Header from './components/header/Header';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Header />
        <div className="mt-[30px]">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route
              path="/service-unavailable"
              element={<ServiceUnavailable />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
