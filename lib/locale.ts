type Local =
  | '福島県磐梯町大字磐梯七ツ森'
  | '福島県耶麻郡猪苗代町大字磐根磐根'
  | '福島県耶麻郡磐梯町大字磐梯古観音'
  | '福島県耶麻郡磐梯町大字更科小柴坂';

export const localToPos: { [key in Local]: [number, number] } = {
  福島県磐梯町大字磐梯七ツ森: [37.5706107, 140.0315792],
  福島県耶麻郡猪苗代町大字磐根磐根: [37.5664017, 140.0426027],
  福島県耶麻郡磐梯町大字磐梯古観音: [37.5776372, 140.0332168],
  福島県耶麻郡磐梯町大字更科小柴坂: [37.5734237, 140.0234582],
};

export const posRandom = ([x, y]: [number, number]): [number, number] => {
  const xOffs = Math.random() * 0.018026746 - 0.0090133729745762;
  const yOffs = Math.random() * 0.018026746 - 0.0090133729745762;

  return [x + xOffs, y + yOffs];
};
