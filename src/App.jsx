import { Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import UserProvider from "./context/UserProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
