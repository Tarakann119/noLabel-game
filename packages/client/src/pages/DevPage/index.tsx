import ButtonImg from '../../ui/ButtonImg';
import Spacer from '../../ui/Spacer';

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
    </div>
  );
};
export default DevPage;
