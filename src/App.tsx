import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Router } from "./components/Router";
function App() {
  return (
    <>
      <section>
        <Header />
      </section>
      <section >
        <Router />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}

export default App;
