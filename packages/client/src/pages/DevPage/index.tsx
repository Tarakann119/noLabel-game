import UserCard from '../../components/UserCard';

const DevPage = () => {
  return (
    <div className='container-content container-content_main'>
      <UserCard
        variant='header'
        buttonVariant='exit'
        userName='Jhon Doye'
        clickCard={() => {
          console.log('CLICK CARD');
        }}
        clickButton={() => {
          console.log('Click button');
        }}
      />
    </div>
  );
};
export default DevPage;
