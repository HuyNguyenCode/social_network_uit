import React from 'react';

interface PostInteractionProps {
  netVote: number;          // Số vote
  cCount: number;   // Số lượng bình luận (commentCount)
  votetype?: number; // Tình trạng bỏ phiếu (votetype)
}

const PostInteraction = ({ netVote, cCount, votetype }: PostInteractionProps) => {

  const backgroundColor: string = votetype === 1
    ? 'bg-[#d93a00]'
    : votetype === 0
      ? 'bg-[#695cff]'
      : 'bg-gray-400'; // Màu mặc định nếu không có vote

  return (
    <div className="flex items-center gap-x-3">
      {/*Upvote Downvote*/}
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${backgroundColor}`}>
        <div>
          {votetype === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Z"
              />
            </svg>) :
            (<svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"

              />
            </svg>)
          }
        </div>
        <span className="text-white text-sm">{netVote}</span>
        <div>
          {votetype === 0 ? (<svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Z"

              fill="white"
            />
          </svg>)
            : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"
                  fill="white"
                />
              </svg>)
          }
        </div>
      </div>
      {/*Comments icon*/}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 bg-[#e5ebee]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7.21875 1.09375C5.71082 1.09534 4.26511 1.69507 3.19884 2.76134C2.13257 3.82761 1.53284 5.27332 1.53125 6.78125V11.375C1.53125 11.6651 1.64648 11.9433 1.8516 12.1484C2.05672 12.3535 2.33492 12.4688 2.625 12.4688H7.21875C8.72717 12.4688 10.1738 11.8695 11.2404 10.8029C12.307 9.73631 12.9063 8.28967 12.9063 6.78125C12.9063 5.27283 12.307 3.82619 11.2404 2.75958C10.1738 1.69297 8.72717 1.09375 7.21875 1.09375ZM7.21875 11.1563H2.84375V6.78125C2.84375 5.91596 3.10034 5.0701 3.58107 4.35063C4.0618 3.63117 4.74508 3.07041 5.54451 2.73928C6.34394 2.40814 7.2236 2.3215 8.07227 2.49031C8.92094 2.65912 9.70049 3.0758 10.3123 3.68766C10.9242 4.29951 11.3409 5.07906 11.5097 5.92773C11.6785 6.7764 11.5919 7.65606 11.2607 8.45549C10.9296 9.25492 10.3688 9.9382 9.64937 10.4189C8.9299 10.8997 8.08404 11.1563 7.21875 11.1563ZM6.78125 7C6.78125 7.17306 6.72993 7.34223 6.63379 7.48612C6.53764 7.63002 6.40098 7.74217 6.2411 7.80839C6.08121 7.87462 5.90528 7.89195 5.73555 7.85819C5.56581 7.82443 5.4099 7.74109 5.28753 7.61872C5.16516 7.49635 5.08183 7.34044 5.04806 7.1707C5.0143 7.00097 5.03163 6.82504 5.09786 6.66515C5.16408 6.50527 5.27623 6.36861 5.42013 6.27246C5.56402 6.17632 5.73319 6.125 5.90625 6.125C6.13831 6.125 6.36087 6.21719 6.52497 6.38128C6.68906 6.54538 6.78125 6.76794 6.78125 7ZM9.40625 7C9.40625 7.17306 9.35493 7.34223 9.25879 7.48612C9.16264 7.63002 9.02598 7.74217 8.8661 7.80839C8.70621 7.87462 8.53028 7.89195 8.36055 7.85819C8.19081 7.82443 8.0349 7.74109 7.91253 7.61872C7.79016 7.49635 7.70683 7.34044 7.67306 7.1707C7.6393 7.00097 7.65663 6.82504 7.72286 6.66515C7.78908 6.50527 7.90123 6.36861 8.04513 6.27246C8.18902 6.17632 8.35819 6.125 8.53125 6.125C8.76331 6.125 8.98587 6.21719 9.14997 6.38128C9.31406 6.54538 9.40625 6.76794 9.40625 7Z"
              fill="#475569"
            />
          </svg>
        </div>
        <span className=" text-sm">{cCount}</span>

      </div>
      {/*Shares icon*/}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 bg-[#e5ebee]">
        <span className="text-sm">Share</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15.0304 6.47L10.0304 1.47C9.92553 1.36503 9.7919 1.29351 9.6464 1.2645C9.50089 1.2355 9.35005 1.2503 9.21296 1.30703C9.07587 1.36377 8.95868 1.45989 8.87623 1.58324C8.79378 1.70659 8.74977 1.85163 8.74976 2V4.29625C7.13976 4.49125 5.39601 5.28937 3.95289 6.51312C2.13039 8.05937 0.995386 10.0562 0.756636 12.1381C0.732449 12.347 0.774745 12.5583 0.87751 12.7418C0.980274 12.9253 1.13828 13.0717 1.32904 13.1602C1.51981 13.2487 1.73364 13.2749 1.94012 13.2349C2.14659 13.1949 2.33521 13.0908 2.47914 12.9375C3.13289 12.2412 5.41664 10.0787 8.74976 9.78625V12C8.74989 12.1482 8.79395 12.2931 8.87637 12.4163C8.95879 12.5395 9.07588 12.6356 9.21284 12.6923C9.3498 12.749 9.5005 12.7638 9.6459 12.735C9.7913 12.7061 9.92488 12.6348 10.0298 12.53L15.0298 7.53C15.1703 7.38945 15.2493 7.19888 15.2494 7.00012C15.2495 6.80137 15.1708 6.6107 15.0304 6.47ZM10.2498 10.1875V9C10.2498 8.80108 10.1707 8.61032 10.0301 8.46967C9.88944 8.32901 9.69868 8.25 9.49976 8.25C6.43726 8.25 4.08914 9.5975 2.63789 10.7569C3.08351 9.62187 3.86476 8.55562 4.92351 7.6575C6.33101 6.46312 8.04164 5.75 9.49976 5.75C9.69868 5.75 9.88944 5.67098 10.0301 5.53033C10.1707 5.38967 10.2498 5.19891 10.2498 5V3.8125L13.4373 7L10.2498 10.1875Z"
              fill="#475569"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;