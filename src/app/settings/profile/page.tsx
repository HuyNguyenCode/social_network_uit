import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import Image from "next/image";
const cx = classNames.bind(styles);
export default function ProfilePage() {
  return (
    <div className={cx("profile-wrapper")}>
      <div className={cx("profile-background")}></div>
      <div className={cx("profile-container")}>
        <div className={cx("profile-avatar-wrapper")}>
          <Image
            aria-hidden
            src="/avatar.jpg"
            alt="File icon"
            width={128}
            height={128}
            className={cx("profile-avatar")}
          />
        </div>
        <div className={cx("profile-infor-wrapper")}>
          <div className={cx("profile-infor")}>
            <div className={cx("profile-name-tier")}>
              <span className={cx("profile-name")}>Azunyan U. Wu</span>
              <div className={cx("profile-tier")}>Pro</div>
            </div>
            <span className={cx("profile-email")}>
              elementary221b@gmail.com
            </span>
          </div>
          <div className={cx("button-infor")}>
            <button className={cx("share-btn")}>
              <span className={cx("share-text")}>Share</span>
              <span className={cx("share-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.75 12.1875C12.9128 12.1861 12.1042 12.4919 11.4774 13.0469L8.28909 11C8.48699 10.348 8.48699 9.65196 8.28909 8.99998L11.4774 6.9531C12.098 7.49849 12.8948 7.80112 13.721 7.80519C14.5471 7.80925 15.3469 7.51448 15.9728 6.97522C16.5988 6.43597 17.0086 5.68859 17.1268 4.87091C17.245 4.05323 17.0636 3.22039 16.616 2.52595C16.1684 1.83151 15.4849 1.32231 14.6914 1.09224C13.8979 0.862169 13.0479 0.926746 12.2983 1.27406C11.5487 1.62138 10.9499 2.22801 10.6124 2.9821C10.2749 3.73619 10.2214 4.58688 10.4617 5.37732L7.27268 7.42185C6.77676 6.98357 6.16485 6.69778 5.51045 6.5988C4.85606 6.49981 4.187 6.59184 3.58363 6.86384C2.98027 7.13583 2.46825 7.57622 2.10907 8.13212C1.7499 8.68802 1.55884 9.33579 1.55884 9.99763C1.55884 10.6595 1.7499 11.3072 2.10907 11.8631C2.46825 12.419 2.98027 12.8594 3.58363 13.1314C4.187 13.4034 4.85606 13.4955 5.51045 13.3965C6.16485 13.2975 6.77676 13.0117 7.27268 12.5734L10.461 14.625C10.2506 15.3168 10.2638 16.0574 10.4986 16.7413C10.7335 17.4253 11.178 18.0177 11.769 18.4344C12.36 18.8511 13.0674 19.0708 13.7905 19.0622C14.5136 19.0537 15.2155 18.8173 15.7965 18.3867C16.3775 17.9562 16.8079 17.3534 17.0265 16.6641C17.2451 15.9748 17.2407 15.2341 17.014 14.5474C16.7873 13.8607 16.3499 13.263 15.7639 12.8393C15.1779 12.4156 14.4732 12.1875 13.75 12.1875ZM13.75 2.81248C14.0591 2.81248 14.3612 2.90411 14.6181 3.0758C14.8751 3.24749 15.0753 3.49152 15.1936 3.77703C15.3119 4.06254 15.3428 4.37671 15.2825 4.6798C15.2222 4.9829 15.0734 5.26131 14.8549 5.47983C14.6364 5.69835 14.358 5.84716 14.0549 5.90745C13.7518 5.96774 13.4376 5.9368 13.1521 5.81854C12.8666 5.70028 12.6225 5.50001 12.4509 5.24305C12.2792 4.9861 12.1875 4.68401 12.1875 4.37498C12.1875 3.96058 12.3521 3.56315 12.6452 3.27012C12.9382 2.9771 13.3356 2.81248 13.75 2.81248ZM5.00003 11.5625C4.691 11.5625 4.3889 11.4708 4.13195 11.2991C3.875 11.1275 3.67473 10.8834 3.55647 10.5979C3.4382 10.3124 3.40726 9.99824 3.46755 9.69515C3.52784 9.39205 3.67665 9.11364 3.89517 8.89512C4.11369 8.6766 4.3921 8.52779 4.6952 8.4675C4.9983 8.40721 5.31246 8.43815 5.59797 8.55641C5.88348 8.67468 6.12751 8.87495 6.2992 9.1319C6.47089 9.38885 6.56253 9.69094 6.56253 9.99998C6.56253 10.4144 6.39791 10.8118 6.10488 11.1048C5.81186 11.3979 5.41443 11.5625 5.00003 11.5625ZM13.75 17.1875C13.441 17.1875 13.1389 17.0958 12.8819 16.9241C12.625 16.7525 12.4247 16.5084 12.3065 16.2229C12.1882 15.9374 12.1573 15.6232 12.2176 15.3201C12.2778 15.0171 12.4267 14.7386 12.6452 14.5201C12.8637 14.3016 13.1421 14.1528 13.4452 14.0925C13.7483 14.0322 14.0625 14.0632 14.348 14.1814C14.6335 14.2997 14.8775 14.4999 15.0492 14.7569C15.2209 15.0138 15.3125 15.3159 15.3125 15.625C15.3125 16.0394 15.1479 16.4368 14.8549 16.7298C14.5619 17.0229 14.1644 17.1875 13.75 17.1875Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
            <button className={cx("view-btn")}>
              <span className={cx("view-text")}>View Profile</span>
              <span className={cx("view-icon")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.5383 10.6633L11.9133 16.2883C11.7372 16.4644 11.4983 16.5633 11.2492 16.5633C11.0001 16.5633 10.7613 16.4644 10.5852 16.2883C10.409 16.1121 10.3101 15.8733 10.3101 15.6242C10.3101 15.3751 10.409 15.1363 10.5852 14.9601L14.6094 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 9.99998C2.1875 9.75134 2.28627 9.51289 2.46209 9.33707C2.6379 9.16126 2.87636 9.06248 3.125 9.06248H14.6094L10.5867 5.03748C10.4106 4.86136 10.3117 4.62249 10.3117 4.37342C10.3117 4.12435 10.4106 3.88548 10.5867 3.70936C10.7628 3.53324 11.0017 3.4343 11.2508 3.4343C11.4999 3.4343 11.7387 3.53324 11.9148 3.70936L17.5398 9.33436C17.6273 9.42157 17.6966 9.5252 17.7438 9.63928C17.7911 9.75336 17.8153 9.87566 17.8152 9.99914C17.815 10.1226 17.7905 10.2449 17.743 10.3588C17.6955 10.4728 17.6259 10.5763 17.5383 10.6633Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={cx("profile-info-wrapper")}>
        <div className={cx("profile-info-container")}>
          <div className={cx("profile-info__title")}>Profile Infor</div>
          <p className={cx("profile-info__content")}>
            You can change your personal information settings here.
          </p>
        </div>
        <div className={cx("profile-input-container")}>
          <div className={cx("profile-input-content")}>
            <div className={cx("profile-input-wrapper")}>
              <span className={cx("input-text")}>Fullname</span>
              <div className={cx("input-box")}>
                <div className={cx("input-icon")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3111 16.4064C17.24 14.5264 15.5674 13.0616 13.5627 12.2478C14.5596 11.5001 15.296 10.4576 15.6676 9.26814C16.0392 8.07865 16.0271 6.8024 15.633 5.62017C15.2389 4.43794 14.4829 3.40967 13.4719 2.68102C12.461 1.95237 11.2464 1.56027 10.0002 1.56027C8.75401 1.56027 7.53942 1.95237 6.52847 2.68102C5.51752 3.40967 4.76146 4.43794 4.36738 5.62017C3.9733 6.8024 3.96119 8.07865 4.33276 9.26814C4.70433 10.4576 5.44075 11.5001 6.43769 12.2478C4.43294 13.0616 2.76038 14.5264 1.68925 16.4064C1.62288 16.5131 1.57864 16.6321 1.55917 16.7562C1.5397 16.8804 1.54539 17.0072 1.57591 17.1291C1.60642 17.251 1.66114 17.3656 1.7368 17.4659C1.81247 17.5662 1.90753 17.6504 2.01635 17.7132C2.12517 17.7761 2.24552 17.8164 2.37025 17.8319C2.49497 17.8473 2.62153 17.8375 2.74239 17.803C2.86325 17.7686 2.97595 17.7102 3.07379 17.6313C3.17162 17.5524 3.2526 17.4547 3.31191 17.3439C4.72753 14.897 7.22753 13.4376 10.0002 13.4376C12.7728 13.4376 15.2728 14.8978 16.6885 17.3439C16.817 17.5505 17.0209 17.6991 17.2569 17.7582C17.493 17.8173 17.7428 17.7823 17.9536 17.6605C18.1643 17.5388 18.3194 17.3398 18.3861 17.1058C18.4529 16.8718 18.426 16.6209 18.3111 16.4064ZM5.93769 7.50012C5.93769 6.69663 6.17595 5.91119 6.62234 5.24311C7.06874 4.57504 7.70321 4.05434 8.44554 3.74686C9.18786 3.43937 10.0047 3.35892 10.7927 3.51568C11.5808 3.67243 12.3047 4.05934 12.8728 4.62749C13.441 5.19565 13.8279 5.91951 13.9846 6.70756C14.1414 7.49561 14.0609 8.31244 13.7534 9.05477C13.446 9.79709 12.9253 10.4316 12.2572 10.878C11.5891 11.3244 10.8037 11.5626 10.0002 11.5626C8.92313 11.5614 7.89053 11.133 7.12894 10.3714C6.36734 9.60977 5.93893 8.57718 5.93769 7.50012Z"
                      fill="#475569"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Fullname"
                  className={cx("input-field")}
                />
              </div>
            </div>
            <div className={cx("profile-input-wrapper")}>
              <span className={cx("input-text")}>Email Address</span>
              <div className={cx("input-box")}>
                <div className={cx("input-icon")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 3.4375H2.5C2.25136 3.4375 2.0129 3.53627 1.83709 3.71209C1.66127 3.8879 1.5625 4.12636 1.5625 4.375V15C1.5625 15.4144 1.72712 15.8118 2.02015 16.1049C2.31317 16.3979 2.7106 16.5625 3.125 16.5625H16.875C17.2894 16.5625 17.6868 16.3979 17.9799 16.1049C18.2729 15.8118 18.4375 15.4144 18.4375 15V4.375C18.4375 4.12636 18.3387 3.8879 18.1629 3.71209C17.9871 3.53627 17.7486 3.4375 17.5 3.4375ZM15.0898 5.3125L10 9.97813L4.91016 5.3125H15.0898ZM3.4375 14.6875V6.50625L9.36641 11.9414C9.53932 12.1 9.7654 12.1879 10 12.1879C10.2346 12.1879 10.4607 12.1 10.6336 11.9414L16.5625 6.50625V14.6875H3.4375Z"
                      fill="#475569"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className={cx("input-field")}
                />
              </div>
            </div>
          </div>
          <div className={cx("profile-input-content")}>
            <div className={cx("profile-input-wrapper")}>
              <span className={cx("input-text")}>Phone Number</span>
              <div className={cx("input-box")}>
                <div className={cx("input-icon")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20.9812 14.5554L20.9808 14.5552L16.5663 12.5762L16.5661 12.5762L16.5499 12.5689C16.2701 12.4483 15.9646 12.3998 15.6612 12.4277C15.3579 12.4557 15.0663 12.5592 14.8133 12.7289L14.8133 12.7289C14.7784 12.7523 14.7447 12.7775 14.7125 12.8045C14.7124 12.8045 14.7124 12.8046 14.7123 12.8046L12.621 14.5856L12.5965 14.6065L12.5683 14.5912C11.3417 13.926 10.0761 12.6708 9.40987 11.4591L9.39438 11.4309L9.41507 11.4063L11.2019 9.28204L20.9812 14.5554ZM20.9812 14.5554C21.3418 14.7137 21.6418 14.9839 21.8369 15.326C22.032 15.6681 22.1117 16.0638 22.0644 16.4547C21.8871 17.8042 21.2246 19.0431 20.2007 19.9399C19.1767 20.8367 17.8613 21.3302 16.5001 21.3281H16.5C8.87496 21.3281 2.67188 15.125 2.67188 7.49995L2.67188 7.49988C2.66977 6.13868 3.16323 4.82324 4.06009 3.79927C4.95689 2.77535 6.19573 2.11286 7.54525 1.93552C7.93615 1.88822 8.33189 1.968 8.67394 2.16305C9.01605 2.35814 9.28626 2.6582 9.44458 3.0188L9.44472 3.01909L11.4222 7.43987C11.4247 7.44644 11.4275 7.45286 11.4307 7.4591C11.5488 7.73581 11.5968 8.0374 11.5703 8.3371C11.5439 8.6374 11.4435 8.9265 11.2783 9.17864L11.2782 9.17881M20.9812 14.5554L11.2782 9.17881M11.2782 9.17881C11.2549 9.21471 11.2294 9.24916 11.2019 9.28197L11.2782 9.17881ZM7.51313 10.245C7.4841 10.2796 7.45717 10.3159 7.43251 10.3537C7.25546 10.6242 7.15137 10.9359 7.13034 11.2585C7.10932 11.5812 7.17207 11.9037 7.31251 12.195M7.51313 10.245L7.54903 10.2751L7.54904 10.2751M7.51313 10.245L7.54904 10.2751M7.51313 10.245L7.54904 10.2751M7.54904 10.2751C7.52121 10.3082 7.49541 10.343 7.47177 10.3793L7.47173 10.3794C7.29911 10.6431 7.19762 10.947 7.17712 11.2616C7.15662 11.5761 7.21779 11.8906 7.3547 12.1745M7.54904 10.2751L9.34528 8.13572L9.36417 8.11322L9.35216 8.08641L7.58778 4.14891L7.57218 4.11409L7.53492 4.1223C6.76594 4.29176 6.0781 4.71925 5.58569 5.33372C5.0933 5.94817 4.82597 6.71261 4.82813 7.50001C4.82813 7.50004 4.82813 7.50006 4.82813 7.50008L4.87501 7.49995C4.87873 10.582 6.1047 13.5367 8.284 15.716L7.54904 10.2751ZM7.3547 12.1745C7.35467 12.1745 7.35465 12.1744 7.35462 12.1744L7.31251 12.195M7.3547 12.1745C7.35471 12.1746 7.35472 12.1746 7.35473 12.1746L7.31251 12.195M7.3547 12.1745C8.23316 13.9724 10.045 15.7722 11.8618 16.6527M7.31251 12.195C8.19563 14.0025 10.0153 15.81 11.8416 16.695M11.8416 16.695L11.8616 16.6526C11.8617 16.6526 11.8618 16.6526 11.8618 16.6527M11.8416 16.695C12.1347 16.8339 12.4589 16.8945 12.7825 16.8706C13.106 16.8468 13.4179 16.7394 13.6875 16.559M11.8416 16.695L11.862 16.6528C11.8619 16.6527 11.8619 16.6527 11.8618 16.6527M11.8618 16.6527C12.1476 16.7881 12.4636 16.8471 12.779 16.8239C13.0945 16.8007 13.3985 16.696 13.6614 16.5201M13.6875 16.559L13.6613 16.5202C13.6613 16.5201 13.6613 16.5201 13.6614 16.5201M13.6875 16.559L13.6614 16.5201C13.6614 16.5201 13.6614 16.5201 13.6614 16.5201M13.6875 16.559L16.4999 19.1718M13.6614 16.5201C13.696 16.4967 13.7293 16.4713 13.7609 16.4439L13.7612 16.4436L15.864 14.6558L15.8865 14.6366L15.9135 14.6487L19.851 16.4122L19.8859 16.4278L19.8777 16.465C19.7082 17.234 19.2807 17.9219 18.6662 18.4143C18.0518 18.9067 17.2873 19.174 16.4999 19.1718M16.4999 19.1718C16.4999 19.1718 16.4999 19.1718 16.5 19.1718L16.5 19.125L16.4999 19.1718Z"
                      fill="#475569"
                      stroke="#475569"
                      strokeWidth="0.09375"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className={cx("input-field")}
                />
              </div>
            </div>
            <div className={cx("profile-input-wrapper")}>
              <span className={cx("input-text")}>Account Type</span>
              <div className={cx("input-box")}>
                <div className={cx("input-icon")}></div>
                <select className={cx("input-field")}>
                  <option value="pro">Pro</option>
                  <option value="free">Free</option>
                </select>
              </div>
            </div>
          </div>
          <div className={cx("profile-input-content")}>
            <div className={cx("profile-input-wrapper")}>
              <span className={cx("input-text")}>Change Avatar</span>
              <div className={cx("change-avatar-section")}>
                <div className={cx("avatar-origin")}>
                  <Image
                    aria-hidden
                    src="/avatar.jpg"
                    alt="File icon"
                    width={64}
                    height={64}
                    className={cx("profile-avatar")}
                  />
                </div>
                <div className={cx("avatar-upload-box")}>
                  <div className={cx("avatar-upload-icon")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.2959 7.455L15.0459 2.205C14.9415 2.10039 14.8174 2.0174 14.6808 1.96078C14.5442 1.90416 14.3978 1.87501 14.25 1.875H5.25C4.75272 1.875 4.27581 2.07254 3.92417 2.42417C3.57254 2.77581 3.375 3.25272 3.375 3.75V20.25C3.375 20.7473 3.57254 21.2242 3.92417 21.5758C4.27581 21.9275 4.75272 22.125 5.25 22.125H18.75C19.2473 22.125 19.7242 21.9275 20.0758 21.5758C20.4275 21.2242 20.625 20.7473 20.625 20.25V8.25C20.625 7.95187 20.5066 7.66593 20.2959 7.455ZM17.1562 7.5H15V5.34375L17.1562 7.5ZM5.625 19.875V4.125H12.75V8.625C12.75 8.92337 12.8685 9.20952 13.0795 9.4205C13.2905 9.63147 13.5766 9.75 13.875 9.75H18.375V19.875H5.625ZM15.0459 13.0791C15.2573 13.2904 15.376 13.5771 15.376 13.8759C15.376 14.1748 15.2573 14.4615 15.0459 14.6728C14.8346 14.8842 14.5479 15.0029 14.2491 15.0029C13.9502 15.0029 13.6635 14.8842 13.4522 14.6728L13.125 14.3438V17.25C13.125 17.5484 13.0065 17.8345 12.7955 18.0455C12.5845 18.2565 12.2984 18.375 12 18.375C11.7016 18.375 11.4155 18.2565 11.2045 18.0455C10.9935 17.8345 10.875 17.5484 10.875 17.25V14.3438L10.5459 14.6737C10.3346 14.8851 10.0479 15.0038 9.74906 15.0038C9.45018 15.0038 9.16353 14.8851 8.95219 14.6737C8.74084 14.4624 8.62211 14.1758 8.62211 13.8769C8.62211 13.578 8.74084 13.2913 8.95219 13.08L11.2022 10.83C11.3067 10.7251 11.4309 10.6419 11.5676 10.5851C11.7044 10.5283 11.851 10.4991 11.9991 10.4991C12.1471 10.4991 12.2937 10.5283 12.4305 10.5851C12.5672 10.6419 12.6914 10.7251 12.7959 10.83L15.0459 13.0791Z"
                        fill="#4F46E5"
                      />
                    </svg>
                  </div>
                  <div className={cx("avatar-upload-text-wrapper")}>
                    <span className={cx("avatar-upload-text-click")}>
                      Click here
                    </span>
                    <span className={cx("avatar-upload-text")}>
                      to upload your file or drag.
                    </span>
                  </div>
                  <span className={cx("avatar-upload-format")}>
                    Supported Format: SVG, JPG, PNG (10mb each)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
