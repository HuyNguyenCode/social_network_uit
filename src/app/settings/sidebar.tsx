import classNames from "classnames/bind";
import styles from "./settings.module.scss";
import Image from "next/image";
const cx = classNames.bind(styles);
export default function Sidebar() {
  return (
    <div className={cx("sidebar")}>
      <div className={cx("up-content")}>
        <div className={cx("logo")}>
          <Image
            aria-hidden
            src="/logo.svg"
            alt="File icon"
            width={32}
            height={32}
            className="logo"
          />
          <span className={cx("logo-text")}>UIT</span>
        </div>
        <div className={cx("search-wrapper")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.1634 16.8367L14.4533 13.125C15.5657 11.6754 16.085 9.85688 15.906 8.0384C15.7269 6.21992 14.8629 4.53764 13.4891 3.33281C12.1153 2.12798 10.3346 1.49083 8.50834 1.5506C6.68205 1.61037 4.94687 2.36259 3.65479 3.65466C2.36272 4.94674 1.6105 6.68192 1.55073 8.50821C1.49096 10.3345 2.12811 12.1152 3.33294 13.4889C4.53777 14.8627 6.22005 15.7268 8.03853 15.9059C9.85701 16.0849 11.6755 15.5656 13.1251 14.4531L16.8384 18.1672C16.9256 18.2544 17.0292 18.3236 17.1431 18.3708C17.257 18.418 17.3792 18.4423 17.5025 18.4423C17.6258 18.4423 17.7479 18.418 17.8619 18.3708C17.9758 18.3236 18.0793 18.2544 18.1665 18.1672C18.2537 18.08 18.3229 17.9765 18.3701 17.8625C18.4173 17.7486 18.4416 17.6265 18.4416 17.5031C18.4416 17.3798 18.4173 17.2577 18.3701 17.1437C18.3229 17.0298 18.2537 16.9263 18.1665 16.8391L18.1634 16.8367ZM3.43764 8.75001C3.43764 7.69929 3.74921 6.67218 4.33295 5.79854C4.9167 4.9249 5.7464 4.24399 6.71713 3.8419C7.68786 3.43981 8.75603 3.3346 9.78656 3.53959C10.8171 3.74457 11.7637 4.25054 12.5066 4.9935C13.2496 5.73647 13.7556 6.68307 13.9606 7.71359C14.1655 8.74411 14.0603 9.81228 13.6582 10.783C13.2562 11.7537 12.5752 12.5834 11.7016 13.1672C10.828 13.7509 9.80085 14.0625 8.75014 14.0625C7.34162 14.0611 5.9912 13.5009 4.99523 12.5049C3.99926 11.5089 3.43908 10.1585 3.43764 8.75001Z"
              fill="#475569"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className={cx("search-input")}
          />
        </div>
        <div className={cx("navigation")}>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.8256 9.92346L13.3256 2.42346C12.974 2.07195 12.4972 1.87448 12 1.87448C11.5028 1.87448 11.026 2.07195 10.6744 2.42346L3.17438 9.92346C2.99957 10.0972 2.86098 10.3039 2.76668 10.5316C2.67237 10.7594 2.62422 11.0035 2.62501 11.25V20.25C2.62501 20.5484 2.74354 20.8345 2.95451 21.0455C3.16549 21.2565 3.45164 21.375 3.75001 21.375H20.25C20.5484 21.375 20.8345 21.2565 21.0455 21.0455C21.2565 20.8345 21.375 20.5484 21.375 20.25V11.25C21.3758 11.0035 21.3276 10.7594 21.2333 10.5316C21.139 10.3039 21.0005 10.0972 20.8256 9.92346ZM19.125 19.125H4.87501V11.4047L12 4.27971L19.125 11.4047V19.125Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Home</span>
            </div>
            <div className={cx("nav-noti")}>
              <span className={cx("nav-noti-text")}>10</span>
            </div>
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.125 6C7.125 5.70163 7.24353 5.41548 7.45451 5.2045C7.66548 4.99353 7.95163 4.875 8.25 4.875H20.25C20.5484 4.875 20.8345 4.99353 21.0455 5.2045C21.2565 5.41548 21.375 5.70163 21.375 6C21.375 6.29837 21.2565 6.58452 21.0455 6.7955C20.8345 7.00647 20.5484 7.125 20.25 7.125H8.25C7.95163 7.125 7.66548 7.00647 7.45451 6.7955C7.24353 6.58452 7.125 6.29837 7.125 6ZM20.25 10.875H8.25C7.95163 10.875 7.66548 10.9935 7.45451 11.2045C7.24353 11.4155 7.125 11.7016 7.125 12C7.125 12.2984 7.24353 12.5845 7.45451 12.7955C7.66548 13.0065 7.95163 13.125 8.25 13.125H20.25C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5845 21.375 12.2984 21.375 12C21.375 11.7016 21.2565 11.4155 21.0455 11.2045C20.8345 10.9935 20.5484 10.875 20.25 10.875ZM20.25 16.875H8.25C7.95163 16.875 7.66548 16.9935 7.45451 17.2045C7.24353 17.4155 7.125 17.7016 7.125 18C7.125 18.2984 7.24353 18.5845 7.45451 18.7955C7.66548 19.0065 7.95163 19.125 8.25 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875ZM4.125 10.5C3.82833 10.5 3.53832 10.588 3.29165 10.7528C3.04497 10.9176 2.85271 11.1519 2.73918 11.426C2.62565 11.7001 2.59594 12.0017 2.65382 12.2926C2.7117 12.5836 2.85456 12.8509 3.06434 13.0607C3.27412 13.2704 3.54139 13.4133 3.83237 13.4712C4.12334 13.5291 4.42494 13.4994 4.69903 13.3858C4.97312 13.2723 5.20738 13.08 5.37221 12.8334C5.53703 12.5867 5.625 12.2967 5.625 12C5.625 11.6022 5.46697 11.2206 5.18566 10.9393C4.90436 10.658 4.52283 10.5 4.125 10.5ZM4.125 4.5C3.82833 4.5 3.53832 4.58797 3.29165 4.7528C3.04497 4.91762 2.85271 5.15189 2.73918 5.42597C2.62565 5.70006 2.59594 6.00166 2.65382 6.29264C2.7117 6.58361 2.85456 6.85088 3.06434 7.06066C3.27412 7.27044 3.54139 7.4133 3.83237 7.47118C4.12334 7.52906 4.42494 7.49935 4.69903 7.38582C4.97312 7.27229 5.20738 7.08003 5.37221 6.83336C5.53703 6.58668 5.625 6.29667 5.625 6C5.625 5.60218 5.46697 5.22064 5.18566 4.93934C4.90436 4.65804 4.52283 4.5 4.125 4.5ZM4.125 16.5C3.82833 16.5 3.53832 16.588 3.29165 16.7528C3.04497 16.9176 2.85271 17.1519 2.73918 17.426C2.62565 17.7001 2.59594 18.0017 2.65382 18.2926C2.7117 18.5836 2.85456 18.8509 3.06434 19.0607C3.27412 19.2704 3.54139 19.4133 3.83237 19.4712C4.12334 19.5291 4.42494 19.4994 4.69903 19.3858C4.97312 19.2723 5.20738 19.08 5.37221 18.8334C5.53703 18.5867 5.625 18.2967 5.625 18C5.625 17.6022 5.46697 17.2206 5.18566 16.9393C4.90436 16.658 4.52283 16.5 4.125 16.5Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Tasks</span>
            </div>
            {/* <div className={cx("nav-noti")}>
                    <span className={cx("nav-noti-text")}>10</span>
                  </div> */}
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.7357 14.7131C12.6779 13.9211 13.3538 12.8585 13.6716 11.6694C13.9894 10.4802 13.9338 9.22211 13.5124 8.06563C13.0909 6.90916 12.3239 5.9103 11.3155 5.20451C10.3071 4.49871 9.10597 4.12015 7.87508 4.12015C6.6442 4.12015 5.4431 4.49871 4.43467 5.20451C3.42624 5.9103 2.65928 6.90916 2.2378 8.06563C1.81632 9.22211 1.76072 10.4802 2.07854 11.6694C2.39636 12.8585 3.07222 13.9211 4.01446 14.7131C2.54313 15.3784 1.26807 16.4116 0.312273 17.7131C0.135738 17.9537 0.0619957 18.2545 0.107268 18.5495C0.152541 18.8444 0.313119 19.1093 0.553679 19.2858C0.794239 19.4623 1.09507 19.5361 1.39 19.4908C1.68493 19.4455 1.9498 19.2849 2.12634 19.0444C2.78797 18.1408 3.6533 17.4058 4.65212 16.8992C5.65095 16.3926 6.75513 16.1286 7.87508 16.1286C8.99504 16.1286 10.0992 16.3926 11.098 16.8992C12.0969 17.4058 12.9622 18.1408 13.6238 19.0444C13.8004 19.2851 14.0653 19.4458 14.3603 19.4911C14.6553 19.5365 14.9563 19.4628 15.197 19.2863C15.4376 19.1097 15.5983 18.8448 15.6437 18.5498C15.6891 18.2548 15.6154 17.9538 15.4388 17.7131C14.4825 16.4118 13.2072 15.3787 11.7357 14.7131ZM4.12508 10.125C4.12508 9.38333 4.34502 8.65831 4.75707 8.04163C5.16913 7.42494 5.7548 6.94429 6.44002 6.66047C7.12525 6.37664 7.87924 6.30237 8.60667 6.44707C9.3341 6.59176 10.0023 6.94892 10.5267 7.47336C11.0512 7.99781 11.4083 8.666 11.553 9.39343C11.6977 10.1209 11.6235 10.8749 11.3396 11.5601C11.0558 12.2453 10.5752 12.831 9.95847 13.243C9.34179 13.6551 8.61677 13.875 7.87508 13.875C6.88052 13.875 5.9267 13.4799 5.22343 12.7767C4.52017 12.0734 4.12508 11.1196 4.12508 10.125ZM23.447 19.2816C23.3279 19.3691 23.1927 19.4323 23.0492 19.4675C22.9056 19.5028 22.7566 19.5094 22.6105 19.4871C22.4644 19.4647 22.3241 19.4137 22.1977 19.3371C22.0713 19.2605 21.9613 19.1598 21.8738 19.0406C21.2106 18.1387 20.3449 17.4051 19.3464 16.8987C18.348 16.3923 17.2446 16.1273 16.1251 16.125C15.8267 16.125 15.5406 16.0065 15.3296 15.7955C15.1186 15.5845 15.0001 15.2984 15.0001 15C15.0001 14.7016 15.1186 14.4155 15.3296 14.2045C15.5406 13.9935 15.8267 13.875 16.1251 13.875C16.6581 13.8741 17.1848 13.7595 17.67 13.539C18.1552 13.3184 18.5879 12.997 18.9391 12.5961C19.2903 12.1951 19.5521 11.7239 19.7068 11.2139C19.8616 10.7039 19.9059 10.1667 19.8367 9.6382C19.7675 9.10971 19.5864 8.60203 19.3056 8.14903C19.0247 7.69602 18.6505 7.30809 18.2079 7.0111C17.7653 6.71411 17.2645 6.51488 16.7388 6.4267C16.2132 6.33852 15.6747 6.3634 15.1595 6.4997C15.0155 6.54134 14.8648 6.55381 14.716 6.53638C14.5672 6.51896 14.4233 6.47199 14.2929 6.39823C14.1625 6.32446 14.0482 6.2254 13.9566 6.10685C13.865 5.98829 13.798 5.85264 13.7595 5.70784C13.7211 5.56304 13.7119 5.41202 13.7326 5.26364C13.7533 5.11526 13.8034 4.9725 13.88 4.84375C13.9566 4.715 14.0582 4.60285 14.1787 4.51388C14.2993 4.42491 14.4364 4.36091 14.582 4.32564C15.8996 3.97651 17.2968 4.08644 18.5436 4.63733C19.7904 5.18822 20.8125 6.14723 21.4416 7.35647C22.0706 8.56572 22.2692 9.95312 22.0046 11.2903C21.74 12.6274 21.0279 13.8346 19.9857 14.7131C21.457 15.3784 22.7321 16.4116 23.6879 17.7131C23.8632 17.9533 23.9362 18.2532 23.8911 18.5471C23.8459 18.841 23.6862 19.1051 23.447 19.2816Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Users</span>
            </div>
            <div className={cx("nav-noti")}>
              <span className={cx("nav-noti-text")}>2</span>
            </div>
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.15 5.87252L12.9 1.35658C12.6243 1.20484 12.3147 1.12527 12 1.12527C11.6853 1.12527 11.3757 1.20484 11.1 1.35658L2.85 5.87252C2.5548 6.03404 2.3085 6.27203 2.13695 6.56152C1.9654 6.85101 1.87492 7.18133 1.875 7.51783V16.4822C1.87492 16.8187 1.9654 17.149 2.13695 17.4385C2.3085 17.728 2.5548 17.966 2.85 18.1275L11.1 22.6435C11.3756 22.7954 11.6853 22.875 12 22.875C12.3147 22.875 12.6244 22.7954 12.9 22.6435L21.15 18.1275C21.4452 17.966 21.6915 17.728 21.863 17.4385C22.0346 17.149 22.1251 16.8187 22.125 16.4822V7.51783C22.1251 7.18133 22.0346 6.85101 21.863 6.56152C21.6915 6.27203 21.4452 6.03404 21.15 5.87252ZM12 3.42846L18.75 7.12502L12 10.8188L5.25 7.12502L12 3.42846ZM4.125 9.07408L10.875 12.7678V19.9556L4.125 16.26V9.07408ZM13.125 19.9556V12.7678L19.875 9.07408V16.26L13.125 19.9556Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>APIs</span>
            </div>
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 4.125H3C2.50272 4.125 2.02581 4.32254 1.67417 4.67417C1.32254 5.02581 1.125 5.50272 1.125 6V18C1.125 18.4973 1.32254 18.9742 1.67417 19.3258C2.02581 19.6775 2.50272 19.875 3 19.875H21C21.4973 19.875 21.9742 19.6775 22.3258 19.3258C22.6775 18.9742 22.875 18.4973 22.875 18V6C22.875 5.50272 22.6775 5.02581 22.3258 4.67417C21.9742 4.32254 21.4973 4.125 21 4.125ZM20.625 6.375V8.25H3.375V6.375H20.625ZM3.375 17.625V10.5H20.625V17.625H3.375ZM19.5 15.375C19.5 15.6734 19.3815 15.9595 19.1705 16.1705C18.9595 16.3815 18.6734 16.5 18.375 16.5H15.375C15.0766 16.5 14.7905 16.3815 14.5795 16.1705C14.3685 15.9595 14.25 15.6734 14.25 15.375C14.25 15.0766 14.3685 14.7905 14.5795 14.5795C14.7905 14.3685 15.0766 14.25 15.375 14.25H18.375C18.6734 14.25 18.9595 14.3685 19.1705 14.5795C19.3815 14.7905 19.5 15.0766 19.5 15.375ZM13.125 15.375C13.125 15.6734 13.0065 15.9595 12.7955 16.1705C12.5845 16.3815 12.2984 16.5 12 16.5H10.875C10.5766 16.5 10.2905 16.3815 10.0795 16.1705C9.86853 15.9595 9.75 15.6734 9.75 15.375C9.75 15.0766 9.86853 14.7905 10.0795 14.5795C10.2905 14.3685 10.5766 14.25 10.875 14.25H12C12.2984 14.25 12.5845 14.3685 12.7955 14.5795C13.0065 14.7905 13.125 15.0766 13.125 15.375Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Subscriptions</span>
            </div>
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 7.12499C11.0358 7.12499 10.0933 7.41091 9.2916 7.94658C8.48991 8.48225 7.86507 9.24362 7.49609 10.1344C7.12712 11.0252 7.03058 12.0054 7.21868 12.9511C7.40678 13.8967 7.87108 14.7654 8.55286 15.4471C9.23464 16.1289 10.1033 16.5932 11.0489 16.7813C11.9946 16.9694 12.9748 16.8729 13.8656 16.5039C14.7564 16.1349 15.5177 15.5101 16.0534 14.7084C16.5891 13.9067 16.875 12.9642 16.875 12C16.8735 10.7075 16.3594 9.46841 15.4455 8.55449C14.5316 7.64057 13.2925 7.12648 12 7.12499ZM12 14.625C11.4808 14.625 10.9733 14.471 10.5416 14.1826C10.11 13.8942 9.7735 13.4842 9.57482 13.0045C9.37614 12.5249 9.32416 11.9971 9.42545 11.4879C9.52673 10.9787 9.77674 10.5109 10.1439 10.1438C10.511 9.77672 10.9787 9.52672 11.4879 9.42543C11.9971 9.32414 12.5249 9.37613 13.0046 9.57481C13.4842 9.77349 13.8942 10.1099 14.1826 10.5416C14.4711 10.9733 14.625 11.4808 14.625 12C14.625 12.6962 14.3484 13.3639 13.8562 13.8561C13.3639 14.3484 12.6962 14.625 12 14.625ZM22.6744 9.9778C22.6427 9.81934 22.5772 9.66958 22.4824 9.5387C22.3876 9.40783 22.2657 9.29891 22.125 9.21937L19.5197 7.73343L19.5094 4.79812C19.5088 4.63526 19.4729 4.47446 19.4041 4.32684C19.3353 4.17922 19.2353 4.0483 19.1109 3.94312C18.061 3.05481 16.8522 2.37371 15.5484 1.93593C15.3997 1.88576 15.2422 1.86727 15.0859 1.88164C14.9296 1.89601 14.778 1.94292 14.6409 2.01937L12 3.49405L9.35907 2.01843C9.22182 1.94157 9.06997 1.89434 8.91333 1.87981C8.75669 1.86528 8.59875 1.88376 8.44969 1.93405C7.14559 2.37366 5.93672 3.05667 4.88719 3.94687C4.76326 4.05193 4.66356 4.18259 4.59494 4.32986C4.52632 4.47713 4.49042 4.63752 4.48969 4.79999L4.47657 7.73812L1.87501 9.2203C1.7343 9.30015 1.61246 9.4094 1.51782 9.54061C1.42317 9.67182 1.35794 9.8219 1.32657 9.98062C1.06172 11.3148 1.06172 12.688 1.32657 14.0222C1.35819 14.1806 1.42354 14.3303 1.51817 14.4611C1.61281 14.592 1.73451 14.701 1.87501 14.7806L4.48313 16.2666L4.49344 19.2019C4.49401 19.3647 4.52993 19.5255 4.59872 19.6731C4.66752 19.8208 4.76754 19.9517 4.89188 20.0569C5.94178 20.9452 7.15065 21.6263 8.45438 22.0641C8.6031 22.1142 8.76067 22.1327 8.91696 22.1183C9.07325 22.104 9.2248 22.0571 9.36188 21.9806L12 20.5059L14.6381 21.9816C14.7754 22.0584 14.9272 22.1056 15.0839 22.1202C15.2405 22.1347 15.3985 22.1162 15.5475 22.0659C16.8516 21.6263 18.0605 20.9433 19.11 20.0531C19.2339 19.9481 19.3336 19.8174 19.4023 19.6701C19.4709 19.5229 19.5068 19.3625 19.5075 19.2L19.5206 16.2619L22.1278 14.7797C22.2685 14.6998 22.3904 14.5906 22.485 14.4594C22.5797 14.3282 22.6449 14.1781 22.6763 14.0194C22.9405 12.6851 22.9399 11.3119 22.6744 9.9778ZM20.5528 13.0884L18.0328 14.5209C17.8538 14.6224 17.7062 14.7713 17.6063 14.9512C17.5556 15.045 17.5022 15.1322 17.4469 15.2212C17.3358 15.3986 17.2764 15.6035 17.2753 15.8128L17.2622 18.6562C16.6557 19.1126 15.9915 19.4868 15.2869 19.7691L12.7416 18.345C12.5737 18.251 12.3846 18.2016 12.1922 18.2016H12.165C12.0581 18.2016 11.9494 18.2016 11.8425 18.2016C11.6415 18.1968 11.4428 18.2457 11.2669 18.3431L8.71876 19.7644C8.01297 19.4835 7.34724 19.1109 6.73876 18.6562L6.72844 15.8212C6.72758 15.6116 6.66815 15.4064 6.55688 15.2287C6.50251 15.1406 6.44813 15.0497 6.39751 14.9587C6.2975 14.7799 6.15026 14.632 5.97188 14.5312L3.45001 13.0903C3.35204 12.3674 3.35204 11.6345 3.45001 10.9116L5.97001 9.47905C6.14875 9.37758 6.29627 9.22908 6.39657 9.04968C6.44719 8.95593 6.50063 8.8678 6.55594 8.77874C6.66705 8.60135 6.72646 8.39649 6.72751 8.18718L6.73782 5.34374C7.34453 4.88866 8.00872 4.51574 8.71313 4.23468L11.2584 5.65874C11.4343 5.75738 11.6335 5.80662 11.835 5.80124C11.9419 5.80124 12.0506 5.80124 12.1575 5.80124C12.3585 5.806 12.5572 5.75714 12.7331 5.65968L15.2813 4.23562C15.987 4.51645 16.6528 4.88903 17.2613 5.34374L17.2716 8.17874C17.2724 8.38837 17.3319 8.59358 17.4431 8.77124C17.4975 8.85937 17.5519 8.9503 17.6025 9.04124C17.7025 9.22007 17.8498 9.36795 18.0281 9.46874L20.55 10.9059C20.6493 11.63 20.6502 12.3641 20.5528 13.0884Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Settings</span>
            </div>
          </div>
          <div className={cx("nav-item")}>
            <div className={cx("nav-item-wrapper")}>
              <div className={cx("nav-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.375 1.875C9.78998 1.87773 7.31161 2.90584 5.48372 4.73372C3.65584 6.56161 2.62773 9.03998 2.625 11.625V19.5C2.625 19.9973 2.82254 20.4742 3.17417 20.8258C3.52581 21.1775 4.00272 21.375 4.5 21.375H12.375C14.9609 21.375 17.4408 20.3478 19.2693 18.5193C21.0978 16.6908 22.125 14.2109 22.125 11.625C22.125 9.03914 21.0978 6.55919 19.2693 4.73071C17.4408 2.90223 14.9609 1.875 12.375 1.875ZM12.375 19.125H4.875V11.625C4.875 10.1416 5.31487 8.69159 6.13898 7.45822C6.96309 6.22485 8.13443 5.26356 9.50487 4.6959C10.8753 4.12825 12.3833 3.97972 13.8382 4.26911C15.293 4.5585 16.6294 5.27281 17.6783 6.3217C18.7272 7.37059 19.4415 8.70697 19.7309 10.1618C20.0203 11.6167 19.8718 13.1247 19.3041 14.4951C18.7364 15.8656 17.7751 17.0369 16.5418 17.861C15.3084 18.6851 13.8584 19.125 12.375 19.125ZM11.625 12C11.625 12.2967 11.537 12.5867 11.3722 12.8334C11.2074 13.08 10.9731 13.2723 10.699 13.3858C10.4249 13.4994 10.1233 13.5291 9.83236 13.4712C9.54139 13.4133 9.27412 13.2704 9.06434 13.0607C8.85456 12.8509 8.7117 12.5836 8.65382 12.2926C8.59594 12.0017 8.62565 11.7001 8.73918 11.426C8.85271 11.1519 9.04497 10.9176 9.29165 10.7528C9.53832 10.588 9.82833 10.5 10.125 10.5C10.5228 10.5 10.9044 10.658 11.1857 10.9393C11.467 11.2206 11.625 11.6022 11.625 12ZM16.125 12C16.125 12.2967 16.037 12.5867 15.8722 12.8334C15.7074 13.08 15.4731 13.2723 15.199 13.3858C14.9249 13.4994 14.6233 13.5291 14.3324 13.4712C14.0414 13.4133 13.7741 13.2704 13.5643 13.0607C13.3546 12.8509 13.2117 12.5836 13.1538 12.2926C13.0959 12.0017 13.1256 11.7001 13.2392 11.426C13.3527 11.1519 13.545 10.9176 13.7916 10.7528C14.0383 10.588 14.3283 10.5 14.625 10.5C15.0228 10.5 15.4044 10.658 15.6857 10.9393C15.967 11.2206 16.125 11.6022 16.125 12Z"
                    fill="#94A3B8"
                  />
                </svg>
              </div>
              <span className={cx("nav-text")}>Help & Support</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("down-content")}>
        <div className={cx("avatar")}>
          <Image
            className={cx("avatar")}
            aria-hidden
            src="/avatar.jpg"
            alt="File icon"
            width={40}
            height={40}
          />
        </div>
        <div className={cx("user-info")}>
          <span className={cx("user-name")}>Azunyan U. Wu</span>
          <span className={cx("user-role")}>Admin</span>
        </div>
        <button className={cx("logout")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.625 4.82812H5.57812V4.875V19.125V19.1719H5.625H10.5C10.7859 19.1719 11.0602 19.2855 11.2623 19.4877C11.4645 19.6898 11.5781 19.9641 11.5781 20.25C11.5781 20.5359 11.4645 20.8102 11.2623 21.0123C11.0602 21.2145 10.7859 21.3281 10.5 21.3281H4.5C4.21406 21.3281 3.93984 21.2145 3.73765 21.0123C3.53546 20.8102 3.42188 20.5359 3.42188 20.25V3.75C3.42188 3.46406 3.53546 3.18984 3.73765 2.98765C3.93984 2.78546 4.21406 2.67188 4.5 2.67188H10.5C10.7859 2.67188 11.0602 2.78546 11.2623 2.98765C11.4645 3.18984 11.5781 3.46406 11.5781 3.75C11.5781 4.03594 11.4645 4.31016 11.2623 4.51235C11.0602 4.71454 10.7859 4.82812 10.5 4.82812H5.625ZM21.7628 11.2372L21.7628 11.2372C21.8633 11.3375 21.943 11.4565 21.9973 11.5876C22.0516 11.7187 22.0796 11.8592 22.0795 12.0011C22.0794 12.143 22.0513 12.2835 21.9968 12.4145C21.9423 12.5455 21.8625 12.6645 21.7619 12.7646L21.7619 12.7647L18.0119 16.5147C17.8093 16.7172 17.5346 16.831 17.2481 16.831C16.9617 16.831 16.6869 16.7172 16.4844 16.5147C16.2818 16.3121 16.168 16.0374 16.168 15.7509C16.168 15.4645 16.2818 15.1898 16.4844 14.9872C16.4844 14.9872 16.4844 14.9872 16.4844 14.9872L18.3144 13.1582L18.3945 13.0781H18.2812H10.5C10.2141 13.0781 9.93984 12.9645 9.73765 12.7623C9.53546 12.5602 9.42188 12.2859 9.42188 12C9.42188 11.7141 9.53546 11.4398 9.73765 11.2377C9.93984 11.0355 10.2141 10.9219 10.5 10.9219H18.2812H18.3945L18.3144 10.8418L16.4853 9.01467C16.2828 8.81211 16.169 8.53739 16.169 8.25094C16.169 7.96448 16.2828 7.68976 16.4853 7.48721C16.6879 7.28465 16.9626 7.17086 17.2491 7.17086C17.5355 7.17086 17.8102 7.28465 18.0128 7.48721L21.7628 11.2372Z"
              fill="#475569"
              stroke="#475569"
              strokeWidth="0.09375"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
