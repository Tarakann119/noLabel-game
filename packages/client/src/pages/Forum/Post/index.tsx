import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { Pagination } from '@components/Pagination';
import { Post as PostItem } from '@components/Post';
import { currentUser } from '@store/selectors';
import { Field, FieldProps, Form, Formik } from 'formik';

import postCommentsMock from './PostCommentsMock';
import postMock from './PostMock';

import './index.scss';

export const Post = () => {
  const user = useSelector(currentUser);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = postCommentsMock.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(postCommentsMock.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * itemsPerPage) % postCommentsMock.length;
    setItemOffset(newOffset);
  };

  return (
    <main className='main main-bg main-h post-page forum-page container'>
      <div className='post-page__content'>
        <div className='post-page__main'>
          <PostItem isTopicStarter={true} data={postMock} />
        </div>

        <div className='post-page__comments'></div>

        <div className='post-page__comments'>
          {currentItems.map((data) => (
            <PostItem data={data} key={data.id} />
          ))}

          <Pagination
            className='forum-page__pagination'
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </div>

        {user ? (
          <Formik
            initialValues={{
              message: '',
            }}
            onSubmit={(values) => {
              console.log(values);
            }}>
            {() => (
              <Form className='form post-page__form'>
                <Field name='message'>
                  {({ field }: FieldProps) => (
                    <div className='form-control'>
                      <label htmlFor={field.name} className='form-control__label'>
                        Ваш комментарий
                      </label>

                      {/* Заменить на редактор сообщений */}
                      <textarea
                        className='post-page__message form-control__input'
                        {...field}></textarea>
                    </div>
                  )}
                </Field>
                <Button type='submit' className='post-page__send' view='outline'>
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className='post-page__not-authorized'>
            <Link to='/login'>Войдите</Link> или <Link to='/signup'>зарегистрируйтесь</Link> чтобы
            оставлять комментарии.
          </div>
        )}
      </div>
    </main>
  );
};
