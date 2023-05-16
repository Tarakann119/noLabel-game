export type InputValidateProps = {
  label?: string;
  name: string;
  type: 'text' | 'password' | 'search';
  value?: string | undefined;
  // Специально не типизируем, для повышения универсальности компонента
  error?: unknown;
  errorTitle?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
};
