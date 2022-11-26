import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";

import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import Signup from "./components/Signup";
import UserProvider from "./context/UserProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Navbar />
        <div className="flex flex-col">
          <div className="grid h-20 place-items-center">
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
