import style from '../styles/header.module.css';
import { useRouter } from 'next/router';

export default function Header(props: React.PropsWithChildren<{}>) {
  const router = useRouter();

  return (
    <header className={style.header}>
      <button
        onClick={() => router.push('/')}
        className={style.back_btn}
      ></button>
      {props.children}
    </header>
  );
}
