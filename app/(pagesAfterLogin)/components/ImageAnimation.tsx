
import Link from 'next/link'
import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
function ImageAnimation({image, alt, text, iNeedHelp } : any) {


  return (
 <div className='flex flex-col items-center justify-center text-center  rounded-lg'>
     <Player
  autoplay
  loop
  src={image}
  style={{ height: '300px', width: '300px' }}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>
      <p className='break-words bg-emerald-700 text-white rounded p-1 px-2 w-11/12 lg:w-auto'>{text}</p>

      {iNeedHelp && <Link href={"https://www.linkedin.com/in/thiago-tawan/"} className='w-full lg:w-auto' target='_blank'>
        <button className='bg-sky-400 w-7/12  lg:w-48 hover:bg-emerald-600 text-white mt-4 rounded-lg p-2'>Linkedin</button>
        </Link>}
 </div>
  )
}

export default ImageAnimation