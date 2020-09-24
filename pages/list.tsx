import Header from '../components/Header';
import style from '../styles/Register.module.css';
import dynamic from 'next/dynamic';
import { User } from './api/_state';
import { NextPageContext } from 'next';
const MyMap = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function List(props: {
  users: User[];
  filter?: string[];
  address?: string;
}) {
  return (
    <>
      <Header></Header>
      <MyMap pins={props.users} filter={props.filter} address={props.address} />
    </>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://wb-h-2020.vercel.app';

  const filter = context.query.filter
    ? (context.query.filter as string).split(',')
    : [];
  const address = context.query.address || null;
  const { users } = await fetch(`${baseURL}/api/users`).then((x) => x.json());

  return {
    props: {
      users,
      filter,
      address,
    },
  };
};
