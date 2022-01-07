import { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";

type Props = {
  onCatchPokemon: (isSuccess: boolean) => void;
  isLoading: boolean;
};

const PokeCatcher: React.FC<Props> = (props) => {
  const [isCatchLoading, setIsCatchLoading] = useState(false);
  const [isCatchSuccess, setIsCatchSuccess] = useState(false);

  const handleClick = () => {
    setIsCatchLoading(true);

    const isSuccess = Math.random() >= 0.5;
    setIsCatchSuccess(isSuccess);

    setTimeout(() => {
      setIsCatchLoading(false);
    }, 1000);
  };
  return (
    <Card>
      <Button onClick={(_) => handleClick()}>
        {isCatchLoading ? "Catching..." : "Catch this Pokemon 🎣"}
      </Button>
    </Card>
  );
};

export { PokeCatcher };
