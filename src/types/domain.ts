export enum Category {
  GAME_MASTER_SCREEN = 'Game master screen',
  CORE_RULEBOOK = 'Core rulebook',
  RULEBOOK = 'Rulebook',
  ADVENTURE = 'Adventure',
  ATLAS = 'Atlas',
}

export interface BaseEntity {
  uuid?: string;
  dateCreated?: string;
  lastModified?: string;
  userCreated?: string;
  userModified?: string;
}

export interface Publisher extends BaseEntity {
  name?: string;
  websiteUrl?: string;
  description?: string;
  logo?: string;
}

export interface RolePlayingGame extends BaseEntity {
  title?: string;
  subtitle?: string;
  description?: string;
  pictureUrl?: string;
  websiteUrl?: string;
}

export interface Edition extends BaseEntity {
  editionNumber: number;
  editionTitle: string;
  rolePlayingGameUuid: string;
}

export interface Collection extends BaseEntity {
  title: string;
  description?: string;
  editionUuid?: string;
  publisherUuid?: string;
  rolePlayingGameUuid?: string;
}

export interface Book extends BaseEntity {
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

export interface Author extends BaseEntity {
  firstname: string;
  lastname: string;
}

export interface Campaign extends BaseEntity {
  title?: string;
  description?: string;
  adventuresUuid?: string[];
}

export interface Adventure extends BaseEntity {
  title?: string;
  description?: string;
  campaignUuid?: string;
  adventuresUuid?: string[];
  scenesUuid?: string[];
  appendicesUuid?: string[];
  nextAdventuresUuid: string[];
  previousAdventuresUuid: string[];
  npcsUuid: string[];
  placesUuid: string[];
}

export interface PageInfo {
  firstElement: boolean;
  lastElement: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
