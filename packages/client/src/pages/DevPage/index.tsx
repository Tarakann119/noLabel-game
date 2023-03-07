import ButtonImg from '../../ui/ButtonImg';

const DevPage = () => {
  return (
    <div className='container-content container-content_main'>
      <ButtonImg
        variant='close'
        onClick={() => {
          console.log('lol');
        }}
      />
    </div>
  );
};
export default DevPage;
