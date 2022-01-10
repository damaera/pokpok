import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { useState } from "react";
import { Button, SecondaryButton } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";
import { Spacer } from "../Spacer";

type Props = {
  onSavePokemon: (nickname: string) => void;
  checkNicknameExist: (nickname: string) => boolean;
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

  const isNicknameExist = props.checkNicknameExist(nicknameInput);

  const catchInputEl = (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!props.checkNicknameExist?.(nicknameInput)) {
            props.onSavePokemon(nicknameInput);

            setCatchState(CatchState.Success);
            setNicknameInput("");
          }
        }}
      >
        <h3>Catch success</h3>
        <Input
          placeholder="Set pokemon nickname"
          onChange={(e) => {
            setNicknameInput(e.target.value);
          }}
          value={nicknameInput}
          minLength={2}
        />
        {isNicknameExist ? (
          <strong style={{ color: "red" }}>Nickname already exist</strong>
        ) : (
          <strong>Give it a name!</strong>
        )}
        <Spacer size={0.5} />
        <Button type="submit">Save pokemon</Button>
      </form>
      <Spacer size={2} />
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
