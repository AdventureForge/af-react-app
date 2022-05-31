export enum Category {
  GAME_MASTER_SCREEN = 'Game master screen',
  CORE_RULEBOOK = 'Core rulebook',
  RULEBOOK = 'Rulebook',
  ADVENTURE = 'Adventure',
  ATLAS = 'Atlas',
}

export type Publisher = {
  uuid?: string;
  name: string;
  websiteUrl?: string;
  description?: string;
  logo?: string;
  collections?: Collection[];
};

export type RolePlayingGame = {
  uuid?: string;
  title: string;
  subtitle?: string;
  description?: string;
  pictureUrl?: string;
  websiteUrl?: string;
  editions?: Edition[];
};

export type Edition = {
  uuid?: string;
  editionNumber: number;
  editionTitle: string;
  rolePlayingGames: RolePlayingGame[];
  collections?: Collection[];
};

export type Collection = {
  uuid?: string;
  title: string;
  description?: string;
  editions: Edition[];
  publishers: Publisher[];
  books?: Book[];
};

export type Book = {
  uuid?: string;
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
};

export type Author = {
  uuid: string;
  firstname: string;
  lastname: string;
  books: Book[];
};
