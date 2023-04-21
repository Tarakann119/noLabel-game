import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router';
import classNames from 'classnames';

import { uploadAvatar } from '@/components/Autification/slice';
import { Button } from '@/components/Button';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import { FileType } from './Profile.typings';

export const ChangeAvatar = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        ) as unknown as FileType[]
      );
    },
  });

  const updateAvatar = async () => {
    const image = new FormData();
    image.append('avatar', files[0] as unknown as string | Blob);
    dispatch(uploadAvatar({ navigate: navigate, image: image }));
  };
  const removeFile = (file: FileType) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div key={file.lastModified} className='container-content container-content_main'>
      <div>
        <Button type='button' text='Удалить' onClick={() => removeFile(file)} />
        <img
          style={{ maxHeight: '400px', maxWidth: '400px' }}
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt='Аватар'
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <div className='container_center colum-6'>
        <Title text='Смена автара' />
        <section className='container'>
          <div
            {...getRootProps({
              className: classNames(
                { 'dropzone change-avatar__drop-zone': !files.length },
                { hidden: files.length }
              ),
            })}>
            <input {...getInputProps()} />
            {!files.length && (
              <p className='change-avatar__drop-zone-title'>
                Нажмите для выбора или перетащите сюда изображение
              </p>
            )}
          </div>
          <aside>{thumbs}</aside>
        </section>
        <Button type='button' text='Поменять' onClick={() => updateAvatar()} />
      </div>
    </div>
  );
};
