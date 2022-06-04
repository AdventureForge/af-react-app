import { Column } from 'react-table';

export interface IPublisherHeaderTypes {
  uuid?: string;
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
];

export interface IRolePlayingGameHeaderTypes {
  uuid?: string;
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
];
