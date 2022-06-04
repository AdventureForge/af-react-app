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
  collections?: Collection[];
}

export interface RolePlayingGame extends BaseEntity {
  title: string;
  subtitle?: string;
  description?: string;
  pictureUrl?: string;
  websiteUrl?: string;
  editions?: Edition[];
}

export interface Edition extends BaseEntity {
  editionNumber: number;
  editionTitle: string;
  rolePlayingGames: RolePlayingGame[];
  collections?: Collection[];
}

export interface Collection extends BaseEntity {
  title: string;
  description?: string;
  editions: Edition[];
  publishers: Publisher[];
  books?: Book[];
}

export interface Book extends BaseEntity {
  title: string;
  subtitle?: string;
  cover?: string;
  description?: string;
  language?: string;
  isbn: string;
  authors: Author[];
  collections: Collection[];
  category: Category;
  publishers?: Publisher[];
  rolePlayingGames?: RolePlayingGame[];
  editions?: Edition[];
}

export interface Author extends BaseEntity {
  firstname: string;
  lastname: string;
  books: Book[];
}

export interface PageInfo {
  firstElement: boolean;
  lastElement: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
