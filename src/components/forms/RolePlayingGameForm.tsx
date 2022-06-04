import { useForm, SubmitHandler } from 'react-hook-form';
import { urlValidationPattern } from '../../utils/patterns';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import TextArea from '../forms/FormElements/TextArea';
import { Publisher, RolePlayingGame } from '../../types/domain';

export interface IRolePlayingGameForm {
  title: string;
  subtitle?: string;
  description?: string;
  'picture url'?: string;
  'website url'?: string;
}

type Props = {
  onConfirm: <T>(t: T) => void;
  onCancel: () => void;
};

const RolePlayingGameForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRolePlayingGameForm>();

  const onSubmit: SubmitHandler<IRolePlayingGameForm> = (data) => {
    const newRolePlayingGame: RolePlayingGame = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      pictureUrl: data['picture url'],
      websiteUrl: data['website url'],
    };
    props.onConfirm<RolePlayingGame>(newRolePlayingGame);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold">Add a New Roleplaying Game</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IRolePlayingGameForm>
          label="title"
          placeholder="RolePlaying Game Title"
          register={register}
          required={true}
          errors={errors.title}
          errorMessage="RolePlaying Game Title is required"
        />

        <Input<IRolePlayingGameForm>
          label="subtitle"
          placeholder="RolePlaying Game Subtitle"
          register={register}
          required={false}
          errors={errors.subtitle}
          errorMessage="RolePlaying Game Subtitle is required"
        />

        <TextArea<IRolePlayingGameForm>
          label="description"
          placeholder="Enter the publisher description here..."
          register={register}
          required={false}
        />

        <Input<IRolePlayingGameForm>
          label="picture url"
          placeholder="Publisher picture url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors['picture url']}
          errorMessage="This is not a valid url"
        />

        <Input<IRolePlayingGameForm>
          label="website url"
          placeholder="Publisher website url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors['website url']}
          errorMessage="This is not a valid url"
        />

        <div className="flex gap-5 place-content-end mt-10">
          <Button
            type="submit"
            value="close"
            style="danger-outline"
            onClick={props.onCancel}
          />
          <Button type="submit" value="save" style="plain" />
        </div>
      </form>
    </div>
  );
};

export default RolePlayingGameForm;
