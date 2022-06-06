/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import TextArea from '../forms/FormElements/TextArea';
import { Adventure, BaseEntity, Campaign } from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';
import { Fragment, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

export interface ICampaignForm {
  title?: string;
  description?: string;
  adventuresUuid?: string[];
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Campaign;
};

const CampaignForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICampaignForm>();

  const [adventureList, setAdventureList] = useState<Adventure[]>();
  const [adventuresSelected, setAdventuresSelected] = useState<Adventure[]>([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get('adventures/adventures?size=10000')
        .then((response) => {
          setAdventureList((_) => response.data.data);
          const adventures: Adventure[] = response.data.data;
          if (props.mode === ModalMode.UPDATE) {
            console.log(adventures);
            const adventuresFiltered = adventures.filter(
              (adventure) =>
                adventure.uuid &&
                props.dataToUpdate?.adventuresUuid?.includes(adventure.uuid)
            );
            setAdventuresSelected((_) => adventuresFiltered);
            console.log(adventuresFiltered);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  }, []);

  const onAdventureChange = (adventuresCheckbox: Adventure[]) => {
    setAdventuresSelected((_) => adventuresCheckbox);
  };

  const onSubmit: SubmitHandler<ICampaignForm> = (data) => {
    const adventureSet = new Set([
      ...adventuresSelected.map((adventure) => adventure.uuid ?? ''),
    ]);
    const campaign: Campaign = {
      uuid: props.dataToUpdate?.uuid,
      title: data.title,
      description: data.description,
      adventuresUuid: Array.from(adventureSet),
    };
    props.onConfirm<Campaign>(campaign);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold block border-l-[40px] pl-4 border-cyan-500">
        {props.mode === ModalMode.CREATE
          ? 'Add a new Campaign'
          : `Update Campaign: ${props.dataToUpdate?.title}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<ICampaignForm>
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

        <TextArea<ICampaignForm>
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

        {adventureList && (
          <div className="mt-6">
            <label className="block text-lg mb-1 pl-5 capitalize">
              Adventures
            </label>
            <Listbox
              value={adventuresSelected}
              onChange={onAdventureChange}
              multiple
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative h-12 w-full cursor-default rounded-full border-2 border-violet-500 bg-transparent py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {adventuresSelected
                      .map((adventure) => adventure.title)
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
                    {adventureList.map((adventure) => (
                      <Listbox.Option
                        key={adventure.uuid}
                        value={adventure}
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
                              {adventure.title}
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

export default CampaignForm;
