import { ImageCanvas } from "./ImageCanvas";

const App = () => {
  return (
    <div className="dark text-white">
      <h1 className="mt-20 text-3xl text-center ">Hola</h1>
      <div className="h-[200vh] flex justify-center">
        <ImageCanvas />
      </div>{" "}
      <h1 className="mt-20 text-3xl text-center ">Ta guapo eh</h1>
    </div>
  );
};

export default App;
