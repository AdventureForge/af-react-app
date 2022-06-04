import { useForm, SubmitHandler } from 'react-hook-form';
import { urlValidationPattern } from '../../utils/patterns';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import TextArea from '../forms/FormElements/TextArea';
import { BaseEntity, RolePlayingGame } from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';

export interface IRolePlayingGameForm {
  title: string;
  subtitle?: string;
  description?: string;
  'picture url'?: string;
  'website url'?: string;
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: RolePlayingGame;
};

const RolePlayingGameForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRolePlayingGameForm>();

  const onSubmit: SubmitHandler<IRolePlayingGameForm> = (data) => {
    const rolePlayingGame: RolePlayingGame = {
      uuid: props.dataToUpdate?.uuid,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      pictureUrl: data['picture url'],
      websiteUrl: data['website url'],
    };
    props.onConfirm<RolePlayingGame>(rolePlayingGame);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold">
        {' '}
        {props.mode === ModalMode.CREATE
          ? 'Add a New Roleplaying Game'
          : `Update Roleplaying Game: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IRolePlayingGameForm>
          label="title"
          placeholder="RolePlaying Game Title"
          register={register}
          required={true}
          errors={errors.title}
          errorMessage="RolePlaying Game Title is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.title
              : undefined
          }
        />

        <Input<IRolePlayingGameForm>
          label="subtitle"
          placeholder="RolePlaying Game Subtitle"
          register={register}
          required={false}
          errors={errors.subtitle}
          errorMessage="RolePlaying Game Subtitle is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.subtitle
              : undefined
          }
        />

        <TextArea<IRolePlayingGameForm>
          label="description"
          placeholder="Enter the publisher description here..."
          register={register}
          required={false}
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.description
              : undefined
          }
        />

        <Input<IRolePlayingGameForm>
          label="picture url"
          placeholder="Publisher picture url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors['picture url']}
          errorMessage="This is not a valid url"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.pictureUrl
              : undefined
          }
        />

        <Input<IRolePlayingGameForm>
          label="website url"
          placeholder="Publisher website url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors['website url']}
          errorMessage="This is not a valid url"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.websiteUrl
              : undefined
          }
        />

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

export default RolePlayingGameForm;
