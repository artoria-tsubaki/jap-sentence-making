import ReactLoading from 'react-loading';

const Loading = ({ loadingTip = "Loading" } : { loadingTip?: string }) => (
  <div className='w-screen h-screen flex flex-col items-center justify-center flex-wrap gap-4'>
    <ReactLoading type="spinningBubbles" color="rgb(56, 189, 248)" height={50} width={50} />
    <h3 className='text-center text-base text-sky-400'>{ loadingTip }</h3>
  </div>
);

export default Loading;