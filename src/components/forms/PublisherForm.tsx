import { useForm, SubmitHandler } from 'react-hook-form';
import { urlValidationPattern } from '../../utils/patterns';
import Button from '../ui/Button';
import Input from './FormElements/Input';
import TextArea from '../forms/FormElements/TextArea';
import { BaseEntity, Publisher } from '../../types/domain';
import { ModalMode } from '../admin/AdminContent';

export interface IPublisherForm {
  name: string;
  'website url'?: string;
  description?: string;
  'logo url'?: string;
}

type Props = {
  onConfirm: <T extends BaseEntity>(t: T) => void;
  onCancel: () => void;
  mode: ModalMode;
  dataToUpdate?: Publisher;
};

const PublisherForm: React.FC<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPublisherForm>();

  const onSubmit: SubmitHandler<IPublisherForm> = (data) => {
    console.log(data);
    const publisher: Publisher = {
      uuid: props.dataToUpdate?.uuid,
      name: data.name,
      description: data.description,
      websiteUrl: data['website url'],
      logo: data['logo url'],
    };
    props.onConfirm<Publisher>(publisher);
  };

  return (
    <div className="px-28 overflow-y-auto">
      <h2 className="text-3xl font-semibold block border-l-[40px] pl-4 border-cyan-500">
        {props.mode === ModalMode.CREATE
          ? 'Add a new publisher'
          : `Update publisher: ${props.dataToUpdate?.uuid}`}
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input<IPublisherForm>
          label="name"
          placeholder="Publisher name"
          register={register}
          required={true}
          errors={errors.name}
          errorMessage="Publisher name is required"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.name
              : undefined
          }
        />

        <Input<IPublisherForm>
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

        <TextArea<IPublisherForm>
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

        <Input<IPublisherForm>
          label="logo url"
          placeholder="Publisher logo url"
          register={register}
          required={false}
          pattern={urlValidationPattern}
          errors={errors['logo url']}
          errorMessage="This is not a valid url"
          defaultValue={
            props.mode === ModalMode.UPDATE
              ? props.dataToUpdate?.logo
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

export default PublisherForm;
