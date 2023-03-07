import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const ChangeAvatar = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const dispatch = useAppDispatch();
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
    dispatch(uploadAvatar(image));
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
  }, [files]);

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
      <Button type='button' text='Поменять' onClick={() => updateAvatar()} />
    </div>
  );
};
export default ChangeAvatar;
