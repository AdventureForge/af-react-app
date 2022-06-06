import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import { BaseEntity, Author } from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';

export interface IAuthorForm {
  firstname: string;
  lastname: string;
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Author;
};

const AuthorForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthorForm>();

  const onSubmit: SubmitHandler<IAuthorForm> = (data) => {
    console.log(data);
    const author: Author = {
      uuid: props.dataToUpdate?.uuid,
      firstname: data.firstname,
      lastname: data.lastname,
    };
    props.onConfirm<Author>(author);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold block border-l-[40px] pl-4 border-cyan-500">
        {props.mode === ModalMode.CREATE
          ? 'Add a new Author'
          : `Update Author: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IAuthorForm>
          label="firstname"
          placeholder="Firstname"
          register={register}
          required={true}
          errors={errors.firstname}
          errorMessage="Firstname is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.firstname
              : undefined
          }
        />

        <Input<IAuthorForm>
          label="lastname"
          placeholder="Lastname"
          register={register}
          required={false}
          errors={errors.lastname}
          errorMessage="lastname is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.lastname
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

export default AuthorForm;
