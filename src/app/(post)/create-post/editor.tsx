// import TextareaAutosize from 'react-textarea-autosize'

export const Editor = () => {
  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='create-post'
        className='w-fit'
        onSubmit={() =>{}}>
        <div className=''>
          {/* <TextareaAutosize
            
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          /> */}

          <input type="text" placeholder="title"/>
          <div id='editor' className='min-h-[500px]' />
          
        </div>
      </form>
    </div>
  )
}