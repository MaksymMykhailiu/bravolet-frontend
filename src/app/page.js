import Image from 'next/image'

export default function Home() {
  return (
    <main 
      className="flex w-full min-h-screen flex-col bg-cover bg-no-repeat items-center justify-between overflow-hidden bg-[url(https://tecdn.b-cdn.net/img/new/slides/041.webp)]"
    >
      <div className="buttom-0 left-0 right-0 top-0 overflow-hidden bg-fixed w-full h-full" style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col text-white items-center'>
            <h2 className='mb-4 text-4xl font-semibold'>Bravolet</h2>
            <h4 className='mb-6 text-xl font-semibold'>Fantastical Real Estate</h4>
            <button
              type='button'
              className='rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium leading-normal text-neutral-50 transition duration-150 ease-inout hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
              data-te-ripple-init
              data-te-ripple-color="light">
                Start for now!
              </button>
          </div>
        </div>
      </div>
    </main>
  )
}
