import { useForm, SubmitHandler } from 'react-hook-form';
import { urlValidationPattern } from '../../utils/patterns';
import ButtonSubmit from '../ui/ButtonSubmit';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

export interface IPublisherForm {
  name?: string;
  'website url'?: string;
  description?: string;
  'logo url'?: string;
}

const PublisherForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPublisherForm>();
  const onSubmit: SubmitHandler<IPublisherForm> = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input<IPublisherForm>
        label="name"
        placeholder="Publisher name"
        register={register}
        required={true}
        errors={errors.name}
        errorMessage="Publisher name is required"
      />

      <Input<IPublisherForm>
        label="website url"
        placeholder="Publisher website url"
        register={register}
        required={false}
        pattern={urlValidationPattern}
        errors={errors['website url']}
        errorMessage="This is not a valid url"
      />

      <TextArea<IPublisherForm>
        label="description"
        placeholder="Enter the publisher description here..."
        register={register}
        required={false}
      />

      <Input<IPublisherForm>
        label="logo url"
        placeholder="Publisher logo url"
        register={register}
        required={false}
        pattern={urlValidationPattern}
        errors={errors['logo url']}
        errorMessage="This is not a valid url"
      />

      <ButtonSubmit value="save" />
    </form>
  );
};

export default PublisherForm;
