import {act, renderHook} from '@testing-library/react-native';

import {useForm} from '@hooks';

import {useSignInViewModel} from '../SignIn.viewModel';

const useFormMock = useForm as jest.Mock<ReturnType<typeof useForm>>;

jest.mock('../../../../helpers/hooks/useForm');
const redirectToHome = jest.fn();

const handleFormData = jest.fn();

const submit = jest.fn();

beforeAll(() => {
  useFormMock.mockImplementation(() => ({
    errors: null,
    formData: {
      email: 'johndoe@email.com',
      name: 'John doe',
    },
    handleFormData,
    loading: false,
    submit,
  }));
});
describe('SignInViewModel', () => {
  it('render hook correctly', () => {
    const {result} = renderHook(() => useSignInViewModel({redirectToHome}));

    expect(result.current.errors).toEqual(null);
    expect(result.current.loading).toEqual(false);
    expect(result.current.formData).toEqual({
      email: 'johndoe@email.com',
      name: 'John doe',
    });
  });

  it('change form data called correctly', () => {
    const {result} = renderHook(() => useSignInViewModel({redirectToHome}));

    act(() => {
      result.current.handleFormData('email', 'johndoe2@email.com');
    });

    expect(handleFormData).toBeCalledWith('email', 'johndoe2@email.com');
  });

  it('called submit function correctly', () => {
    const {result} = renderHook(() => useSignInViewModel({redirectToHome}));

    act(() => {
      result.current.submit();
    });

    expect(submit).toBeCalled();
  });
});
