import { useState } from 'react';
import style from '../styles/form.module.css';

export type InputProps = {
  label: string;
  value: string;
  onChange: (str: string) => void;
};

export const SimpleInput = (props: InputProps) => (
  <label className={style.simple}>
    <span>{props.label}</span>
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    />
  </label>
);

export const SimpleSelect = (props: InputProps & { options: string[] }) => (
  <label className={style.simple}>
    <span>{props.label}</span>
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.currentTarget.value)}
    >
      {props.options.map((x) => (
        <option key={x}>{x}</option>
      ))}
    </select>
  </label>
);

export const TaggedInput = (
  props: InputProps & { onEnter: () => void; tags: string[] }
) => {
  const [composing, setComposing] = useState(true);

  return (
    <>
      <label className={style.simple}>
        <span>{props.label}</span>
        <input
          value={props.value}
          onKeyDown={(e) => composing && e.key === 'Enter' && props.onEnter()}
          onCompositionStart={() => setComposing(false)}
          onCompositionEnd={() => setComposing(true)}
          onChange={(e) => props.onChange(e.currentTarget.value)}
        />
      </label>
      <ul className={style.tags}>
        {props.tags.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </>
  );
};

export const RadioButton = (props: React.PropsWithChildren<InputProps>) => {
  return (
    <label className={style.radio}>
      {props.children}
      <input
        type="radio"
        name={props.label}
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
      />
    </label>
  );
};
