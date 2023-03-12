import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { showError } from '../../../utils/ShowError';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';

type FileType = {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const ChangeAvatar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const _updateAvatar = async () => {
    const image = new FormData();
    image.append('avatar', files[0]);
    try {
      const result = await axios(`https://ya-praktikum.tech/api/v2/user/profile/avatar`, {
        method: 'put',
        data: image,
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data;',
        },
        withCredentials: true,
      });
      const response = result as AxiosResponse;
      toast.success('Аватар изменен');
      return response.data.uri;
    } catch (error) {
      showError();
    }
  };
  const removeFile = (file: FileType) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div key={file.lastModified} className='container-content container-content_main'>
      <div>
        <Button type='button' text='Удалить' onClick={() => removeFile(file)} />
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <Title text='Смена автара' />
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {!files.length && <p>Нажмите для выбора или перетащите сюда изображение</p>}
        </div>
        <aside>{thumbs}</aside>
      </section>
      <Button type='button' text='Поменять' onClick={() => _updateAvatar()} />
    </div>
  );
};
export default ChangeAvatar;
