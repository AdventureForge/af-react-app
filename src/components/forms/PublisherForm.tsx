import useInput from '../../hooks/useInput';

const PublisherForm = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput<HTMLInputElement>((value) => value.trim() !== '');

  const {
    value: enteredWebsiteUrl,
    isValid: enteredWebsiteUrlIsValid,
    hasError: websiteUrlInputHasError,
    valueChangeHandler: websiteChangeHandler,
    inputBlurHandler: websiteUrlInputBlurHandler,
    reset: resetWebsiteUrlInput,
  } = useInput<HTMLInputElement>((value) => {
    const urlValidationPattern =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    return urlValidationPattern.test(value);
  });

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput,
  } = useInput<HTMLTextAreaElement>((_) => true);

  const {
    value: enteredLogoUrl,
    isValid: enteredLogoUrlIsValid,
    valueChangeHandler: logoUrlChangedHandler,
    inputBlurHandler: logoUrlInputBlurHandler,
    reset: resetLogoUrlInput,
  } = useInput<HTMLInputElement>((_) => true);

  const formIsValid =
    enteredNameIsValid &&
    enteredWebsiteUrlIsValid &&
    enteredDescriptionIsValid &&
    enteredLogoUrlIsValid;

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetNameInput();
    resetWebsiteUrlInput();
    resetDescriptionInput();
    resetLogoUrlInput();
  };
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <div>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          type="text"
          onChange={nameChangedHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div>
        <label htmlFor="websiteurl" className="block">
          Website URL
        </label>
        <input
          id="websiteurl"
          type="text"
          onChange={websiteChangeHandler}
          onBlur={websiteUrlInputBlurHandler}
          value={enteredWebsiteUrl}
        />
        {websiteUrlInputHasError && (
          <p className="error-text">Website url must be valid</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={descriptionChangedHandler}
          onBlur={descriptionInputBlurHandler}
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
          onChange={logoUrlChangedHandler}
          onBlur={logoUrlInputBlurHandler}
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
  );
};

export default PublisherForm;
