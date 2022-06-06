import { Column } from 'react-table';
import { BaseEntity, Category } from './domain';

const UUID_WIDTH = 340;
const TINY_TEXT_WIDTH = 100;
const SHORT_TEXT_WIDTH = 150;
const MEDIUM_TEXT_WIDTH = 250;
const LONG_TEXT_WIDTH = 400;

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
    width: UUID_WIDTH,
  },
  {
    Header: 'Name',
    accessor: 'name',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Description',
    accessor: 'description',
    width: LONG_TEXT_WIDTH,
  },
  {
    Header: 'Website url',
    accessor: 'websiteUrl',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Logo url',
    accessor: 'logo',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
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
    width: UUID_WIDTH,
  },
  {
    Header: 'Title',
    accessor: 'title',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Subtitle',
    accessor: 'subtitle',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Description',
    accessor: 'description',
    width: LONG_TEXT_WIDTH,
  },
  {
    Header: 'Picture url',
    accessor: 'pictureUrl',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Website url',
    accessor: 'websiteUrl',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
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
    width: UUID_WIDTH,
  },
  {
    Header: 'Edition Number',
    accessor: 'editionNumber',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Edition title',
    accessor: 'editionTitle',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Rpg uuid',
    accessor: 'rolePlayingGameUuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];

export interface ICollectionHeaderTypes extends BaseEntity {
  title?: string;
  description?: string;
  editionUuid?: string;
  publisherUuid?: string;
}

export const collectionHeaders: Column<ICollectionHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Title',
    accessor: 'title',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Description',
    accessor: 'description',
    width: MEDIUM_TEXT_WIDTH,
  },
  {
    Header: 'Edition uuid',
    accessor: 'editionUuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Publisher uuid',
    accessor: 'publisherUuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];

export interface IAuthorHeaderTypes extends BaseEntity {
  firstname?: string;
  lastname?: string;
}

export const authorHeaders: Column<IAuthorHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Firstname',
    accessor: 'firstname',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Lastname',
    accessor: 'lastname',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];

export interface IBookHeaderTypes extends BaseEntity {
  title?: string;
  subtitle?: string;
  cover?: string;
  description?: string;
  language?: string;
  isbn?: string;
  authorsUuid?: string[];
  collectionUuid?: string;
  category?: Category;
  publisherUuid?: string;
  rolePlayingGameUuid?: string;
  editionUuid?: string;
}

export const bookHeaders: Column<IBookHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Title',
    accessor: 'title',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Subtitle',
    accessor: 'subtitle',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Description',
    accessor: 'description',
    width: LONG_TEXT_WIDTH,
  },
  {
    Header: 'Cover url',
    accessor: 'cover',
    width: MEDIUM_TEXT_WIDTH,
  },
  {
    Header: 'Language',
    accessor: 'language',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Authors',
    accessor: 'authorsUuid',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Collection',
    accessor: 'collectionUuid',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Category',
    accessor: 'category',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Publisher',
    accessor: 'publisherUuid',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'RolePlaying Game',
    accessor: 'rolePlayingGameUuid',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'Edition',
    accessor: 'editionUuid',
    width: SHORT_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];

export interface ICampaignHeaderTypes extends BaseEntity {
  title?: string;
}

export const campaignHeaders: Column<ICampaignHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Title',
    accessor: 'title',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];

export interface IAdventureHeaderTypes extends BaseEntity {
  title?: string;
}

export const adventureHeaders: Column<IAdventureHeaderTypes>[] = [
  {
    Header: 'Uuid',
    accessor: 'uuid',
    width: UUID_WIDTH,
  },
  {
    Header: 'Title',
    accessor: 'title',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Created',
    accessor: 'userCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'User Modified',
    accessor: 'userModified',
    width: TINY_TEXT_WIDTH,
  },
  {
    Header: 'Last Modified',
    accessor: 'lastModified',
    width: TINY_TEXT_WIDTH,
  },
];
