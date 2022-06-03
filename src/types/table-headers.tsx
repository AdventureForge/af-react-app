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
