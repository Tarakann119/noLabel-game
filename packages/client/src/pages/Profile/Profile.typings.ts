export type UserKeys = 'Логин' | 'Имя' | 'Фамилия' | 'Почта' | 'Телефон';

export type FileType = {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
