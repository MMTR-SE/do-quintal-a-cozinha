import "./styles.css";

export function Cooking() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
      <div className="relative">
        <div className="text-6xl panela">🍲</div>
        <div className="absolute -top-6 left-2 text-2xl steam">💨</div>
        <div className="absolute -top-7 left-6 text-2xl steam delay-500">
          💨
        </div>
      </div>

      <h1 className="text-2xl font-semibold">Cozinhando nosso conteúdo...</h1>
      <p className="text-sm text-gray-600">
        Essa página ainda está sendo preparada com carinho!
      </p>
    </div>
  );
}
