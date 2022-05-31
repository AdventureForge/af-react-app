import { useState, useEffect, ChangeEventHandler } from 'react';
import Section from '../components/layout/Section';
import SideNavBar from '../components/layout/SideNavBar';
import Button from '../components/ui/Button';
import useAxios from '../hooks/useAxios';
import { toEntries } from '../types/functions';

type PageContent = {
  value: string;
  url: string;
};

const items: PageContent[] = [
  { value: 'Publishers', url: 'games/publishers' },
  { value: 'Roleplaying Games', url: 'games/roleplayinggames' },
  { value: 'Collections', url: 'games/collections' },
  { value: 'Authors', url: 'games/authors' },
  { value: 'Books', url: 'games/books' },
  { value: 'Adventures', url: 'adventures/adventures' },
];

const Admin = () => {
  const [pageContent, setPageContent] = useState<PageContent>(items[0]);
  const [dataReturned, setDataReturned] = useState(false);
  const axiosInstance = useAxios();
  const [enteredName, setEnteredName] = useState('');
  const [enteredWebsiteUrl, setEnteredWebSiteUrl] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredLogoUrl, setEnteredLogoUrl] = useState('');

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get(`${pageContent.url}`)
        .then((response) => {
          if (response.data.length == 0) {
            console.log('no data');
            setDataReturned(false);
          }
        })
        .catch((error) => console.log(error.response));
  }, [pageContent]);

  const onNavItemClick = (itemClicked: string) => {
    for (const [index, item] of toEntries(items)) {
      if (item.value === itemClicked) {
        setPageContent(items[index]);
        return;
      }
    }
    setPageContent(items[0]);
  };

  const onNameChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
    setEnteredName(input.target.value);
  };

  const onWebUrlChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
    setEnteredWebSiteUrl(input.target.value);
  };

  const onLogoUrlChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
    setEnteredLogoUrl(input.target.value);
  };

  const onDescriptionChange = (
    input: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(input.target.value);
    setEnteredDescription(input.target.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <div className="grid grid-cols-5 h-full">
      <SideNavBar items={items} onClick={onNavItemClick} />
      <Section className="col-span-4 py-5">
        <h1 className="text-white text-3xl font-semibold block border-l-[40px] pl-5 border-l-cyan-500">
          {pageContent.value}
        </h1>
        <p>No {pageContent.value.toLowerCase()} found, create one : </p>
        {!dataReturned && (
          <form className="flex flex-col" onSubmit={onFormSubmit}>
            <div>
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                id="name"
                type="text"
                onChange={onNameChange}
                value={enteredName}
              />
            </div>
            <div>
              <label htmlFor="websiteurl" className="block">
                Website URL
              </label>
              <input
                id="websiteurl"
                type="text"
                onChange={onWebUrlChange}
                value={enteredWebsiteUrl}
              />
            </div>
            <div>
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={onDescriptionChange}
                value={enteredDescription}
                className="block"
              />
            </div>
            <div>
              <label htmlFor="logoUrl" className="block">
                Logo url
              </label>
              <input
                id="logoUrl"
                name="logoUrl"
                type="text"
                onChange={onLogoUrlChange}
                value={enteredLogoUrl}
                className="block"
              />
            </div>
            <button
              value="save"
              type="submit"
              className="block border-2 rounded-full font-semibold w-40 py-2 px-8 cursor-pointer text-base border-violet-500 active:bg-violet-900 active:scale-105 transition ease-in-out bg-violet-500 text-white hover:bg-violet-800"
            >
              Save
            </button>
          </form>
        )}
      </Section>
    </div>
  );
};

export default Admin;
