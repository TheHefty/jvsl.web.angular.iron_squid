// src/app/app-db-config.ts
import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'IronSquidDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'challenge',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'lives', keypath: 'lives', options: { unique: false } },
        {
          name: 'currentGear',
          keypath: 'currentGear',
          options: { unique: false },
        },
        {
          name: 'status',
          keypath: 'status',
          options: { unique: false },
        },
        {
          name: 'attemptsHistory',
          keypath: 'attemptsHistory',
          options: { unique: false },
        },
        {
          name: 'runsHistory',
          keypath: 'runsHistory',
          options: { unique: false },
        },
        {
          name: 'updateDate',
          keypath: 'updateDate',
          options: { unique: false },
        },
      ],
    },
  ],
};
