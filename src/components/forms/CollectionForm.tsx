import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import {
  BaseEntity,
  Collection,
  Edition,
  Publisher,
  RolePlayingGame,
} from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import TextArea from './FormElements/TextArea';
import Select from './FormElements/Select';

export interface ICollectionForm {
  title: string;
  description?: string;
  edition: string;
  publisher: string;
  rolePlayingGame: string;
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Collection;
};

const CollectionForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICollectionForm>();
  const [rolePlayingGamesList, setRolePlayingGamesList] = useState<
    RolePlayingGame[]
  >([]);
  const [editionList, setEdtionList] = useState<Edition[]>([]);
  const [publisherList, setPublisherList] = useState<Publisher[]>([]);
  const [rpgSelected, setRpgSelected] = useState<RolePlayingGame>();
  const [editionSelected, setEditionSelected] = useState<Edition>();
  const [publisherSelected, setPublisherSelected] = useState<Publisher>();
  const axiosInstance = useAxios();

  useEffect(() => {
    setRpgSelected(rolePlayingGamesList[0]);
  }, [rolePlayingGamesList]);

  useEffect(() => {
    setEditionSelected(editionList[0]);
  }, [editionList]);

  useEffect(() => {
    setPublisherSelected(publisherList[0]);
  }, [publisherList]);

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get('games/roleplayinggames?size=10000')
        .then((response) => {
          console.log(response.data.data);
          setRolePlayingGamesList(response.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => console.log('end fetch'));

    !!axiosInstance.current &&
      axiosInstance.current
        .get('games/publishers?size=10000')
        .then((response) => {
          console.log(response.data.data);
          setPublisherList(response.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => console.log('end fetch'));
  }, []);

  useEffect(() => {
    !!axiosInstance.current &&
      axiosInstance.current
        .get(`games/editions/roleplayinggame/${rpgSelected?.uuid}?size=10000`)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.data.length === 0) {
            setEdtionList([]);
          } else {
            setEdtionList(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => console.log('end fetch'));
  }, [rpgSelected]);

  const onRpgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRpgSelected(
      rolePlayingGamesList.find((rpg) => rpg.uuid === event.target.value)
    );
  };

  const onEditionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditionSelected(
      editionList.find((edition) => edition.uuid === event.target.value)
    );
  };

  const onPublisherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPublisherSelected(
      publisherList.find((publisher) => publisher.uuid === event.target.value)
    );
  };

  const onSubmit: SubmitHandler<ICollectionForm> = (data) => {
    console.log(data);
    const collection: Collection = {
      uuid: props.dataToUpdate?.uuid,
      title: data.title,
      description: data.description,
      editionUuid: data.edition,
      publisherUuid: data.publisher,
    };
    props.onConfirm<Collection>(collection);
  };

  return (
    <div className="w-2/3 m-auto overflow-y-auto">
      <h2 className="text-3xl font-semibold">
        {' '}
        {props.mode === ModalMode.CREATE
          ? 'Add a New Collection'
          : `Update Collection: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {rolePlayingGamesList.length > 0 && (
          <Select<ICollectionForm>
            label="rolePlayingGame"
            register={register}
            required={true}
            htmlFor="rolePlayingGame"
            dataList={rolePlayingGamesList}
            errors={errors.rolePlayingGame}
            errorMessage="A RolePlaying game is required"
            defaultValue={rpgSelected?.uuid}
            optionKey="uuid"
            optionValue="title"
            onChange={onRpgChange}
          />
        )}

        {publisherList.length > 0 && (
          <Select<ICollectionForm>
            label="publisher"
            register={register}
            required={true}
            htmlFor="publisher"
            dataList={publisherList}
            errors={errors.publisher}
            errorMessage="Publisher is required"
            defaultValue={publisherSelected?.uuid}
            optionKey="uuid"
            optionValue="name"
            onChange={onPublisherChange}
          />
        )}

        {editionList.length > 0 && (
          <Select<ICollectionForm>
            label="edition"
            register={register}
            required={true}
            htmlFor="edition"
            dataList={editionList}
            errors={errors.edition}
            errorMessage="An Edition is required"
            defaultValue={editionSelected?.uuid}
            optionKey="uuid"
            optionValue="editionTitle"
            onChange={onEditionChange}
          />
        )}
        {editionList.length === 0 && (
          <p className="text-red-400 mt-6">
            You must first create an edition for this game
          </p>
        )}

        {rpgSelected && editionSelected && publisherSelected && (
          <>
            <Input<ICollectionForm>
              label="title"
              placeholder="Edition Title"
              register={register}
              required={true}
              errors={errors.title}
              errorMessage="Edition Title is required"
              defaultValue={
                props.mode === ModalMode.UPDATE
                  ? props.dataToUpdate?.title
                  : undefined
              }
            />

            <TextArea<ICollectionForm>
              label="description"
              placeholder="Edition Description"
              register={register}
              required={false}
              errors={errors.description}
              errorMessage="Edition description error"
              defaultValue={
                props.mode === ModalMode.UPDATE
                  ? props.dataToUpdate?.description
                  : undefined
              }
            />
          </>
        )}

        <div className="flex gap-5 place-content-end mt-10">
          <Button
            type="submit"
            value="close"
            style="danger-outline"
            onClick={props.onCancel}
          />
          {rpgSelected && editionSelected && publisherSelected && (
            <Button
              type="submit"
              value={props.mode === ModalMode.CREATE ? 'create' : 'update'}
              style="plain"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
