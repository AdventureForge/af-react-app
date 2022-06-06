/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  isbnValidationPattern,
  urlValidationPattern,
} from '../../utils/patterns';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import TextArea from '../forms/FormElements/TextArea';
import {
  Author,
  BaseEntity,
  Book,
  Category,
  Collection,
} from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';
import Select from './FormElements/Select';
import { Fragment, useEffect, useState } from 'react';
import FormErrorMessage from './FormElements/FormErrorMessage';
import useAxios from '../../hooks/useAxios';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

export interface IBookForm {
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

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Book;
};

const locales = [
  { locale: 'en', lang: 'english' },
  { locale: 'fr', lang: 'french' },
];

const BookForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IBookForm>();

  const [authorList, setAuthorList] = useState<Author[]>();
  const [authorsSelected, setAuthorsSelected] = useState<Author[]>([]);
  const [collectionList, setCollectionList] = useState<Collection[]>();
  const [collectionSelected, setCollectionSelected] = useState<Collection>();
  const axiosInstance = useAxios();

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get('games/authors?size=10000')
        .then((response) => {
          setAuthorList((_) => response.data.data);
          const authors: Author[] = response.data.data;
          if (props.mode === ModalMode.UPDATE) {
            console.log(authors);
            const authorsFiltered = authors.filter(
              (author) =>
                author.uuid &&
                props.dataToUpdate?.authorsUuid?.includes(author.uuid)
            );
            setAuthorsSelected((_) => authorsFiltered);
            console.log(authorsFiltered);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  }, []);

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get('games/collections?size=10000')
        .then((response) => {
          setCollectionList((_) => response.data.data);
          const collections: Collection[] = response.data.data;
          if (props.mode === ModalMode.UPDATE) {
            setCollectionSelected((_) =>
              collections.find(
                (col) => col.uuid === props.dataToUpdate?.collectionUuid
              )
            );
          } else {
            setCollectionSelected((_) => collections[0]);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  }, []);

  const onCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCollectionSelected(
      collectionList?.find(
        (collection) => collection.uuid === event.target.value
      )
    );
  };

  const onAuthorChange = (authorsCheckbox: Author[]) => {
    setAuthorsSelected((prev) => authorsCheckbox);
  };

  const onSubmit: SubmitHandler<IBookForm> = (data) => {
    const authorSet = new Set([
      ...authorsSelected.map((author) => author.uuid ?? ''),
    ]);
    const book: Book = {
      uuid: props.dataToUpdate?.uuid,
      title: data.title,
      subtitle: data.subtitle,
      cover: data.cover,
      description: data.description,
      language: data.language,
      isbn: data.isbn,
      authorsUuid: Array.from(authorSet),
      collectionUuid: collectionSelected?.uuid,
      category: data.category,
    };
    props.onConfirm<Book>(book);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold block border-l-[40px] pl-4 border-cyan-500">
        {props.mode === ModalMode.CREATE
          ? 'Add a new Book'
          : `Update Book: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IBookForm>
          label="title"
          placeholder="Title"
          register={register}
          required={true}
          errors={errors.title}
          errorMessage="Title is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.title
              : undefined
          }
        />

        <Input<IBookForm>
          label="subtitle"
          placeholder="Subtitle"
          register={register}
          required={false}
          errors={errors.subtitle}
          errorMessage="Subtitle is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.subtitle
              : undefined
          }
        />

        <Input<IBookForm>
          label="cover"
          placeholder="Cover url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors.cover}
          errorMessage="This is not a valid url"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.cover
              : undefined
          }
        />

        <TextArea<IBookForm>
          label="description"
          placeholder="Enter the book description here..."
          register={register}
          required={false}
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.description
              : undefined
          }
        />

        <Input<IBookForm>
          label="isbn"
          placeholder="ISBN"
          register={register}
          required={true}
          pattern={isbnValidationPattern}
          errors={errors.cover}
          errorMessage="This is not a valid ISBN"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.isbn
              : undefined
          }
        />

        {authorList && (
          <div className="mt-6">
            <label className="block text-lg mb-1 pl-5 capitalize">
              Auteurs
            </label>
            <Listbox value={authorsSelected} onChange={onAuthorChange} multiple>
              <div className="relative mt-1">
                <Listbox.Button className="relative h-12 w-full cursor-default rounded-full border-2 border-violet-500 bg-transparent py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {authorsSelected
                      .map((author) => `${author.firstname} ${author.lastname}`)
                      .join(', ')}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {authorList.map((author) => (
                      <Listbox.Option
                        key={author.uuid}
                        value={author}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-violet-500 text-violet-100'
                              : 'text-violer-100'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate text-violet-100 ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {`${author.firstname} ${author.lastname}`}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        )}

        {collectionList && collectionSelected && (
          <Select<IBookForm>
            label="collectionUuid"
            register={register}
            required={true}
            htmlFor="collection"
            dataList={collectionList}
            defaultValue={collectionSelected?.uuid}
            optionKey="uuid"
            optionValue="title"
            onChange={onCollectionChange}
          />
        )}

        <div className="mt-6">
          <label
            htmlFor="category"
            className="block text-lg mb-1 pl-5 capitalize"
          >
            Category
          </label>
          <div className="border-2 border-violet-500 rounded-full py-2 px-8">
            <select
              {...register('category', { required: true })}
              name="category"
              className="inline-block bg-slate-900 text-violet-100"
              defaultValue={Category.ADVENTURE}
            >
              {Object.keys(Category).map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <FormErrorMessage>{'You must choose a category'}</FormErrorMessage>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="language"
            className="block text-lg mb-1 pl-5 capitalize"
          >
            Language
          </label>
          <div className="border-2 border-violet-500 rounded-full py-2 px-8">
            <select
              {...register('language', { required: true })}
              name="language"
              className="inline-block bg-slate-900 text-violet-100"
              defaultValue={locales[0].locale}
            >
              {locales.map((locale) => (
                <option
                  key={locale.locale}
                  value={locale.locale}
                  className="bg-slate-900"
                >
                  {locale.lang}
                </option>
              ))}
            </select>
          </div>
          {errors.language && (
            <FormErrorMessage>{'You must choose a language'}</FormErrorMessage>
          )}
        </div>

        <div className="flex gap-5 place-content-end mt-10">
          <Button
            type="submit"
            value="close"
            style="danger-outline"
            onClick={props.onCancel}
          />
          <Button
            type="submit"
            value={props.mode === ModalMode.CREATE ? 'create' : 'update'}
            style="plain"
          />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
