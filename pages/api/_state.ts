export type User = {
  nickname: string;
  address: string;
  doNotWantTo: string[];
  willBeing: string[];
  avatar: string;
};

export type State = {
  users: User[];
};

export const state: State = {
  users: [
    {
      nickname: 'C',
      address: '福島県耶麻郡磐梯町大字磐梯古観音',
      doNotWantTo: ['スポーツ'],
      willBeing: ['花屋'],
      avatar: '/avatar/job_hanaya.png',
    },
    {
      nickname: 'D',
      address: '福島県耶麻郡磐梯町大字更科小柴坂',
      doNotWantTo: ['料理'],
      willBeing: ['先生'],
      avatar: '/avatar/job_teacher_man.png',
    },
    {
      // @ts-ignore
      tag: true,
      nickname: 'パン教室',
      address: '福島県耶麻郡磐梯町大字更科小柴坂',
      doNotWantTo: [],
      willBeing: [],
      avatar: '/avatar/pan_hana.png',
    },
    {
      // @ts-ignore
      tag: true,
      nickname: '部屋掃除',
      address: '福島県耶麻郡磐梯町大字磐梯古観音',
      doNotWantTo: [],
      willBeing: [],
      avatar: '/avatar/hanaya_socker.png',
    },
    {
      // @ts-ignore
      tag: true,
      nickname: 'トカゲ退治',
      address: '福島県耶麻郡磐梯町大字磐梯古観音',
      doNotWantTo: [],
      willBeing: [],
      avatar: '/avatar/teacher_pan.png',
    },
  ],
};
