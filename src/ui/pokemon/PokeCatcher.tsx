import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { useState } from "react";
import { Button, SecondaryButton } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";

type Props = {
  onSavePokemon: (nickname: string) => void;
  isLoading: boolean;
};

enum CatchState {
  Init,
  InitLoading,
  InputNickname,
  Success,
  Failed,
  TryAgainLoading,
}

const PokeCatcher: React.FC<Props> = (props) => {
  const [catchState, setCatchState] = useState(CatchState.Init);
  const [nicknameInput, setNicknameInput] = useState("");

  const handleClick = () => {
    if (catchState === CatchState.Init || catchState === CatchState.Success) {
      setCatchState(CatchState.InitLoading);
    }
    if (catchState === CatchState.Failed) {
      setCatchState(CatchState.TryAgainLoading);
    }

    const isSuccess = Math.random() >= 0.5;

    setTimeout(() => {
      if (isSuccess) {
        setCatchState(CatchState.InputNickname);
      } else {
        setCatchState(CatchState.Failed);
      }
    }, 1000);
  };

  const catchInputEl = (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          props.onSavePokemon(nicknameInput);

          setCatchState(CatchState.Success);
          setNicknameInput("");
        }}
      >
        <h3>Catch success</h3>
        <p>Give it a name!</p>
        <Input
          placeholder="Set pokemon nickname"
          onChange={(e) => {
            setNicknameInput(e.target.value);
          }}
          value={nicknameInput}
        />
        <br />
        <Button type="submit">Save pokemon</Button>
        <br />
        <br />
        <br />
      </form>
      <SecondaryButton onClick={(_) => setCatchState(CatchState.Init)}>
        Cancel
      </SecondaryButton>
    </>
  );

  const catchInitEl = (
    <>
      <h3>Catch this pokemon</h3>
      <Button onClick={(_) => handleClick()}>
        {catchState === CatchState.InitLoading ? "Catching..." : "Catch 🎣"}
      </Button>
    </>
  );
  const catchSuccessEl = (
    <>
      <h3>Pokemon saved</h3>
      <Button onClick={(_) => handleClick()}>
        {catchState === CatchState.InitLoading
          ? "Catching..."
          : "Catch again🎣"}
      </Button>
    </>
  );
  const catchFailedEl = (
    <>
      <h3>Oopss, failed</h3>
      <Button onClick={(_) => handleClick()}>
        {catchState === CatchState.TryAgainLoading
          ? "Catching..."
          : "Catch again 🎣"}
      </Button>
    </>
  );

  let el: EmotionJSX.Element;

  switch (catchState) {
    case CatchState.Init:
    case CatchState.InitLoading:
      el = catchInitEl;
      break;
    case CatchState.Failed:
    case CatchState.TryAgainLoading:
      el = catchFailedEl;
      break;
    case CatchState.InputNickname:
      el = catchInputEl;
      break;
    case CatchState.Success:
      el = catchSuccessEl;
      break;
  }

  return <Card style={{ width: 300 }}>{el}</Card>;
};

export { PokeCatcher };
