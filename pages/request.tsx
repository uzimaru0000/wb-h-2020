import Header from '../components/Header';
import style from '../styles/Register.module.css';
import { SimpleInput, SimpleSelect, TaggedInput } from '../components/form';
import { useCallback, useReducer } from 'react';
import { useRouter } from 'next/router';

type InputState = {
  address: string;
  title: string;
  inputtedGenre: string;
  genre: string[];
};

type ListData = 'genre';
type InputFiled = Exclude<keyof InputState, ListData>;
type InputAction = { type: InputFiled; value: string } | { type: ListData };

const initState: InputState = {
  address: '',
  title: '',
  inputtedGenre: '',
  genre: [],
};
const inputReducer: React.Reducer<InputState, InputAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'genre':
      return {
        ...state,
        [action.type]: [...state.genre, state.inputtedGenre],
        inputtedGenre: '',
      };
    default:
      return { ...state, [action.type]: action.value };
  }
};

export default function Request() {
  const [state, reducer] = useReducer(inputReducer, initState);
  const router = useRouter();

  const search = useCallback(() => {
    router.push(
      `/list?filter=${state.genre
        .map((x) => encodeURIComponent(x))
        .join(',')}&address=${encodeURIComponent(state.address)}`
    );
  }, [state, router]);

  return (
    <>
      <Header></Header>
      <div className={style.wrapper}>
        <h1>人を探す</h1>
        <div>
          <SimpleSelect
            label="場所"
            value={state.address}
            onChange={(v) => reducer({ type: 'address', value: v })}
            options={[
              '福島県磐梯町大字磐梯七ツ森',
              '福島県耶麻郡猪苗代町大字磐根磐根',
              '福島県耶麻郡磐梯町大字磐梯古観音',
              '福島県耶麻郡磐梯町大字更科小柴坂',
            ]}
          />
        </div>
        <div>
          <SimpleInput
            label="依頼内容"
            value={state.title}
            onChange={(v) => reducer({ type: 'title', value: v })}
          />
        </div>
        <div>
          <TaggedInput
            label="ジャンル"
            value={state.inputtedGenre}
            onEnter={() => reducer({ type: 'genre' })}
            onChange={(v) => reducer({ type: 'inputtedGenre', value: v })}
            tags={state.genre}
          />
        </div>
        <button className={style.btn} onClick={search}>
          確認
        </button>
      </div>
    </>
  );
}
