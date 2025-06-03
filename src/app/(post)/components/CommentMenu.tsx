function CommentMenu({ isOpen, onEdit, onDelete }: { isOpen: boolean; onEdit: () => void; onDelete: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg z-50">
      <div className="py-1 text-gray-700">
        <button
          onClick={onEdit}
          className="w-[243px] h-10 px-4 py-1 text-left hover:text-gray-900 flex items-center justify-start gap-2"
        >
          <svg
            className="px-1"
            fill="currentColor"
            height="32"
            icon-name="edit-outline"
            viewBox="0 0 20 20"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m18.236 3.158-1.4-1.4a2.615 2.615 0 0 0-3.667-.021L1.336 13.318a1.129 1.129 0 0 0-.336.8v3.757A1.122 1.122 0 0 0 2.121 19h3.757a1.131 1.131 0 0 0 .8-.337L18.256 6.826a2.616 2.616 0 0 0-.02-3.668ZM5.824 17.747H2.25v-3.574l9.644-9.435L15.259 8.1l-9.435 9.647ZM17.363 5.952l-1.23 1.257-3.345-3.345 1.257-1.23a1.362 1.362 0 0 1 1.91.01l1.4 1.4a1.364 1.364 0 0 1 .008 1.908Z"></path>
          </svg>
          Edit Comment
        </button>
        <button onClick={onDelete} className="w-full px-4 py-2 text-left hover:text-gray-900 flex items-center gap-2">
          <svg
            className="px-1"
            fill="currentColor"
            height="32"
            icon-name="delete-outline"
            viewBox="0 0 20 20"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.751 6.023 17 6.106l-.761 11.368a2.554 2.554 0 0 1-.718 1.741A2.586 2.586 0 0 1 13.8 20H6.2a2.585 2.585 0 0 1-1.718-.783 2.553 2.553 0 0 1-.719-1.737L3 6.106l1.248-.083.761 11.369c-.005.333.114.656.333.908.22.252.525.415.858.458h7.6c.333-.043.64-.207.859-.46.22-.254.338-.578.332-.912l.76-11.363ZM18 2.983v1.243H2V2.983h4v-.372A2.737 2.737 0 0 1 6.896.718 2.772 2.772 0 0 1 8.875.002h2.25c.729-.03 1.44.227 1.979.716.538.488.86 1.169.896 1.893v.372h4Zm-10.75 0h5.5v-.372a1.505 1.505 0 0 0-.531-1.014 1.524 1.524 0 0 0-1.094-.352h-2.25c-.397-.03-.79.097-1.094.352-.304.256-.495.62-.531 1.014v.372Z"></path>
          </svg>
          Delete Comment
        </button>
      </div>
    </div>
  );
}
export default CommentMenu;
