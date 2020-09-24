import React from 'react';
import dynamic from 'next/dynamic';
import style from '../styles/Register.module.css';
import Header from '../components/Header';
import {
  SimpleInput,
  SimpleSelect,
  TaggedInput,
  RadioButton,
} from '../components/form';
import { useRouter } from 'next/router';
const MyMap = dynamic(() => import('../components/Map'), { ssr: false });

type InputState = {
  nickname: string;
  address: string;
  inputtedDoNotWantTo: string;
  doNotWantTo: string[];
  inputtedWillBeing: string;
  willBeing: string[];
  avatar: string;
};

type ListData = 'doNotWantTo' | 'willBeing';
type InputFiled = Exclude<keyof InputState, ListData>;
type InputAction = { type: InputFiled; value: string } | { type: ListData };

const initState: InputState = {
  nickname: '',
  address: '福島県磐梯町大字磐梯七ツ森',
  inputtedDoNotWantTo: '',
  doNotWantTo: [],
  inputtedWillBeing: '',
  willBeing: [],
  avatar: '/avatar/job_hanaya.png',
};
const inputReducer: React.Reducer<InputState, InputAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'doNotWantTo':
      return {
        ...state,
        [action.type]: [...state.doNotWantTo, state.inputtedDoNotWantTo],
        inputtedDoNotWantTo: '',
      };
    case 'willBeing':
      return {
        ...state,
        [action.type]: [...state.willBeing, state.inputtedWillBeing],
        inputtedWillBeing: '',
      };
    default:
      return { ...state, [action.type]: action.value };
  }
};

export default function Register() {
  const [state, reducer] = React.useReducer(inputReducer, initState);
  const [doRegister, setDoRegister] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (doRegister) {
      const { inputtedDoNotWantTo, inputtedWillBeing, ...postData } = state;

      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(postData),
      })
        .then((x) => x.json())
        .then((x) => {
          console.log(x);
          return router.push('/list');
        });
    }
  }, [doRegister, state]);

  return (
    <>
      <Header></Header>
      <div className={style.wrapper}>
        <h1>個人登録</h1>
        <div>
          <SimpleInput
            label="ニックネーム"
            value={state.nickname}
            onChange={(v) => reducer({ type: 'nickname', value: v })}
          />
        </div>
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
          <TaggedInput
            label="やりたくないこと"
            value={state.inputtedDoNotWantTo}
            onEnter={() => reducer({ type: 'doNotWantTo' })}
            onChange={(v) =>
              reducer({
                type: 'inputtedDoNotWantTo',
                value: v,
              })
            }
            tags={state.doNotWantTo}
          />
        </div>
        <div>
          <TaggedInput
            label="将来やりたいこと"
            value={state.inputtedWillBeing}
            onEnter={() => reducer({ type: 'willBeing' })}
            onChange={(v) =>
              reducer({
                type: 'inputtedWillBeing',
                value: v,
              })
            }
            tags={state.willBeing}
          />
        </div>
        <div>
          アバター
          <div className={style.scroll}>
            <RadioButton
              label="avatar"
              value="/avatar/job_hanaya.png"
              onChange={(v) =>
                reducer({
                  type: 'avatar',
                  value: v,
                })
              }
            >
              <img className={style.img} src="/avatar/job_hanaya.png" />
            </RadioButton>
            <RadioButton
              label="avatar"
              value="/avatar/job_teacher_man.png"
              onChange={(v) =>
                reducer({
                  type: 'avatar',
                  value: v,
                })
              }
            >
              <img className={style.img} src="/avatar/job_teacher_man.png" />
            </RadioButton>
            <RadioButton
              label="avatar"
              value="/avatar/panya_man.png"
              onChange={(v) =>
                reducer({
                  type: 'avatar',
                  value: v,
                })
              }
            >
              <img className={style.img} src="/avatar/panya_man.png" />
            </RadioButton>
            <RadioButton
              label="avatar"
              value="/avatar/sports_soccer_man_asia.png"
              onChange={(v) =>
                reducer({
                  type: 'avatar',
                  value: v,
                })
              }
            >
              <img
                className={style.img}
                src="/avatar/sports_soccer_man_asia.png"
              />
            </RadioButton>
          </div>
        </div>
        <button className={style.btn} onClick={() => setDoRegister(true)}>
          登録
        </button>
      </div>
    </>
  );
}
