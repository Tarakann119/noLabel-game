import ButtonImg from '../../ui/ButtonImg';
import Spacer from '../../ui/Spacer';
import UserCard from '../../components/UserCard';
import Rating from '../../components/Leaderboard';

const DevPage = () => {
  return (
    <div className='container-content container-content_main'>
      <ButtonImg
        variant='close'
        onClick={() => {
          console.log('lol');
        }}
      />
      <Spacer />
      <UserCard variant='header' userName='Мок Мок' />
      <Rating />
    </div>
  );
};
export default DevPage;
