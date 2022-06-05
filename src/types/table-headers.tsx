import { Column } from 'react-table';
import { BaseEntity } from './domain';

export interface IPublisherHeaderTypes extends BaseEntity {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logo?: string;
}

export const publisherHeaders: Column<IPublisherHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Website url',
    accessor: 'websiteUrl',
  },
  {
    Header: 'Logo url',
    accessor: 'logo',
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
  },
];

export interface IRolePlayingGameHeaderTypes extends BaseEntity {
  title?: string;
  subtitle?: string;
  description?: string;
  pictureUrl?: string;
  websiteUrl?: string;
}

export const rolePlayingGameHeaders: Column<IRolePlayingGameHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
  },
  {
    Header: 'Title',
    accessor: 'title',
  },
  {
    Header: 'Subtitle',
    accessor: 'subtitle',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Picture url',
    accessor: 'pictureUrl',
  },
  {
    Header: 'Website url',
    accessor: 'websiteUrl',
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
  },
];

export interface IEditionHeaderTypes extends BaseEntity {
  editionNumber?: number;
  editionTitle?: string;
  rolePlayingGameUuid?: string;
}

export const editionHeaders: Column<IEditionHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
  },
  {
    Header: 'Title',
    accessor: 'editionNumber',
  },
  {
    Header: 'Edition title',
    accessor: 'editionTitle',
  },
  {
    Header: 'Rpg uuid',
    accessor: 'rolePlayingGameUuid',
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
  },
];
