import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useLoading } from '../../components/LoaderComponent';
import Loader from '../../ui/Loader';

const ChangeAvatar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>([]);
  const [fieldError, setFieldError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, setLoading } = useLoading();
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
    console.log(files);
    const filename = files[0].filename ?? files[0].path.split('/').reverse()[0];
    const image = {
      name: filename,
      uri: files[0].path,
      type: files[0].type,
    };
    try {
      const result = await axios.put(`https://ya-praktikum.tech/api/v2/user/profile/avatar`, image);
      const response = result as AxiosResponse;
      return response.data.uri;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Что-то пошло не так, попробуйте снова');
        setFieldError(error.response?.data.reason);
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFile = (file: any) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div key={file.lastModified} className='container-content container-content_main'>
      <div>
        <div onClick={removeFile(file)}>Закрыть</div>
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
    <>
      {loading && <Loader />}
      <h2>смена аватара</h2>
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {!files.length && <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <aside>{thumbs}</aside>
      </section>
      <div>{fieldError}</div>
      <button type='button' onClick={() => _updateAvatar()}>
        Поменять
      </button>
    </>
  );
};
export default ChangeAvatar;
