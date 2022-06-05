import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import { BaseEntity, Edition, RolePlayingGame } from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import FormErrorMessage from './FormElements/FormErrorMessage';

export interface IEditionForm {
  editionNumber: number;
  editionTitle: string;
  rolePlayingGame: string;
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Edition;
};

const EditionForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditionForm>();
  const [rolePlayingGamesList, setRolePlayingGamesList] = useState<
    RolePlayingGame[]
  >([]);
  const [rpgSelected, setRpgSelected] = useState(rolePlayingGamesList[0]);
  const axiosInstance = useAxios();

  useEffect(() => {
    setRpgSelected(
      rolePlayingGamesList.find(
        (rpg) => rpg.uuid === props.dataToUpdate?.rolePlayingGameUuid
      ) ?? rolePlayingGamesList[0]
    );
  }, [rolePlayingGamesList]);

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
  }, []);

  const onSubmit: SubmitHandler<IEditionForm> = (data) => {
    console.log(data);
    const edition: Edition = {
      uuid: props.dataToUpdate?.uuid,
      editionTitle: data.editionTitle,
      editionNumber: data.editionNumber,
      rolePlayingGameUuid: data.rolePlayingGame,
    };
    props.onConfirm<Edition>(edition);
  };

  return (
    <div className="w-2/3 m-auto overflow-y-auto">
      <h2 className="text-3xl font-semibold">
        {' '}
        {props.mode === ModalMode.CREATE
          ? 'Add a New Edition'
          : `Update Edition: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IEditionForm>
          label="editionTitle"
          placeholder="Edition Title"
          register={register}
          required={true}
          errors={errors.editionTitle}
          errorMessage="Edition Title is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.editionTitle
              : undefined
          }
        />

        <Input<IEditionForm>
          label="editionNumber"
          placeholder="Edition Number"
          register={register}
          required={true}
          errors={errors.editionNumber}
          errorMessage="Edition number is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.editionNumber
              : undefined
          }
        />

        {rpgSelected && (
          <div className="mt-7">
            <label
              htmlFor="rolePlayingGame"
              className="block text-lg mb-1 pl-5 capitalize"
            >
              RolePlaying Game
            </label>
            <div className="border-2 border-violet-500 rounded-full py-2 px-8">
              <select
                {...register('rolePlayingGame', { required: true })}
                name="rolePlayingGame"
                className="inline-block bg-slate-900 text-violet-100"
                defaultValue={rpgSelected.uuid}
              >
                {rolePlayingGamesList.map((rpg) => (
                  <option
                    key={rpg.uuid}
                    value={rpg.uuid}
                    className="bg-slate-900"
                  >
                    {rpg.title}
                  </option>
                ))}
              </select>
            </div>
            {errors.rolePlayingGame && (
              <FormErrorMessage>
                {'You must choose a roleplaying game'}
              </FormErrorMessage>
            )}
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

export default EditionForm;
