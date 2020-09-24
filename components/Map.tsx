import { User } from '../pages/api/_state';
import style from '../styles/form.module.css';
import { Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { localToPos, posRandom } from '../lib/locale';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  pins: User[];
  filter?: string[];
  address?: string;
};

export default function MyMap(props: Props) {
  const [head] = props.pins;
  const router = useRouter();

  return (
    <>
      <div className={style.overlay}>成約件数 ： 50</div>
      <Map
        center={localToPos[props.address || head.address]}
        zoom={16}
        style={{
          height: '600px',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.pins.map((x) => (
          <UserMarker
            key={x.nickname}
            user={x}
            disable={
              props.filter
                ? x.address !== props.address &&
                  props.filter.some((f) => x.doNotWantTo.some((y) => y === f))
                : true
            }
          />
        ))}
      </Map>
    </>
  );
}

const UserMarker = ({ user, disable }: { user: User; disable: boolean }) => {
  const pinIcon = useMemo(
    () =>
      L.icon({
        iconUrl: user.avatar,
        iconSize: disable
          ? new L.Point(25, 35)
          : (user as any).tag
          ? new L.Point(70, 70)
          : new L.Point(50, 70),
      }),
    [user]
  );

  return (
    <Marker position={posRandom(localToPos[user.address])} icon={pinIcon}>
      {!disable && (
        <Tooltip direction="top" offset={new L.Point(0, -25)}>
          <h3>{user.nickname}</h3>
          {!(user as any).tag && (
            <>
              <div>
                <h4>やりたくないこと</h4>
                <ul className={style.tags}>
                  {user.doNotWantTo.map((x) => (
                    <li key="x">{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>将来やりたいこと</h4>
                <ul className={style.tags}>
                  {user.willBeing.map((x) => (
                    <li key="x">{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button>お願いする</button>
              </div>
            </>
          )}
        </Tooltip>
      )}
    </Marker>
  );
};
